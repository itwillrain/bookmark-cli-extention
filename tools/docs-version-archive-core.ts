import * as childProcess from "node:child_process";
import * as path from "node:path";

import {
  type ArchivedDocumentationVersion,
  parseReleaseVersion,
  upsertArchivedDocumentationVersion,
} from "./docs-version-archive-semver";
import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

/** Docs archive生成入力。 */
export interface ArchiveDocumentationVersionInput {
  /** Release version。 */
  readonly releaseVersion: string;
  /** Repository root path。 */
  readonly repositoryRootPath?: string;
}

/** Package version確認対象。 */
export interface PackageVersionTarget {
  /** Package.json file path。 */
  readonly filePath: string;
  /** Error messageに表示するlabel。 */
  readonly label: string;
}

/** Package version確認結果。 */
export interface PackageVersionCheckResult extends PackageVersionTarget {
  /** 実際のpackage version。 */
  readonly actualVersion: string;
}

/** Repository rootの絶対path。 */
export const defaultRepositoryRootPath = path.resolve(import.meta.dirname, "..");

/** Archived docs version listのrepository rootからの相対path。 */
export const archivedDocumentationVersionsRelativePath = path.join(
  "docs",
  "src",
  "data",
  "archived-documentation-versions.json",
);

/** Root package.jsonのrepository rootからの相対path。 */
export const rootPackageJsonRelativePath = "package.json";

/** Docs package.jsonのrepository rootからの相対path。 */
export const docsPackageJsonRelativePath = path.join("docs", "package.json");

/** JSON出力で使うindent幅。 */
export const jsonIndentSize = 2;

/**
 * JSON.stringifyに値をそのまま返すreplacer。
 * @param {string} _key JSON property key。
 * @param {unknown} value JSON property value。
 * @returns {unknown} 変換しないJSON property value。
 */
export const jsonStringifyReplacer = (_key: string, value: unknown): unknown => value;

/** Command成功を表すexit code。 */
export const successfulExitCode = 0;

/** Windows platformの識別子。 */
export const windowsPlatform = "win32";

/**
 * JSON fileを読み込む。
 * @param {string} filePath JSON file path。
 * @returns {Promise<unknown>} parse済みJSON。
 */
export const readJsonFile = async (filePath: string): Promise<unknown> =>
  JSON.parse(await readFile(filePath, "utf8"));

/**
 * JSON fileへ安定したformatで書き込む。
 * @param {string} filePath JSON file path。
 * @param {unknown} value JSON化する値。
 * @returns {Promise<void>} 書き込み完了。
 */
export const writeJsonFile = async (filePath: string, value: unknown): Promise<void> => {
  await writeFile(filePath, `${JSON.stringify(value, jsonStringifyReplacer, jsonIndentSize)}\n`);
};

/**
 * Archived docs version entryかどうかを判定する。
 * @param {unknown} value archived docs version entry候補。
 * @returns {boolean} entryとして扱えるならtrue。
 */
export const isArchivedDocumentationVersion = (
  value: unknown,
): value is ArchivedDocumentationVersion => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const slugValue: unknown = Reflect.get(value, "slug");
  const labelValue: unknown = Reflect.get(value, "label");
  const hasValidLabel = !Object.hasOwn(value, "label") || typeof labelValue === "string";

  return typeof slugValue === "string" && hasValidLabel;
};

/**
 * Archived docs version listを検証する。
 * @param {unknown} value archived docs version list候補。
 * @returns {readonly ArchivedDocumentationVersion[]} 検証済みlist。
 * @throws {TypeError} archived docs version listとして無効な場合。
 */
export const parseArchivedDocumentationVersions = (
  value: unknown,
): readonly ArchivedDocumentationVersion[] => {
  if (!Array.isArray(value)) {
    throw new TypeError(`${archivedDocumentationVersionsRelativePath} must contain an array.`);
  }

  if (!value.every((entry) => isArchivedDocumentationVersion(entry))) {
    throw new TypeError(`${archivedDocumentationVersionsRelativePath} has an invalid entry.`);
  }

  return value;
};

/**
 * Package.jsonからversionを読み込む。
 * @param {string} filePath package.json path。
 * @returns {Promise<string>} package version。
 */
export const readPackageVersion = async (filePath: string): Promise<string> => {
  const packageJson = await readJsonFile(filePath);

  if (
    typeof packageJson !== "object" ||
    packageJson === null ||
    !("version" in packageJson) ||
    typeof packageJson.version !== "string"
  ) {
    throw new TypeError(`${filePath} does not have a string version field.`);
  }

  return packageJson.version;
};

/**
 * Package version確認対象を作る。
 * @param {string} repositoryRootPath repository root path。
 * @returns {readonly PackageVersionTarget[]} package version確認対象。
 */
export const createPackageVersionTargets = (
  repositoryRootPath: string,
): readonly PackageVersionTarget[] => [
  {
    filePath: path.join(repositoryRootPath, rootPackageJsonRelativePath),
    label: rootPackageJsonRelativePath,
  },
  {
    filePath: path.join(repositoryRootPath, docsPackageJsonRelativePath),
    label: docsPackageJsonRelativePath,
  },
];

/**
 * Package version確認結果を作る。
 * @param {PackageVersionTarget} target package version確認対象。
 * @returns {Promise<PackageVersionCheckResult>} package version確認結果。
 */
export const checkPackageVersion = async (
  target: Readonly<PackageVersionTarget>,
): Promise<PackageVersionCheckResult> => ({
  actualVersion: await readPackageVersion(target.filePath),
  filePath: target.filePath,
  label: target.label,
});

/**
 * Root packageとdocs packageのversionがrelease versionと一致するか検証する。
 * @param {Required<ArchiveDocumentationVersionInput>} input 検証入力。
 * @returns {Promise<void>} 検証完了。
 */
export const assertPackageVersions = async ({
  releaseVersion,
  repositoryRootPath,
}: Required<ArchiveDocumentationVersionInput>): Promise<void> => {
  const packageVersions = await Promise.all(
    createPackageVersionTargets(repositoryRootPath).map(
      async (target): Promise<PackageVersionCheckResult> => {
        const packageVersion = await checkPackageVersion(target);

        return packageVersion;
      },
    ),
  );
  const mismatchedPackage = packageVersions.find(
    (packageVersion) => packageVersion.actualVersion !== releaseVersion,
  );

  if (mismatchedPackage) {
    throw new Error(
      `${mismatchedPackage.label} version ${mismatchedPackage.actualVersion} does not match ${releaseVersion}.`,
    );
  }
};

/**
 * Docs archive生成commandを実行する。
 * @param {string} repositoryRootPath repository root path。
 * @returns {void} command実行結果。
 * @throws {Error} docs archive生成commandが失敗した場合。
 */
export const runDocsArchiveBuild = (repositoryRootPath: string): void => {
  const result = childProcess.spawnSync("pnpm", ["--dir", "docs", "astro", "build"], {
    cwd: repositoryRootPath,
    shell: process.platform === windowsPlatform,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== successfulExitCode) {
    const exitCodeLabel = String(result.status ?? "unknown");

    throw new Error(`docs archive build failed with exit code ${exitCodeLabel}.`);
  }
};

/**
 * Docs version archiveを生成する。
 * @param {ArchiveDocumentationVersionInput} input archive入力。
 * @returns {Promise<void>} archive生成完了。
 */
export const archiveDocumentationVersion = async ({
  releaseVersion,
  repositoryRootPath = defaultRepositoryRootPath,
}: ArchiveDocumentationVersionInput): Promise<void> => {
  const parsedReleaseVersion = parseReleaseVersion(releaseVersion);
  const archivedDocumentationVersionsPath = path.join(
    repositoryRootPath,
    archivedDocumentationVersionsRelativePath,
  );
  const archivedDocumentationVersions = parseArchivedDocumentationVersions(
    await readJsonFile(archivedDocumentationVersionsPath),
  );

  await assertPackageVersions({ releaseVersion: parsedReleaseVersion, repositoryRootPath });
  await writeJsonFile(
    archivedDocumentationVersionsPath,
    upsertArchivedDocumentationVersion(archivedDocumentationVersions, parsedReleaseVersion),
  );
  runDocsArchiveBuild(repositoryRootPath);
};
