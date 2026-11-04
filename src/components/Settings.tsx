import React, { useState } from 'react';
import {
  applyContentOverrides,
  getPortfolioTextEdits,
  setPortfolioTextEditable,
} from '../contentOverrides';
import type { ContentOverrides } from '../contentOverrides';
import SettingsCanvas from './SettingsCanvas';
import './Settings.css';

type SettingsProps = {
  apiError: string;
  contentOverrides: ContentOverrides;
  onSaved: (overrides: ContentOverrides) => void;
};

const readResponse = async (response: Response): Promise<Record<string, unknown>> => {
  const responseText = await response.text();
  let payload: unknown;
  try {
    payload = JSON.parse(responseText);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('The local settings server returned an invalid response.');
    }
    throw error;
  }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('The local settings server returned an invalid response.');
  }
  const responsePayload = payload as Record<string, unknown>;
  if (!response.ok) {
    throw new Error(
      typeof responsePayload.error === 'string'
        ? responsePayload.error
        : 'Settings request failed.'
    );
  }
  return responsePayload;
};

const Settings: React.FC<SettingsProps> = ({ apiError, contentOverrides, onSaved }) => {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const unlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      await readResponse(response);
      setPortfolioTextEditable(true);
      setAuthenticated(true);
      setPasscode('');
      setMessage('Settings unlocked.');
      window.requestAnimationFrame(() => {
        window.location.hash = '#home';
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        });
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to unlock settings.');
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    setBusy(true);
    setMessage('');
    const updatedOverrides = { ...contentOverrides, ...getPortfolioTextEdits() };
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overrides: updatedOverrides }),
      });
      await readResponse(response);
      onSaved(updatedOverrides);
      setMessage('Changes saved to the local database.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save changes.');
    } finally {
      setBusy(false);
    }
  };

  const lock = async () => {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      await readResponse(response);
      setPortfolioTextEditable(false);
      applyContentOverrides(contentOverrides);
      setAuthenticated(false);
      setMessage('Settings locked.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to lock settings.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="page-section settings-section" id="settings" aria-label="Settings">
      <header className="settings-heading">
        <span className="section-kicker">SETTINGS</span>
        <h2>Portfolio text editor</h2>
        <p>Unlock to edit text directly on the original portfolio, then save it to this device’s local database.</p>
      </header>

      {apiError && !authenticated ? (
        <p className="settings-notice" role="status">{apiError}</p>
      ) : null}

      {!authenticated ? (
        <form className="settings-login" onSubmit={unlock}>
          <label htmlFor="settings-passcode">Passcode</label>
          <input
            id="settings-passcode"
            type="password"
            autoComplete="current-password"
            value={passcode}
            onChange={(event) => setPasscode(event.currentTarget.value)}
            required
          />
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Unlock settings'}
          </button>
        </form>
      ) : (
        <div className="settings-editor">
          <p className="settings-editor-instructions">
            Editing is on. Click text in the original portfolio to edit it in place. Save your changes here.
          </p>
          <div className="settings-actions">
            <button className="btn btn-primary" type="button" onClick={save} disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={lock} disabled={busy}>
              Lock settings
            </button>
          </div>
          <SettingsCanvas />
        </div>
      )}

      {message ? <p className="settings-message" role="status" aria-live="polite">{message}</p> : null}
    </section>
  );
};

export default Settings;
