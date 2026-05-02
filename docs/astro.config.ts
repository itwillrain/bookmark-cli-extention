import starlight from "@astrojs/starlight";
import starlightThemeSix from "@six-tech/starlight-theme-six";
import { defineConfig } from "astro/config";
import starlightTypeDoc, { typeDocSidebarGroup } from "starlight-typedoc";

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

/** Six テーマのフッター文言です。 */
const footerText = "Designed for Bookmark CLI Extension.";

/** TypeDoc が API リファレンスとして読み込む entrypoint です。 */
const typeDocEntryPoints = ["../src/entrypoints/background.ts"];

/** TypeDoc が参照する TypeScript 設定ファイルです。 */
const typeDocTsconfig = "../tsconfig.json";

/** TypeDoc が生成する Starlight content 配下の出力先です。 */
const typeDocOutputDirectory = "api";

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
  integrations: [
    starlight({
      customCss: ["./src/styles/fonts.css"],
      description: documentationDescription,
      favicon: "/favicon.svg",
      plugins: [
        starlightTypeDoc({
          entryPoints: typeDocEntryPoints,
          errorOnEmptyDocumentation: false,
          output: typeDocOutputDirectory,
          sidebar: {
            label: "APIリファレンス",
          },
          tsconfig: typeDocTsconfig,
        }),
        starlightThemeSix({
          footerText,
          navLinks: [
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
            { label: "ドキュメント方針", slug: "guides/documentation-policy" },
          ],
          label: "はじめに",
        },
        {
          items: [
            { label: "仕様トップ", slug: "specs" },
            { label: "プロダクト仕様", slug: "specs/product" },
            { label: "CLI仕様", slug: "specs/cli" },
            { label: "Chrome連携仕様", slug: "specs/chrome-bookmarks" },
            { label: "保存データ構造と権限", slug: "specs/storage-permissions" },
            { label: "アーキテクチャと責務境界", slug: "specs/architecture" },
            { label: "未決事項", slug: "specs/open-questions" },
          ],
          label: "仕様",
        },
        {
          items: [{ label: "開発環境", slug: "development/environment" }],
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
