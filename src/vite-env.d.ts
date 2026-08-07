/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JOIN_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
