import starlight from "@astrojs/starlight";
import starlightThemeSix from "@six-tech/starlight-theme-six";
import { defineConfig } from "astro/config";

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

/** Six テーマのフッター文言です。 */
const footerText = "Designed for Bookmark CLI Extension.";

/** Astro と Starlight のドキュメントサイト設定です。
 *
 * @see https://docs.astro.build/en/reference/configuration-reference/
 * @see https://starlight.astro.build/getting-started/
 * @see https://six-tech.github.io/Six.StarlightTheme/
 */
export default defineConfig({
  base: documentationBasePath,
  integrations: [
    starlight({
      customCss: ["./src/styles/fonts.css"],
      description: documentationDescription,
      favicon: "/favicon.svg",
      plugins: [
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
            { label: "未決事項", slug: "specs/open-questions" },
          ],
          label: "仕様",
        },
        {
          items: [{ label: "開発環境", slug: "development/environment" }],
          label: "開発",
        },
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
  site: documentationSiteUrl,
});
