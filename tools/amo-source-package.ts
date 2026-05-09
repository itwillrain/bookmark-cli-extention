#!/usr/bin/env node

import * as childProcess from "node:child_process";
import * as path from "node:path";

import {
  type AmoSourcePackageMetadata,
  type AmoSourcePackagePlan,
  createAmoSourcePackagePlan,
  createAmoSourcePackageReadme,
} from "./amo-source-package-core";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { parseReleaseVersionArgument } from "./docs-version-archive-semver";
import process from "node:process";

/** CLI実行ファイルpathが入るprocess.argv index。 */
export const executedFilePathArgumentIndex = 1;

/** Process失敗を表すexit code。 */
export const processExitFailureCode = 1;

/** Command成功を表すexit code。 */
export const successfulExitCode = 0;

/** Windows platformの識別子。 */
export const windowsPlatform = "win32";

/** Repository rootの絶対path。 */
export const defaultRepositoryRootPath = path.resolve(import.meta.dirname, "..");

/** Root package.jsonのfile名。 */
export const rootPackageJsonFileName = "package.json";

/** WXT dependency名。 */
export const wxtDependencyName = "wxt";

/** Zip command名。 */
export const zipCommandName = "zip";

/** Zip commandへ渡すquiet recursive option。 */
export const zipQuietRecursiveOption = "-qr";

/** Zip commandでstaging directoryの中身すべてを対象にするpath。 */
export const zipCurrentDirectoryInputPath = ".";

/** Package.jsonのうちAMO source package生成に必要なshape。 */
export interface AmoSourcePackageJson {
  /** Package名。 */
  readonly name: string;
  /** Package manager指定。 */
  readonly packageManager: string;
  /** DevDependencies。 */
  readonly devDependencies: Readonly<Record<string, string>>;
}

/** AMO source package生成入力。 */
export interface CreateAmoSourcePackageInput {
  /** Release version。 */
  readonly releaseVersion: string;
  /** Repository root path。 */
  readonly repositoryRootPath?: string;
}

/**
 * Scriptが直接実行されたかどうかを判定する。
 * @param {string} moduleFilePath import.meta.filename。
 * @param {string | undefined} executedFilePath process.argv[1]。
 * @returns {boolean} 直接実行ならtrue。
 */
export const isDirectlyExecuted = (
  moduleFilePath: string,
  executedFilePath: string | undefined,
): boolean =>
  typeof executedFilePath === "string" && moduleFilePath === path.resolve(executedFilePath);

/**
 * Error messageを文字列化する。
 * @param {unknown} error catchしたerror。
 * @returns {string} stderrへ出力するmessage。
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

/**
 * Objectかどうかを判定する。
 * @param {unknown} value object候補。
 * @returns {boolean} objectならtrue。
 */
export const isObjectRecord = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null;

/**
 * String recordかどうかを判定する。
 * @param {unknown} value string record候補。
 * @returns {boolean} string recordならtrue。
 */
export const isStringRecord = (value: unknown): value is Readonly<Record<string, string>> =>
  isObjectRecord(value) && Object.values(value).every((entry) => typeof entry === "string");

/**
 * String fieldを読み込む。
 * @param {Readonly<Record<string, unknown>>} source 読み込み元object。
 * @param {string} fieldName field名。
 * @returns {string} string field value。
 * @throws {TypeError} fieldがstringではない場合。
 */
export const parseStringField = (
  source: Readonly<Record<string, unknown>>,
  fieldName: string,
): string => {
  const value = source[fieldName];

  if (typeof value !== "string") {
    throw new TypeError(`package.json must contain a string ${fieldName} field.`);
  }

  return value;
};

/**
 * String record fieldを読み込む。
 * @param {Readonly<Record<string, unknown>>} source 読み込み元object。
 * @param {string} fieldName field名。
 * @returns {Readonly<Record<string, string>>} string record field value。
 * @throws {TypeError} fieldがstring recordではない場合。
 */
export const parseStringRecordField = (
  source: Readonly<Record<string, unknown>>,
  fieldName: string,
): Readonly<Record<string, string>> => {
  const value = source[fieldName];

  if (!isStringRecord(value)) {
    throw new TypeError(`package.json ${fieldName} must be a string record.`);
  }

  return value;
};

/**
 * Package.jsonのshapeを検証する。
 * @param {unknown} value package.json候補。
 * @returns {AmoSourcePackageJson} 検証済みpackage.json。
 * @throws {TypeError} 必要なfieldがない場合。
 */
export const parseAmoSourcePackageJson = (value: unknown): AmoSourcePackageJson => {
  if (!isObjectRecord(value)) {
    throw new TypeError("package.json must contain an object.");
  }

  return {
    devDependencies: parseStringRecordField(value, "devDependencies"),
    name: parseStringField(value, "name"),
    packageManager: parseStringField(value, "packageManager"),
  };
};

/**
 * Package.jsonを読み込む。
 * @param {string} repositoryRootPath repository root path。
 * @returns {Promise<AmoSourcePackageJson>} package.json。
 */
export const readAmoSourcePackageJson = async (
  repositoryRootPath: string,
): Promise<AmoSourcePackageJson> =>
  parseAmoSourcePackageJson(
    JSON.parse(await readFile(path.join(repositoryRootPath, rootPackageJsonFileName), "utf8")),
  );

/**
 * AMO source package metadataを読み込む。
 * @param {CreateAmoSourcePackageInput} input AMO source package生成入力。
 * @returns {Promise<AmoSourcePackageMetadata>} metadata。
 */
export const readAmoSourcePackageMetadata = async ({
  releaseVersion,
  repositoryRootPath = defaultRepositoryRootPath,
}: CreateAmoSourcePackageInput): Promise<AmoSourcePackageMetadata> => {
  const packageJson = await readAmoSourcePackageJson(repositoryRootPath);
  const wxtVersion = packageJson.devDependencies[wxtDependencyName];

  if (typeof wxtVersion !== "string") {
    throw new TypeError(`package.json devDependencies must contain ${wxtDependencyName}.`);
  }

  return {
    packageManager: packageJson.packageManager,
    packageName: packageJson.name,
    releaseVersion,
    wxtVersion,
  };
};

/**
 * AMO source packageのsource fileをstaging directoryへcopyする。
 * @param {AmoSourcePackagePlan} plan AMO source package生成計画。
 * @returns {Promise<void>} copy完了。
 */
export const copyAmoSourcePackageSources = async (
  plan: Readonly<AmoSourcePackagePlan>,
): Promise<void> => {
  await rm(plan.stagingDirectoryPath, { force: true, recursive: true });
  await rm(plan.outputZipPath, { force: true });
  await mkdir(plan.stagingDirectoryPath, { recursive: true });

  await Promise.all(
    plan.sourceCopies.map(async ({ destinationPath, sourcePath }) => {
      await mkdir(path.dirname(destinationPath), { recursive: true });
      await cp(sourcePath, destinationPath, { recursive: true });
    }),
  );
};

/**
 * AMO source package READMEを書き込む。
 * @param {AmoSourcePackagePlan} plan AMO source package生成計画。
 * @param {AmoSourcePackageMetadata} metadata AMO source package metadata。
 * @returns {Promise<void>} 書き込み完了。
 */
export const writeAmoSourcePackageReadme = async (
  plan: Readonly<AmoSourcePackagePlan>,
  metadata: Readonly<AmoSourcePackageMetadata>,
): Promise<void> => {
  await writeFile(plan.readmePath, createAmoSourcePackageReadme(metadata));
};

/**
 * Zip commandを実行する。
 * @param {AmoSourcePackagePlan} plan AMO source package生成計画。
 * @returns {void} zip生成完了。
 * @throws {Error} zip commandが失敗した場合。
 */
export const runZipCommand = (plan: Readonly<AmoSourcePackagePlan>): void => {
  const result = childProcess.spawnSync(
    zipCommandName,
    [zipQuietRecursiveOption, plan.outputZipPath, zipCurrentDirectoryInputPath],
    {
      cwd: plan.stagingDirectoryPath,
      shell: process.platform === windowsPlatform,
      stdio: "inherit",
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== successfulExitCode) {
    const exitCodeLabel = String(result.status ?? "unknown");

    throw new Error(`AMO source package zip failed with exit code ${exitCodeLabel}.`);
  }
};

/**
 * AMO source packageを生成する。
 * @param {CreateAmoSourcePackageInput} input AMO source package生成入力。
 * @returns {Promise<AmoSourcePackagePlan>} 生成したpackageの計画。
 */
export const createAmoSourcePackage = async ({
  releaseVersion,
  repositoryRootPath = defaultRepositoryRootPath,
}: CreateAmoSourcePackageInput): Promise<AmoSourcePackagePlan> => {
  const metadata = await readAmoSourcePackageMetadata({ releaseVersion, repositoryRootPath });
  const plan = createAmoSourcePackagePlan({ metadata, repositoryRootPath });

  await copyAmoSourcePackageSources(plan);
  await writeAmoSourcePackageReadme(plan, metadata);
  runZipCommand(plan);

  return plan;
};

/**
 * CLI entrypointを実行する。
 * @param {readonly string[]} argv command line arguments。
 * @returns {Promise<void>} CLI実行完了。
 */
export const main = async (argv: readonly string[] = process.argv): Promise<void> => {
  const plan = await createAmoSourcePackage({ releaseVersion: parseReleaseVersionArgument(argv) });

  process.stdout.write(`${plan.outputZipPath}\n`);
};

if (isDirectlyExecuted(import.meta.filename, process.argv[executedFilePathArgumentIndex])) {
  try {
    await main();
  } catch (error: unknown) {
    process.stderr.write(`${getErrorMessage(error)}\n`);
    process.exitCode = processExitFailureCode;
  }
}
