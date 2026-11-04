import hmac
import json
import os
import secrets
import sqlite3
import threading
import time
from contextlib import contextmanager
from http.cookies import CookieError, SimpleCookie
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent.parent
DATABASE = Path(__file__).resolve().parent / "data" / "portfolio-settings.sqlite3"
DIST = ROOT / "dist"
SESSION_COOKIE = "portfolio_settings_session"
SESSION_SECONDS = 30 * 60
MAX_BODY_BYTES = 512_000
MAX_ENTRIES = 5_000
MAX_TEXT_LENGTH = 10_000
ALLOWED_ORIGINS = {
    ("localhost", 3000),
    ("127.0.0.1", 3000),
    ("localhost", 5173),
    ("127.0.0.1", 5173),
    ("localhost", 8000),
    ("127.0.0.1", 8000),
}
sessions = {}
failed_logins = {}
state_lock = threading.Lock()


def initialize_database():
    DATABASE.parent.mkdir(parents=True, exist_ok=True)
    with database_connection() as connection:
        connection.execute(
            "CREATE TABLE IF NOT EXISTS content ("
            "id INTEGER PRIMARY KEY CHECK (id = 1), "
            "overrides TEXT NOT NULL)"
        )
        connection.execute(
            "INSERT OR IGNORE INTO content (id, overrides) VALUES (1, '{}')"
        )


@contextmanager
def database_connection():
    connection = sqlite3.connect(DATABASE)
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST), **kwargs)

    def log_message(self, format_string, *args):
        print("%s - %s" % (self.address_string(), format_string % args))

    def _json(self, status, payload, headers=None):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        if headers:
            for name, value in headers.items():
                self.send_header(name, value)
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            raise ValueError("Invalid request length")
        if length < 1 or length > MAX_BODY_BYTES:
            raise ValueError("Request body must be between 1 byte and 500 KB")
        try:
            value = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            raise ValueError("Request body must be valid JSON")
        if not isinstance(value, dict):
            raise ValueError("Request body must be a JSON object")
        return value

    def _valid_origin(self):
        origin = self.headers.get("Origin")
        if not origin:
            return False
        parsed = urlparse(origin)
        try:
            port = parsed.port or (443 if parsed.scheme == "https" else 80)
        except ValueError:
            return False
        return parsed.scheme == "http" and (parsed.hostname, port) in ALLOWED_ORIGINS

    def _session_token(self):
        cookie = SimpleCookie()
        try:
            cookie.load(self.headers.get("Cookie", ""))
        except CookieError:
            return None
        morsel = cookie.get(SESSION_COOKIE)
        if not morsel:
            return None
        token = morsel.value
        with state_lock:
            expires = sessions.get(token)
            if expires is None:
                return None
            if expires <= time.time():
                sessions.pop(token, None)
                return None
            sessions[token] = time.time() + SESSION_SECONDS
        return token

    def _require_session(self):
        if self._session_token():
            return True
        self._json(401, {"error": "Authentication required"})
        return False

    def do_GET(self):
        if self.path == "/api/content":
            with database_connection() as connection:
                row = connection.execute(
                    "SELECT overrides FROM content WHERE id = 1"
                ).fetchone()
            self._json(200, {"overrides": json.loads(row[0])})
            return
        if self.path.startswith("/api/"):
            self._json(404, {"error": "Not found"})
            return
        if not DIST.exists():
            self._json(503, {"error": "Build the portfolio before serving it"})
            return
        super().do_GET()

    def do_POST(self):
        if self.path not in ("/api/login", "/api/logout"):
            self._json(404, {"error": "Not found"})
            return
        if not self._valid_origin():
            self._json(403, {"error": "Request origin is not allowed"})
            return
        if self.path == "/api/login":
            self._login()
        else:
            self._logout()

    def do_PUT(self):
        if self.path != "/api/content":
            self._json(404, {"error": "Not found"})
            return
        if not self._valid_origin():
            self._json(403, {"error": "Request origin is not allowed"})
            return
        if not self._require_session():
            return
        try:
            payload = self._read_json()
            overrides = payload.get("overrides")
            if not isinstance(overrides, dict) or len(overrides) > MAX_ENTRIES:
                raise ValueError("Overrides must be an object with at most 5,000 entries")
            if any(
                not isinstance(key, str)
                or not key
                or len(key) > 2_000
                or not isinstance(value, str)
                or len(value) > MAX_TEXT_LENGTH
                for key, value in overrides.items()
            ):
                raise ValueError("Each override needs a valid key and text value")
        except ValueError as error:
            self._json(400, {"error": str(error)})
            return
        with database_connection() as connection:
            connection.execute(
                "UPDATE content SET overrides = ? WHERE id = 1",
                (json.dumps(overrides, ensure_ascii=False),),
            )
        self._json(200, {"saved": True})

    def _login(self):
        client = self.client_address[0]
        now = time.time()
        with state_lock:
            failures, locked_until = failed_logins.get(client, (0, 0))
            if locked_until > now:
                self._json(429, {"error": "Too many attempts. Try again later."})
                return
        try:
            payload = self._read_json()
        except ValueError as error:
            self._json(400, {"error": str(error)})
            return
        passcode = payload.get("passcode")
        configured_passcode = os.environ.get("PORTFOLIO_SETTINGS_PASSCODE", "")
        valid = isinstance(passcode, str) and hmac.compare_digest(
            passcode.encode("utf-8"), configured_passcode.encode("utf-8")
        )
        if not valid:
            with state_lock:
                failures += 1
                failed_logins[client] = (
                    0 if failures >= 5 else failures,
                    now + 15 * 60 if failures >= 5 else 0,
                )
            self._json(401, {"error": "Incorrect passcode"})
            return
        with state_lock:
            failed_logins.pop(client, None)
            token = secrets.token_urlsafe(32)
            sessions[token] = now + SESSION_SECONDS
        self._json(
            200,
            {"authenticated": True},
            {
                "Set-Cookie": (
                    "%s=%s; Path=/; HttpOnly; SameSite=Strict; Max-Age=%d"
                    % (SESSION_COOKIE, token, SESSION_SECONDS)
                )
            },
        )

    def _logout(self):
        token = self._session_token()
        if token:
            with state_lock:
                sessions.pop(token, None)
        self._json(
            200,
            {"authenticated": False},
            {
                "Set-Cookie": (
                    "%s=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
                    % SESSION_COOKIE
                )
            },
        )


def main():
    passcode = os.environ.get("PORTFOLIO_SETTINGS_PASSCODE", "")
    if len(passcode) < 12:
        raise SystemExit(
            "Set PORTFOLIO_SETTINGS_PASSCODE to a private passcode of at least "
            "12 characters before starting the local settings server."
        )
    initialize_database()
    server = ThreadingHTTPServer(("127.0.0.1", 8000), PortfolioHandler)
    print("Local portfolio server: http://127.0.0.1:8000")
    print("SQLite settings database: %s" % DATABASE)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping local portfolio server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
