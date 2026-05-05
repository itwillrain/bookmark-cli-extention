/** Archived docs version entryのshape。 */
export interface ArchivedDocumentationVersion {
  /** Version selectorに表示するlabel。 */
  readonly label?: string;
  /** Version URLで使うslug。 */
  readonly slug: string;
}

/** Labelを補完したarchived docs version entry。 */
export interface NormalizedArchivedDocumentationVersion {
  /** Version selectorに表示するlabel。 */
  readonly label: string;
  /** Version URLで使うslug。 */
  readonly slug: string;
}

/** SemVerの比較用parts。 */
export interface SemverParts {
  /** Major version。 */
  readonly major: number;
  /** Minor version。 */
  readonly minor: number;
  /** Patch version。 */
  readonly patch: number;
  /** Prerelease identifier。 */
  readonly prerelease: string;
}

/** `v` prefixを含まないrelease versionに一致する正規表現。 */
export const releaseVersionPattern = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/u;

/** 空文字列の長さ。 */
export const emptyStringLength = 0;

/** CLI実行引数のうちuser引数が始まるindex。 */
export const userArgumentStartIndex = 2;

/** SemVer coreとprereleaseに分ける最大segment数。 */
export const semverPrereleaseSplitLimit = 2;

/** SemVer coreをmajor、minor、patchに分ける最大segment数。 */
export const semverCoreSplitLimit = 3;

/** 10進数parseに使うradix。 */
export const decimalRadix = 10;

/** Sort callbackで同値を表す値。 */
export const sameSortOrder = 0;

/** Sort callbackで左辺を先に置く値。 */
export const leftSortsFirst = -1;

/** Sort callbackで右辺を先に置く値。 */
export const rightSortsFirst = 1;

/**
 * Release versionを検証する。
 * @param {unknown} value release version候補。
 * @returns {string} 検証済みrelease version。
 * @throws {Error} release versionが未指定またはSemVerでない場合。
 */
export const parseReleaseVersion = (value: unknown): string => {
  let releaseVersion = "";

  if (typeof value === "string") {
    releaseVersion = value.trim();
  }

  if (releaseVersion.length === emptyStringLength) {
    throw new Error("release version is required.");
  }

  if (releaseVersion.startsWith("v")) {
    throw new Error("release version must not include the v prefix.");
  }

  if (!releaseVersionPattern.test(releaseVersion)) {
    throw new Error("release version must be a SemVer value such as 1.2.3.");
  }

  return releaseVersion;
};

/**
 * CLI argumentsからrelease versionを取り出す。
 * @param {readonly string[]} argv command line arguments。
 * @returns {string} 検証済みrelease version。
 */
export const parseReleaseVersionArgument = (argv: readonly string[]): string =>
  parseReleaseVersion(argv.slice(userArgumentStartIndex).find((argument) => argument !== "--"));

/**
 * Release versionからarchived docs version entryを作る。
 * @param {string} releaseVersion release version。
 * @returns {NormalizedArchivedDocumentationVersion} archived docs version entry。
 */
export const createArchivedDocumentationVersion = (
  releaseVersion: string,
): NormalizedArchivedDocumentationVersion => ({
  label: `v${releaseVersion}`,
  slug: releaseVersion,
});

/**
 * SemVer文字列を比較用partsへ分解する。
 * @param {string} releaseVersion release version。
 * @returns {SemverParts} SemVer parts。
 */
export const parseSemverParts = (releaseVersion: string): SemverParts => {
  const [versionCore = "", prerelease = ""] = releaseVersion.split("-", semverPrereleaseSplitLimit);
  const [major = "0", minor = "0", patch = "0"] = versionCore.split(".", semverCoreSplitLimit);

  return {
    major: Number.parseInt(major, decimalRadix),
    minor: Number.parseInt(minor, decimalRadix),
    patch: Number.parseInt(patch, decimalRadix),
    prerelease,
  };
};

/**
 * SemVerのnumeric partsを新しい順で比較する。
 * @param {SemverParts} left 左辺のSemVer parts。
 * @param {SemverParts} right 右辺のSemVer parts。
 * @returns {number} sort callbackの比較結果。
 */
export const compareNumericSemverPartsDescending = (
  left: Readonly<SemverParts>,
  right: Readonly<SemverParts>,
): number => {
  const majorDiff = right.major - left.major;
  const minorDiff = right.minor - left.minor;
  const patchDiff = right.patch - left.patch;

  if (majorDiff !== sameSortOrder) {
    return majorDiff;
  }

  if (minorDiff !== sameSortOrder) {
    return minorDiff;
  }

  return patchDiff;
};

/**
 * Prerelease identifierをstable優先で比較する。
 * @param {string} left 左辺のprerelease identifier。
 * @param {string} right 右辺のprerelease identifier。
 * @returns {number} sort callbackの比較結果。
 */
export const comparePrereleaseVersionsDescending = (left: string, right: string): number => {
  if (left === right) {
    return sameSortOrder;
  }

  if (left.length === emptyStringLength) {
    return leftSortsFirst;
  }

  if (right.length === emptyStringLength) {
    return rightSortsFirst;
  }

  return right.localeCompare(left);
};

/**
 * Release versionを新しい順で比較する。
 * @param {string} left 左辺のrelease version。
 * @param {string} right 右辺のrelease version。
 * @returns {number} sort callbackの比較結果。
 */
export const compareReleaseVersionsDescending = (left: string, right: string): number => {
  const leftParts = parseSemverParts(left);
  const rightParts = parseSemverParts(right);
  const numericDiff = compareNumericSemverPartsDescending(leftParts, rightParts);

  if (numericDiff !== sameSortOrder) {
    return numericDiff;
  }

  return comparePrereleaseVersionsDescending(leftParts.prerelease, rightParts.prerelease);
};

/**
 * Archived docs version entryを新しい順で比較する。
 * @param {NormalizedArchivedDocumentationVersion} left 左辺のentry。
 * @param {NormalizedArchivedDocumentationVersion} right 右辺のentry。
 * @returns {number} sort callbackの比較結果。
 */
export const compareArchivedDocumentationVersionsDescending = (
  left: Readonly<NormalizedArchivedDocumentationVersion>,
  right: Readonly<NormalizedArchivedDocumentationVersion>,
): number => compareReleaseVersionsDescending(left.slug, right.slug);

/**
 * Archived docs version listへrelease versionを追加する。
 * @param {readonly ArchivedDocumentationVersion[]} archivedDocumentationVersions 既存version list。
 * @param {string} releaseVersion 追加するrelease version。
 * @returns {readonly NormalizedArchivedDocumentationVersion[]} 更新後のversion list。
 */
export const upsertArchivedDocumentationVersion = (
  archivedDocumentationVersions: readonly ArchivedDocumentationVersion[],
  releaseVersion: string,
): readonly NormalizedArchivedDocumentationVersion[] => {
  const nextVersion = createArchivedDocumentationVersion(releaseVersion);
  const versionBySlug = new Map(
    archivedDocumentationVersions.map((version) => [
      version.slug,
      {
        label: version.label ?? `v${version.slug}`,
        slug: version.slug,
      },
    ]),
  );

  if (!versionBySlug.has(nextVersion.slug)) {
    versionBySlug.set(nextVersion.slug, nextVersion);
  }

  return [...versionBySlug.values()].toSorted(compareArchivedDocumentationVersionsDescending);
};
