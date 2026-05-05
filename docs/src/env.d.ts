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

declare module "virtual:starlight-versions-config" {
  const config: import("starlight-versions").StarlightVersionsConfig;

  export default config;
}

declare module "virtual:starlight/project-context" {
  const context: {
    readonly build: {
      readonly format: import("astro").AstroConfig["build"]["format"];
    };
    readonly root: string;
    readonly srcDir: string;
    readonly trailingSlash: import("astro").AstroConfig["trailingSlash"];
  };

  export default context;
}

declare module "virtual:starlight/pagefind-config" {
  export const pagefindUserConfig: Partial<
    Extract<import("@astrojs/starlight/types").StarlightConfig["pagefind"], object>
  >;
}
