/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Form service endpoint (for example a Formspree form URL). Optional: without it the form opens the visitor's email app. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
