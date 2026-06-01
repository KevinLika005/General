/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAIL_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
