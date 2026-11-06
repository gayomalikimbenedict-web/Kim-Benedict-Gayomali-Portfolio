import { FormEvent, useState } from 'react';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

type Status = { kind: 'idle' | 'sending' | 'success' | 'error'; message: string };

const IDLE: Status = { kind: 'idle', message: '' };
const field = (data: FormData, name: string) => (data.get(name) ?? '').toString().trim();

/**
 * Sends the contact form to the configured form service (VITE_CONTACT_ENDPOINT).
 * Without an endpoint it opens the visitor's email app with the message pre-filled.
 */
export const useContactForm = (recipient: string) => {
  const [status, setStatus] = useState<Status>(IDLE);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = field(data, 'name');
    const email = field(data, 'email');
    const message = field(data, 'message');

    if (!name || !email || !message) {
      setStatus({ kind: 'error', message: 'Please fill in your name, email, and project details before sending.' });
      return;
    }

    if (field(data, '_gotcha')) {
      // Hidden field only bots fill in: pretend it worked and send nothing.
      setStatus({ kind: 'success', message: 'Thanks! Your message was sent.' });
      form.reset();
      return;
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      setStatus({ kind: 'success', message: 'Opening your email app with the message ready to send.' });
      return;
    }

    setStatus({ kind: 'sending', message: 'Sending…' });
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus({ kind: 'success', message: "Thanks! Your message was sent. I'll reply by email soon." });
      form.reset();
    } catch {
      setStatus({ kind: 'error', message: `Sorry, that didn't send. Please email me at ${recipient} instead.` });
    }
  };

  return { status, handleSubmit };
};
