#!/usr/bin/env node

import * as path from "node:path";

import { archiveDocumentationVersion } from "./docs-version-archive-core";
import { parseReleaseVersionArgument } from "./docs-version-archive-semver";
import process from "node:process";

/** CLI実行ファイルpathが入るprocess.argv index。 */
export const executedFilePathArgumentIndex = 1;

/** Process失敗を表すexit code。 */
export const processExitFailureCode = 1;

/**
 * Scriptが直接実行されたかどうかを判定する。
 * @param {string} moduleFilePath import.meta.filename。
 * @param {string | undefined} executedFilePath process.argv[1]。
 * @returns {boolean} 直接実行ならtrue。
 */
export const isDirectlyExecuted = (
  moduleFilePath: string,
  executedFilePath: string | undefined,
): boolean => {
  if (typeof executedFilePath !== "string") {
    return false;
  }

  return moduleFilePath === path.resolve(executedFilePath);
};

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
 * CLI entrypointを実行する。
 * @param {readonly string[]} argv command line arguments。
 * @returns {Promise<void>} CLI実行完了。
 */
export const main = async (argv: readonly string[] = process.argv): Promise<void> => {
  await archiveDocumentationVersion({ releaseVersion: parseReleaseVersionArgument(argv) });
};

if (isDirectlyExecuted(import.meta.filename, process.argv[executedFilePathArgumentIndex])) {
  try {
    await main();
  } catch (error: unknown) {
    process.stderr.write(`${getErrorMessage(error)}\n`);
    process.exitCode = processExitFailureCode;
  }
}
