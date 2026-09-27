/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAIL_ENDPOINT?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_ENGLISH_URLS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
