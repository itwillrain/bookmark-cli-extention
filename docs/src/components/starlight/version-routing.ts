import type { StarlightVersionsConfig } from "starlight-versions";

/** 公開済みdocs version設定です。 */
export type PublishedDocumentationVersion = StarlightVersionsConfig["versions"][number];

/** Route segment区切り文字です。 */
export const routeSegmentSeparator = "/";

/** Starlightのindex page route idです。 */
export const indexRouteId = "index";

/** 空のroute idです。 */
export const emptyRouteId = "";

/** URL pathのrootです。 */
export const rootPathname = "/";

/** BASE_URL末尾のslashに一致する正規表現です。 */
export const trailingSlashPattern = /\/$/u;

/**
 * Astro base pathから末尾slashを取り除く。
 * @param {string} basePath Astro base path。
 * @returns {string} 末尾slashを取り除いたbase path。
 */
export const stripTrailingSlash = (basePath: string): string => basePath.replace(trailingSlashPattern, "");

/**
 * Route idから公開済みversionを解決する。
 * @param {readonly PublishedDocumentationVersion[]} versions 公開済みversion一覧。
 * @param {string} routeId Starlight route id。
 * @returns {PublishedDocumentationVersion | undefined} routeに対応する公開済みversion。
 */
export const resolvePublishedVersionFromRouteId = (
  versions: readonly PublishedDocumentationVersion[],
  routeId: string,
): PublishedDocumentationVersion | undefined =>
  versions.find(
    (version) => routeId === version.slug || routeId.startsWith(`${version.slug}${routeSegmentSeparator}`),
  );

/**
 * Route idからversion segmentを取り除く。
 * @param {string} routeId Starlight route id。
 * @param {PublishedDocumentationVersion | undefined} version routeに対応する公開済みversion。
 * @returns {string} version segmentを含まないroute id。
 */
export const createUnversionedRouteId = (
  routeId: string,
  version: PublishedDocumentationVersion | undefined,
): string => {
  if (!version) {
    return routeId === indexRouteId ? emptyRouteId : routeId;
  }

  if (routeId === version.slug) {
    return emptyRouteId;
  }

  return routeId.replace(`${version.slug}${routeSegmentSeparator}`, "");
};

/**
 * Route idとversionから公開version URL pathを作る。
 * @param {object} input URL path作成入力。
 * @param {string} input.basePath Astro base path。
 * @param {string} input.routeId Starlight route id。
 * @param {PublishedDocumentationVersion | undefined} input.sourceVersion routeに対応する公開済みversion。
 * @param {PublishedDocumentationVersion} input.targetVersion 遷移先version。
 * @returns {string} 公開version URL path。
 */
export const createPublishedVersionPathname = ({
  basePath,
  routeId,
  sourceVersion,
  targetVersion,
}: {
  readonly basePath: string;
  readonly routeId: string;
  readonly sourceVersion: PublishedDocumentationVersion | undefined;
  readonly targetVersion: PublishedDocumentationVersion;
}): string => {
  const normalizedBasePath = stripTrailingSlash(basePath);
  const unversionedRouteId = createUnversionedRouteId(routeId, sourceVersion);
  const versionedRouteId =
    unversionedRouteId.length === 0
      ? targetVersion.slug
      : `${targetVersion.slug}${routeSegmentSeparator}${unversionedRouteId}`;

  return `${normalizedBasePath}${rootPathname}${versionedRouteId}${routeSegmentSeparator}`;
};
