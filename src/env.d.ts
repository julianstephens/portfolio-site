/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly GH_PAT: string;
  readonly GH_USER: string;
  readonly PUBLIC_BASE_URL: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
