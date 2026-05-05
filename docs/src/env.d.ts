/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "virtual:starlight-theme-six-config" {
  const config: {
    navLinks?: readonly {
      attrs?: Record<string, boolean | number | string | undefined>;
      badge?: string;
      label: string | Record<string, string>;
      link: string;
    }[];
  };

  export default config;
}
