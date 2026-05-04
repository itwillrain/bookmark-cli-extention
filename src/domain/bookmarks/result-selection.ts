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
 * Result entryが見つからない場合の値です。
 */
const resultEntryMissing = false;

/**
 * Result entry解決成功です。
 */
export interface ResultEntryFound<TEntry> {
  /**
   * 解決成功を表します。
   */
  readonly ok: true;
  /**
   * 解決されたentryです。
   */
  readonly entry: TEntry;
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
export type ResultEntryResolution<TEntry> = ResultEntryFound<TEntry> | ResultEntryMissing;

/**
 * 入力が直前結果の番号指定かを判定します。
 * @param {string} input CLI path-or-index入力です。
 * @returns {boolean} 数字だけの入力ならtrueです。
 * @example
 * ```ts
 * const result = isResultNumberInput("12");
 * // true
 * ```
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
 * 指定indexのresult entryを取得します。
 * @template TEntry entry型です。
 * @param {readonly TEntry[]} resultEntries 直前結果のentry一覧です。
 * @param {number} targetIndex 取得するindexです。
 * @returns {TEntry | false} entry。見つからない場合はfalseです。
 */
const getResultEntryAtIndex = <TEntry>(
  resultEntries: readonly TEntry[],
  targetIndex: number,
): TEntry | typeof resultEntryMissing => {
  for (const [entryIndex, entry] of resultEntries.entries()) {
    if (entryIndex === targetIndex) {
      return entry;
    }
  }

  return resultEntryMissing;
};

/**
 * 直前結果一覧から番号指定されたentryを解決します。
 * @template TEntry entry型です。
 * @param {readonly TEntry[]} resultEntries 直前結果のentry一覧です。
 * @param {string} resultNumberInput CLIに入力された1-based result numberです。
 * @returns {ResultEntryResolution<TEntry>} entry解決結果です。
 * @example
 * ```ts
 * const result = resolveEntryByResultNumber(["alpha", "beta"], "2");
 * // { ok: true, entry: "beta" }
 * ```
 */
export const resolveEntryByResultNumber = <TEntry>(
  resultEntries: readonly TEntry[],
  resultNumberInput: string,
): ResultEntryResolution<TEntry> => {
  const indexResult = resolveResultNumberIndex(resultNumberInput);

  if (!indexResult.ok) {
    return { ok: false };
  }

  const entry = getResultEntryAtIndex(resultEntries, indexResult.index);

  if (entry === resultEntryMissing) {
    return { ok: false };
  }

  return {
    entry,
    ok: true,
  };
};
