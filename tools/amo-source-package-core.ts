import * as path from "node:path";

/** AMO source packageへ含めるrepository root相対path一覧。 */
export const amoSourcePackageRelativeSourcePaths = [
  ".npmrc",
  "LICENSE",
  "README.md",
  "package.json",
  "pnpm-lock.yaml",
  "public",
  "src",
  "store-assets/amo-review-notes.md",
  "tsconfig.json",
  "wxt.config.ts",
] as const;

/** Release assetを生成するdist directory名。 */
export const releaseDistDirectoryName = "dist";

/** AMO source package名に付けるsuffix。 */
export const amoSourcePackageSuffix = "amo-sources";

/** SemVer range prefixとして表示から落とす文字に一致する正規表現。 */
export const semverRangePrefixPattern = /^[~^]/u;

/** AMO source package metadata。 */
export interface AmoSourcePackageMetadata {
  /** Package名。 */
  readonly packageName: string;
  /** Release version。 */
  readonly releaseVersion: string;
  /** Package manager指定。 */
  readonly packageManager: string;
  /** WXT dependency version指定。 */
  readonly wxtVersion: string;
}

/** AMO source package生成計画入力。 */
export interface CreateAmoSourcePackagePlanInput {
  /** Repository root path。 */
  readonly repositoryRootPath: string;
  /** AMO source package metadata。 */
  readonly metadata: AmoSourcePackageMetadata;
}

/** AMO source packageへcopyするfileまたはdirectory。 */
export interface AmoSourcePackageSourceCopy {
  /** Copy元path。 */
  readonly sourcePath: string;
  /** Copy先path。 */
  readonly destinationPath: string;
}

/** AMO source package生成計画。 */
export interface AmoSourcePackagePlan {
  /** Staging directory path。 */
  readonly stagingDirectoryPath: string;
  /** Output zip path。 */
  readonly outputZipPath: string;
  /** README_AMO_SOURCE.md path。 */
  readonly readmePath: string;
  /** Copy対象一覧。 */
  readonly sourceCopies: readonly AmoSourcePackageSourceCopy[];
}

/**
 * Dependency version表示からrange prefixを外す。
 * @param {string} dependencyVersion package.jsonに記載されたdependency version。
 * @returns {string} 審査メモに表示するdependency version。
 */
export const normalizeDependencyVersionLabel = (dependencyVersion: string): string =>
  dependencyVersion.replace(semverRangePrefixPattern, "");

/**
 * AMO source packageのbase nameを作る。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {string} 拡張子なしのpackage名。
 */
export const createAmoSourcePackageBaseName = ({
  packageName,
  releaseVersion,
}: Pick<AmoSourcePackageMetadata, "packageName" | "releaseVersion">): string =>
  `${packageName}-${releaseVersion}-${amoSourcePackageSuffix}`;

/**
 * AMO source packageのzip file名を作る。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {string} zip file名。
 */
export const createAmoSourcePackageZipFileName = (
  metadata: Pick<AmoSourcePackageMetadata, "packageName" | "releaseVersion">,
): string => `${createAmoSourcePackageBaseName(metadata)}.zip`;

/**
 * AMO source package生成計画を作る。
 * @param {CreateAmoSourcePackagePlanInput} input 生成計画入力。
 * @returns {AmoSourcePackagePlan} AMO source package生成計画。
 */
export const createAmoSourcePackagePlan = ({
  metadata,
  repositoryRootPath,
}: CreateAmoSourcePackagePlanInput): AmoSourcePackagePlan => {
  const stagingDirectoryPath = path.join(
    repositoryRootPath,
    releaseDistDirectoryName,
    createAmoSourcePackageBaseName(metadata),
  );

  return {
    outputZipPath: path.join(
      repositoryRootPath,
      releaseDistDirectoryName,
      createAmoSourcePackageZipFileName(metadata),
    ),
    readmePath: path.join(stagingDirectoryPath, "README_AMO_SOURCE.md"),
    sourceCopies: amoSourcePackageRelativeSourcePaths.map((relativePath) => ({
      destinationPath: path.join(stagingDirectoryPath, relativePath),
      sourcePath: path.join(repositoryRootPath, relativePath),
    })),
    stagingDirectoryPath,
  };
};

/**
 * AMO reviewer向けREADMEを作る。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {string} README_AMO_SOURCE.md content。
 */
export const createAmoSourcePackageHeading = ({
  packageName,
  releaseVersion,
}: Pick<
  AmoSourcePackageMetadata,
  "packageName" | "releaseVersion"
>): string => `# AMO Source Package

This source package matches \`${packageName}-${releaseVersion}-firefox.zip\`.`;

/**
 * AMO source packageのbuild environment sectionを作る。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {string} build environment section。
 */
export const createAmoSourcePackageBuildEnvironmentSection = ({
  packageManager,
  wxtVersion,
}: Pick<AmoSourcePackageMetadata, "packageManager" | "wxtVersion">): string => {
  const normalizedWxtVersion = normalizeDependencyVersionLabel(wxtVersion);

  return `## Build Environment

- Package manager: ${packageManager}
- Node.js: 24.x, or another active Node.js version compatible with the project dependencies
- Build tool: WXT ${normalizedWxtVersion}

Mozilla reviewers may use the default AMO reviewer environment. The build uses only npm registry dependencies resolved through \`pnpm-lock.yaml\`.`;
};

/**
 * AMO source packageのrebuild sectionを作る。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {string} rebuild section。
 */
export const createAmoSourcePackageRebuildSection = ({
  packageManager,
  packageName,
  releaseVersion,
}: Pick<
  AmoSourcePackageMetadata,
  "packageManager" | "packageName" | "releaseVersion"
>): string => `## Rebuild the Firefox Package

\`\`\`bash
corepack enable
corepack prepare ${packageManager} --activate
pnpm install --frozen-lockfile
pnpm run zip:firefox
\`\`\`

The generated Firefox package is written to:

\`\`\`text
dist/${packageName}-${releaseVersion}-firefox.zip
\`\`\``;

/**
 * AMO source packageのscope sectionを作る。
 * @returns {string} scope section。
 */
export const createAmoSourcePackageScopeSection = (): string => `## Package Scope

This AMO source package intentionally includes only the files required to rebuild the Firefox extension: root package metadata, pnpm lockfile, WXT/TypeScript configuration, \`src/\`, \`public/\`, license, README, and AMO review notes.

The repository documentation site and archived documentation snapshots are excluded because they are not used by \`pnpm run zip:firefox\` and made the expanded AMO source upload too large.`;

/**
 * AMO source packageのverification sectionを作る。
 * @returns {string} verification section。
 */
export const createAmoSourcePackageVerificationSection =
  (): string => `## Optional Verification Commands

\`\`\`bash
pnpm run build:firefox
pnpm run zip:firefox
\`\`\``;

/**
 * AMO source packageのreview notes sectionを作る。
 * @returns {string} review notes section。
 */
export const createAmoSourcePackageNotesSection = (): string => `## Notes for Review

- Additional AMO review notes are included in \`store-assets/amo-review-notes.md\`.
- The extension is built with WXT, React, Tailwind CSS, TypeScript, and Typia.
- The Firefox build uses Manifest V2 output generated by WXT.
- The Firefox manifest intentionally excludes the Chrome-only \`favicon\` permission.
- The Firefox manifest declares \`browser_specific_settings.gecko.data_collection_permissions.required: ["none"]\`.
- The extension stores bookmark CLI state locally through the browser extension storage APIs.
- The extension does not intentionally transmit user bookmark or history data to external services.`;

/**
 * AMO reviewer向けREADMEを作る。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {string} README_AMO_SOURCE.md content。
 */
export const createAmoSourcePackageReadme = (
  metadata: Readonly<AmoSourcePackageMetadata>,
): string =>
  `${[
    createAmoSourcePackageHeading(metadata),
    createAmoSourcePackageBuildEnvironmentSection(metadata),
    createAmoSourcePackageRebuildSection(metadata),
    createAmoSourcePackageScopeSection(),
    createAmoSourcePackageVerificationSection(),
    createAmoSourcePackageNotesSection(),
  ].join("\n\n")}\n`;
