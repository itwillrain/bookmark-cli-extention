import type { BookmarkEntry } from "./bookmark-tree";

/**
 * Result numberをarray indexへ変換するoffsetです。
 */
const oneBasedIndexOffset = 1;

/**
 * 有効なresult numberの最小値です。
 */
const minimumResultNumber = 1;

/**
 * 10進数parseに使うradixです。
 */
const decimalRadix = 10;

/**
 * 数字だけのresult number入力に一致する正規表現です。
 */
const resultNumberPattern = /^\d+$/u;

/**
 * Result numberのindex解決成功です。
 */
interface ResultNumberIndexFound {
  /**
   * 解決成功を表します。
   */
  readonly ok: true;
  /**
   * 0-based indexです。
   */
  readonly index: number;
}

/**
 * Result numberのindex解決失敗です。
 */
interface ResultNumberIndexMissing {
  /**
   * 解決失敗を表します。
   */
  readonly ok: false;
}

/**
 * Result numberのindex解決結果です。
 */
type ResultNumberIndexResult = ResultNumberIndexFound | ResultNumberIndexMissing;

/**
 * Result entry解決成功です。
 */
export interface ResultEntryFound {
  /**
   * 解決成功を表します。
   */
  readonly ok: true;
  /**
   * 解決されたentryです。
   */
  readonly entry: BookmarkEntry;
}

/**
 * Result entry解決失敗です。
 */
export interface ResultEntryMissing {
  /**
   * 解決失敗を表します。
   */
  readonly ok: false;
}

/**
 * Result entry解決結果です。
 */
export type ResultEntryResolution = ResultEntryFound | ResultEntryMissing;

/**
 * 入力が直前結果の番号指定かを判定します。
 * @param {string} input CLI path-or-index入力です。
 * @returns {boolean} 数字だけの入力ならtrueです。
 */
export const isResultNumberInput = (input: string): boolean => resultNumberPattern.test(input);

/**
 * 入力番号を0-based indexへ変換します。
 * @param {string} resultNumberInput CLIに入力された1-based result numberです。
 * @returns {ResultNumberIndexResult} 0-based indexの解決結果です。
 */
const resolveResultNumberIndex = (resultNumberInput: string): ResultNumberIndexResult => {
  if (!isResultNumberInput(resultNumberInput)) {
    return { ok: false };
  }

  const resultNumber = Number.parseInt(resultNumberInput, decimalRadix);

  if (resultNumber < minimumResultNumber) {
    return { ok: false };
  }

  return {
    index: resultNumber - oneBasedIndexOffset,
    ok: true,
  };
};

/**
 * 直前結果一覧から番号指定されたentryを解決します。
 * @param {readonly BookmarkEntry[]} resultEntries 直前結果のentry一覧です。
 * @param {string} resultNumberInput CLIに入力された1-based result numberです。
 * @returns {ResultEntryResolution} entry解決結果です。
 */
export const resolveEntryByResultNumber = (
  resultEntries: readonly BookmarkEntry[],
  resultNumberInput: string,
): ResultEntryResolution => {
  const indexResult = resolveResultNumberIndex(resultNumberInput);

  if (!indexResult.ok) {
    return { ok: false };
  }

  const entry = resultEntries[indexResult.index];

  if (!entry) {
    return { ok: false };
  }

  return {
    entry,
    ok: true,
  };
};
