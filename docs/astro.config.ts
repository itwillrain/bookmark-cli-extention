import starlight from "@astrojs/starlight";
import starlightThemeSix from "@six-tech/starlight-theme-six";
import { defineConfig } from "astro/config";
import { readdirSync, readFileSync } from "node:fs";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";
import starlightVersions, { type StarlightVersionsUserConfig } from "starlight-versions";

/** starlight-versionsへ渡す公開済みdocs version設定です。 */
type ArchivedDocumentationVersionConfig = NonNullable<StarlightVersionsUserConfig["versions"]>[number];

/** Astro redirect設定です。 */
type DocumentationRedirects = NonNullable<Parameters<typeof defineConfig>[0]["redirects"]>;

/** ドキュメントサイトのタイトルです。 */
const documentationTitle = "Bookmark CLI Extension";

/** ドキュメントサイトの説明文です。 */
const documentationDescription = "Bookmark を CLI 管理するブラウザ拡張の設計・利用ガイドです。";

/** リポジトリの公開 URL です。 */
const repositoryUrl = "https://github.com/itwillrain/bookmark-cli-extention";

/** GitHub Pages で公開するサイト URL です。
 *
 * @see https://docs.astro.build/en/guides/deploy/github/
 */
const documentationSiteUrl = "https://itwillrain.github.io";

/** GitHub Pages のプロジェクトサイト用 base path です。
 *
 * @see https://docs.astro.build/en/guides/deploy/github/
 */
const documentationBasePath = "/bookmark-cli-extention";

/** GitHub Pages 向けのビルドかどうかです。 */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

/** Storybook の静的公開先パスです。 */
const storybookCatalogPath = "/storybook/";

/** Six テーマのフッター文言です。 */
const footerText = "Designed for Bookmark CLI Extension.";

/** TypeDoc が API リファレンスとして読み込む entrypoint です。 */
const typeDocEntryPoints = [
  "../src/application",
  "../src/domain",
  "../src/infrastructure",
  "../src/presentation",
  "../src/entrypoints",
];

/** TypeDoc が API リファレンスから除外するfile globです。 */
const typeDocExcludePatterns = ["../src/**/*.test.ts", "../src/**/*.stories.ts", "../src/**/*.stories.tsx"];

/** TypeDoc がdirectory entrypointを展開する設定値です。
 *
 * @see https://typedoc.org/documents/Options.Input.html#entrypointstrategy
 */
const typeDocEntryPointStrategy = "expand";

/** TypeDoc が参照する TypeScript 設定ファイルです。 */
const typeDocTsconfig = "../tsconfig.json";

/** TypeDoc が生成する Starlight content 配下の出力先です。 */
const typeDocOutputDirectory = "api";

/** Markdown fileの拡張子です。 */
const markdownFileExtension = ".md";

/** Directory index pageを表すMarkdown file名です。 */
const indexMarkdownFileName = "index.md";

/** archived docs version listを保持するJSON fileです。 */
const archivedDocumentationVersionsPath = new URL(
  "./src/data/archived-documentation-versions.json",
  import.meta.url,
);

/** Starlight docs content directoryです。 */
const documentationContentDirectory = new URL("./src/content/docs/", import.meta.url);

/**
 * archived docs version listを読み込む。
 * @returns {StarlightVersionsUserConfig["versions"]} starlight-versionsへ渡すversion設定。
 */
const readArchivedDocumentationVersions = (): StarlightVersionsUserConfig["versions"] =>
  JSON.parse(readFileSync(archivedDocumentationVersionsPath, "utf8")) as StarlightVersionsUserConfig["versions"];

/** 公開済みdocs versionの一覧です。 */
const archivedDocumentationVersions = readArchivedDocumentationVersions();

/**
 * 最新の公開済みdocs versionを解決する。
 * @param {StarlightVersionsUserConfig["versions"]} versions 公開済みdocs version一覧。
 * @returns {ArchivedDocumentationVersionConfig} 最新の公開済みdocs version。
 * @throws {Error} 公開済みdocs versionが未設定の場合。
 */
const resolveLatestArchivedDocumentationVersion = (
  versions: StarlightVersionsUserConfig["versions"],
): ArchivedDocumentationVersionConfig => {
  const latestVersion = versions?.[0];

  if (!latestVersion) {
    throw new Error("At least one archived documentation version is required.");
  }

  return latestVersion;
};

/** 最新の公開済みdocs versionです。 */
const latestArchivedDocumentationVersion = resolveLatestArchivedDocumentationVersion(archivedDocumentationVersions);

/** 最新の公開済みdocs version URL prefixです。 */
const latestArchivedDocumentationVersionPath = `/${latestArchivedDocumentationVersion.slug}`;

/** Redirect先へ付与するbase pathです。 */
const documentationRedirectBasePath = isGitHubPagesBuild ? documentationBasePath : "";

/** Current docs route redirectから除外するroot directory名です。 */
const currentDocumentationRedirectExcludedRootDirectoryNames = new Set([
  typeDocOutputDirectory,
  ...archivedDocumentationVersions.map((version) => version.slug),
]);

/**
 * Markdown file名からroute segmentを作る。
 * @param {string} fileName Markdown file名。
 * @returns {string} route segment。
 */
const createMarkdownRouteSegment = (fileName: string): string => fileName.slice(0, -markdownFileExtension.length);

/**
 * Markdown route segment listからAstro route pathを作る。
 * @param {readonly string[]} routeSegments route segment list。
 * @returns {string} Astro route path。
 */
const createDocumentationRoutePath = (routeSegments: readonly string[]): string =>
  routeSegments.length === 0 ? "/" : `/${routeSegments.join("/")}`;

/**
 * Current docs contentからredirect元route一覧を作る。
 * @param {URL} directoryUrl 探索するdirectory URL。
 * @param {readonly string[]} routeSegments 現在のroute segment list。
 * @returns {readonly string[]} redirect元route一覧。
 */
const listCurrentDocumentationRoutePaths = (
  directoryUrl: URL,
  routeSegments: readonly string[] = [],
): readonly string[] =>
  readdirSync(directoryUrl, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      if (
        routeSegments.length === 0 &&
        currentDocumentationRedirectExcludedRootDirectoryNames.has(entry.name)
      ) {
        return [];
      }

      return listCurrentDocumentationRoutePaths(new URL(`${entry.name}/`, directoryUrl), [...routeSegments, entry.name]);
    }

    if (!entry.isFile() || !entry.name.endsWith(markdownFileExtension)) {
      return [];
    }

    return [
      createDocumentationRoutePath(
        entry.name === indexMarkdownFileName
          ? routeSegments
          : [...routeSegments, createMarkdownRouteSegment(entry.name)],
      ),
    ];
  });

/**
 * Current docs routeのredirect先を作る。
 * @param {string} routePath redirect元route path。
 * @returns {string} 最新公開versionのroute path。
 */
const createLatestVersionRedirectDestination = (routePath: string): string =>
  routePath === "/"
    ? `${documentationRedirectBasePath}${latestArchivedDocumentationVersionPath}/`
    : `${documentationRedirectBasePath}${latestArchivedDocumentationVersionPath}${routePath}/`;

/**
 * 公開URLからcurrent docs routeを隠すためのredirect設定を作る。
 * @returns {DocumentationRedirects} current docs route redirect設定。
 */
const createCurrentDocumentationRedirects = (): DocumentationRedirects =>
  Object.fromEntries(
    listCurrentDocumentationRoutePaths(documentationContentDirectory).map((routePath) => [
      routePath,
      createLatestVersionRedirectDestination(routePath),
    ]),
  );

/** 公開URLからcurrent docs routeを隠すためのredirect設定です。 */
const currentDocumentationRedirects = createCurrentDocumentationRedirects();

/** 現在編集中のdocs version表示名です。公開UIでは表示しません。 */
const currentDocumentationVersion = {
  label: "main",
};

/** Astro と Starlight のドキュメントサイト設定です。
 *
 * @see https://docs.astro.build/en/reference/configuration-reference/
 * @see https://starlight.astro.build/getting-started/
 * @see https://six-tech.github.io/Six.StarlightTheme/
 * @see https://starlight-typedoc.vercel.app/getting-started/
 */
export default defineConfig({
  ...(isGitHubPagesBuild
    ? {
        base: documentationBasePath,
        site: documentationSiteUrl,
      }
    : {}),
  redirects: currentDocumentationRedirects,
  integrations: [
    starlight({
      customCss: ["./src/styles/fonts.css"],
      description: documentationDescription,
      favicon: "/favicon.png",
      components: {
        Banner: "./src/components/starlight/VersionBanner.astro",
        Header: "./src/components/starlight/Header.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
        Search: "./src/components/starlight/VersionSearch.astro",
      },
      plugins: [
        starlightTypeDoc({
          entryPoints: typeDocEntryPoints,
          output: typeDocOutputDirectory,
          sidebar: {
            label: "APIリファレンス",
          },
          tsconfig: typeDocTsconfig,
          typeDoc: {
            entryPointStrategy: typeDocEntryPointStrategy,
            exclude: typeDocExcludePatterns,
          },
        }),
        starlightVersions({
          current: currentDocumentationVersion,
          versions: archivedDocumentationVersions,
        }),
        starlightThemeSix({
          footerText,
          navLinks: [
            {
              attrs: { target: "_blank" },
              label: "UIカタログ",
              link: storybookCatalogPath,
            },
            {
              attrs: { target: "_blank" },
              label: "GitHub",
              link: repositoryUrl,
            },
          ],
        }),
      ],
      sidebar: [
        {
          items: [
            { label: "概要", slug: "guides/overview" },
            { label: "プライバシーポリシー", slug: "guides/privacy-policy" },
            { label: "ドキュメント方針", slug: "guides/documentation-policy" },
          ],
          label: "はじめに",
        },
        {
          items: [
            { label: "仕様トップ", slug: "specs" },
            { label: "プロダクト仕様", slug: "specs/product" },
            { label: "用語集", slug: "specs/glossary" },
            { label: "CLI仕様", slug: "specs/cli" },
            { label: "コマンドリファレンス", slug: "specs/command-reference" },
            { label: "エラーコード一覧", slug: "specs/error-codes" },
            { label: "Chrome連携仕様", slug: "specs/chrome-bookmarks" },
            { label: "保存データ構造と権限", slug: "specs/storage-permissions" },
            { label: "アーキテクチャと責務境界", slug: "specs/architecture" },
            { label: "UI実装方針", slug: "specs/ui-implementation" },
            { label: "実装ロードマップ", slug: "specs/implementation-roadmap" },
            { label: "ユースケース", slug: "specs/use-cases" },
            { label: "テスト方針", slug: "specs/testing-policy" },
            { label: "未決事項", slug: "specs/open-questions" },
          ],
          label: "仕様",
        },
        {
          items: [
            { label: "開発環境", slug: "development/environment" },
            { label: "Issue運用", slug: "development/issues" },
            { label: "リリース運用", slug: "development/release" },
            { label: "Security運用", slug: "development/security" },
          ],
          label: "開発",
        },
        typeDocSidebarGroup,
      ],
      social: [
        {
          href: repositoryUrl,
          icon: "github",
          label: "GitHub",
        },
      ],
      title: documentationTitle,
    }),
  ],
});
