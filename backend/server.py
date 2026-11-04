import hmac
import json
import math
import os
import re
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
MAX_CANVAS_BODY_BYTES = 12 * 1024 * 1024
MAX_ENTRIES = 5_000
MAX_TEXT_LENGTH = 10_000
MAX_CANVAS_OBJECTS = 100
MAX_IMAGE_DATA_LENGTH = 6_000_000
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
        connection.execute(
            "CREATE TABLE IF NOT EXISTS canvas ("
            "id INTEGER PRIMARY KEY CHECK (id = 1), "
            "document TEXT NOT NULL)"
        )
        connection.execute(
            "INSERT OR IGNORE INTO canvas (id, document) VALUES (1, ?)",
            (json.dumps({"version": "6.9.1", "objects": [], "background": "#0b132b"}),),
        )


def _canvas_number(value, name, minimum, maximum):
    if (
        isinstance(value, bool)
        or not isinstance(value, (int, float))
        or not math.isfinite(value)
        or value < minimum
        or value > maximum
    ):
        raise ValueError("Canvas object has an invalid %s" % name)
    return value


def validate_canvas_document(document):
    if not isinstance(document, dict):
        raise ValueError("Canvas data must be an object")
    objects = document.get("objects")
    if not isinstance(objects, list) or len(objects) > MAX_CANVAS_OBJECTS:
        raise ValueError("Canvas must contain at most 100 elements")

    sanitized = []
    seen_ids = set()
    for item in objects:
        if not isinstance(item, dict):
            raise ValueError("Canvas elements must be objects")
        object_type = item.get("type")
        kind = item.get("kind")
        object_id = item.get("id")
        if (
            object_type not in ("Textbox", "Image")
            or kind != ("text" if object_type == "Textbox" else "image")
            or not isinstance(object_id, str)
            or not re.fullmatch(r"[A-Za-z0-9_-]{1,80}", object_id)
            or object_id in seen_ids
        ):
            raise ValueError("Canvas element type or identifier is invalid")
        seen_ids.add(object_id)

        flip_x = item.get("flipX", False)
        flip_y = item.get("flipY", False)
        if not isinstance(flip_x, bool) or not isinstance(flip_y, bool):
            raise ValueError("Canvas flip settings must be boolean")

        element = {
            "type": object_type,
            "id": object_id,
            "kind": kind,
            "originX": "left",
            "originY": "top",
            "left": _canvas_number(item.get("left"), "position", -5000, 5000),
            "top": _canvas_number(item.get("top"), "position", -5000, 5000),
            "width": _canvas_number(item.get("width"), "width", 1, 1200),
            "height": _canvas_number(item.get("height"), "height", 1, 1200),
            "scaleX": _canvas_number(item.get("scaleX"), "scale", 0.01, 20),
            "scaleY": _canvas_number(item.get("scaleY"), "scale", 0.01, 20),
            "angle": _canvas_number(item.get("angle"), "rotation", -3600, 3600),
            "opacity": _canvas_number(item.get("opacity", 1), "opacity", 0, 1),
            "flipX": flip_x,
            "flipY": flip_y,
            "skewX": _canvas_number(item.get("skewX", 0), "skew", -45, 45),
            "skewY": _canvas_number(item.get("skewY", 0), "skew", -45, 45),
        }

        if object_type == "Textbox":
            text = item.get("text")
            fill = item.get("fill")
            if not isinstance(text, str) or len(text) > MAX_TEXT_LENGTH:
                raise ValueError("Canvas text must be at most 10,000 characters")
            if not isinstance(fill, str) or not re.fullmatch(r"#[0-9A-Fa-f]{6}", fill):
                raise ValueError("Canvas text color is invalid")
            font_family = item.get("fontFamily", "Arial")
            font_weight = item.get("fontWeight", "normal")
            font_style = item.get("fontStyle", "normal")
            text_align = item.get("textAlign", "left")
            if (
                not isinstance(font_family, str)
                or not re.fullmatch(r"[A-Za-z0-9 ,_-]{1,80}", font_family)
            ):
                raise ValueError("Canvas font is invalid")
            if font_weight not in ("normal", "bold", "400", "500", "600", "700"):
                raise ValueError("Canvas font weight is invalid")
            if font_style not in ("normal", "italic"):
                raise ValueError("Canvas font style is invalid")
            if text_align not in ("left", "center", "right", "justify"):
                raise ValueError("Canvas text alignment is invalid")
            element.update(
                {
                    "text": text,
                    "fill": fill,
                    "fontSize": _canvas_number(
                        item.get("fontSize", 36), "font size", 6, 256
                    ),
                    "fontFamily": font_family,
                    "fontWeight": font_weight,
                    "fontStyle": font_style,
                    "textAlign": text_align,
                    "lineHeight": _canvas_number(
                        item.get("lineHeight", 1.16), "line height", 0.5, 3
                    ),
                    "charSpacing": _canvas_number(
                        item.get("charSpacing", 0), "character spacing", -1000, 1000
                    ),
                    "minWidth": _canvas_number(
                        item.get("minWidth", 20), "minimum width", 1, 1200
                    ),
                    "splitByGrapheme": item.get("splitByGrapheme", False) is True,
                    "editable": True,
                }
            )
        else:
            source = item.get("src")
            if (
                not isinstance(source, str)
                or len(source) > MAX_IMAGE_DATA_LENGTH
                or not re.fullmatch(
                    r"data:image/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}",
                    source,
                )
            ):
                raise ValueError("Canvas images must be local JPG, PNG, or WebP files")
            element.update({"src": source, "crossOrigin": None, "cropX": 0, "cropY": 0})

        sanitized.append(element)

    return {
        "version": "6.9.1",
        "background": "#0b132b",
        "objects": sanitized,
    }


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

    def _read_json(self, max_bytes=MAX_BODY_BYTES):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            raise ValueError("Invalid request length")
        if length < 1 or length > max_bytes:
            raise ValueError("Request body exceeds the allowed size")
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
        if self.path == "/api/canvas":
            with database_connection() as connection:
                row = connection.execute(
                    "SELECT document FROM canvas WHERE id = 1"
                ).fetchone()
            self._json(200, {"canvas": json.loads(row[0])})
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
        if self.path not in ("/api/content", "/api/canvas"):
            self._json(404, {"error": "Not found"})
            return
        if not self._valid_origin():
            self._json(403, {"error": "Request origin is not allowed"})
            return
        if not self._require_session():
            return
        try:
            max_bytes = (
                MAX_CANVAS_BODY_BYTES
                if self.path == "/api/canvas"
                else MAX_BODY_BYTES
            )
            payload = self._read_json(max_bytes)
            if self.path == "/api/content":
                overrides = payload.get("overrides")
                if not isinstance(overrides, dict) or len(overrides) > MAX_ENTRIES:
                    raise ValueError(
                        "Overrides must be an object with at most 5,000 entries"
                    )
                if any(
                    not isinstance(key, str)
                    or not key
                    or len(key) > 2_000
                    or not isinstance(value, str)
                    or len(value) > MAX_TEXT_LENGTH
                    for key, value in overrides.items()
                ):
                    raise ValueError("Each override needs a valid key and text value")
            else:
                canvas_document = validate_canvas_document(payload.get("canvas"))
        except ValueError as error:
            self._json(400, {"error": str(error)})
            return
        if self.path == "/api/content":
            with database_connection() as connection:
                connection.execute(
                    "UPDATE content SET overrides = ? WHERE id = 1",
                    (json.dumps(overrides, ensure_ascii=False),),
                )
        else:
            with database_connection() as connection:
                connection.execute(
                    "UPDATE canvas SET document = ? WHERE id = 1",
                    (json.dumps(canvas_document, ensure_ascii=False),),
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
