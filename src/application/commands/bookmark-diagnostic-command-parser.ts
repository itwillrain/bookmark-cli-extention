import type { DoctorBookmarkCommand, DupesBookmarkCommand } from "./bookmark-command-types";
import type { BookmarkDiagnosticChecks } from "../../domain/bookmarks/bookmark-diagnostics";

/** 空文字です。 */
const emptyString = "";

/** Doctor commandで空title診断を指定するoptionです。 */
const emptyTitleOption = "--empty-title";

/** Doctor commandでURL重複診断を指定するoptionです。 */
const duplicateUrlOption = "--duplicate-url";

/** Doctor commandでtitle重複診断を指定するoptionです。 */
const duplicateTitleOption = "--duplicate-title";

/** Dupes commandでURL重複診断を指定するoptionです。 */
const urlOption = "--url";

/** Dupes commandでtitle重複診断を指定するoptionです。 */
const titleOption = "--title";

/** すべての診断を指定するoptionです。 */
const allOption = "--all";

/** Doctor commandの初期診断です。 */
const defaultDoctorChecks = {
  duplicateTitle: false,
  duplicateUrl: true,
  emptyTitle: true,
} as const satisfies BookmarkDiagnosticChecks;

/** Dupes commandの初期診断です。 */
const defaultDupesChecks = {
  duplicateTitle: false,
  duplicateUrl: true,
  emptyTitle: false,
} as const satisfies BookmarkDiagnosticChecks;

/** すべて無効の診断です。 */
const disabledDiagnosticChecks = {
  duplicateTitle: false,
  duplicateUrl: false,
  emptyTitle: false,
} as const satisfies BookmarkDiagnosticChecks;

/** すべて有効の診断です。 */
const allDiagnosticChecks = {
  duplicateTitle: true,
  duplicateUrl: true,
  emptyTitle: true,
} as const satisfies BookmarkDiagnosticChecks;

/**
 * Query tokenがoptionかを判定します。
 * @param {string} queryPart query tokenです。
 * @returns {boolean} optionならtrueです。
 */
const isOptionToken = (queryPart: string): boolean => queryPart.startsWith("-");

/**
 * 明示的なoption指定があるかを判定します。
 * @param {readonly string[]} queryParts command query token一覧です。
 * @returns {boolean} optionがあるならtrueです。
 */
const hasExplicitOptions = (queryParts: readonly string[]): boolean =>
  queryParts.some((queryPart) => queryPart !== emptyString && isOptionToken(queryPart));

/**
 * 診断optionをchecksへ反映します。
 * @param {BookmarkDiagnosticChecks} checks 反映元checksです。
 * @param {string} option option tokenです。
 * @returns {BookmarkDiagnosticChecks} 反映後checksです。
 */
const applyDiagnosticOption = (
  checks: BookmarkDiagnosticChecks,
  option: string,
): BookmarkDiagnosticChecks => {
  if (option === allOption) {
    return allDiagnosticChecks;
  }

  if (option === emptyTitleOption) {
    return { ...checks, emptyTitle: true };
  }

  if (option === duplicateUrlOption || option === urlOption) {
    return { ...checks, duplicateUrl: true };
  }

  if (option === duplicateTitleOption || option === titleOption) {
    return { ...checks, duplicateTitle: true };
  }

  return checks;
};

/**
 * Query tokenから診断checksを作ります。
 * @param {readonly string[]} queryParts command query token一覧です。
 * @param {BookmarkDiagnosticChecks} defaultChecks option未指定時のchecksです。
 * @returns {BookmarkDiagnosticChecks} 診断checksです。
 */
const parseDiagnosticChecks = (
  queryParts: readonly string[],
  defaultChecks: BookmarkDiagnosticChecks,
): BookmarkDiagnosticChecks => {
  if (!hasExplicitOptions(queryParts)) {
    return defaultChecks;
  }

  let checks: BookmarkDiagnosticChecks = disabledDiagnosticChecks;

  for (const queryPart of queryParts) {
    checks = applyDiagnosticOption(checks, queryPart);
  }

  return checks;
};

/**
 * Doctor commandを解析します。
 * @param {readonly string[]} queryParts command query token一覧です。
 * @returns {DoctorBookmarkCommand} Doctor commandです。
 * @example
 * ```ts
 * const result = parseDoctorBookmarkCommand(["--duplicate-title"]);
 * // result.checks.duplicateTitle === true
 * ```
 */
export const parseDoctorBookmarkCommand = (
  queryParts: readonly string[],
): DoctorBookmarkCommand => ({
  checks: parseDiagnosticChecks(queryParts, defaultDoctorChecks),
  kind: "doctor",
});

/**
 * Dupes commandを解析します。
 * @param {readonly string[]} queryParts command query token一覧です。
 * @returns {DupesBookmarkCommand} Dupes commandです。
 * @example
 * ```ts
 * const result = parseDupesBookmarkCommand(["--title"]);
 * // result.checks.duplicateTitle === true
 * ```
 */
export const parseDupesBookmarkCommand = (queryParts: readonly string[]): DupesBookmarkCommand => ({
  checks: parseDiagnosticChecks(queryParts, defaultDupesChecks),
  kind: "dupes",
});
