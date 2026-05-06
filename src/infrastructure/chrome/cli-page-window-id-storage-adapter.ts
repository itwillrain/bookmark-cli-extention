import type { CliPageWindowIdStoragePort, StoredCliPageWindowId } from "./cli-page-window-adapter";

/** CLI page window ID storage keyです。 */
const cliPageWindowIdStorageKey = "cliPageWindowId";

/** CLI page window ID未保存状態です。 */
const cliPageWindowIdMissing = false;

/** Chrome storage APIが返すrecordです。 */
type ChromeStorageRecord = Readonly<Record<string, unknown>>;

/** Chrome storage areaのうちadapterが使う最小shapeです。 */
export interface ChromeWindowIdStorageArea {
  /** 保存値を削除します。 */
  readonly remove: (key: string) => Promise<void>;
  /** 保存値を読み込みます。 */
  readonly get: (key: string) => Promise<ChromeStorageRecord>;
  /** 保存値を書き込みます。 */
  readonly set: (items: ChromeStorageRecord) => Promise<void>;
}

/**
 * Chrome storage recordからCLI page window IDを取り出します。
 * @param {ChromeStorageRecord} record Chrome storage recordです。
 * @returns {StoredCliPageWindowId} 保存済みwindow IDです。
 */
const resolveStoredCliPageWindowId = (record: ChromeStorageRecord): StoredCliPageWindowId => {
  const windowId = record[cliPageWindowIdStorageKey];

  if (typeof windowId === "number") {
    return windowId;
  }

  return cliPageWindowIdMissing;
};

/**
 * Chrome storage areaをCLI page window ID storageへ変換します。
 * @param {ChromeWindowIdStorageArea} storageArea Chrome storage areaです。
 * @returns {CliPageWindowIdStoragePort} CLI page window ID storageです。
 */
export const createChromeCliPageWindowIdStorage = (
  storageArea: ChromeWindowIdStorageArea,
): CliPageWindowIdStoragePort => {
  /**
   * 保存済みCLI page window IDを読み込みます。
   * @returns {Promise<StoredCliPageWindowId>} 保存済みCLI page window IDです。
   */
  const readCliPageWindowId = async (): Promise<StoredCliPageWindowId> =>
    resolveStoredCliPageWindowId(await storageArea.get(cliPageWindowIdStorageKey));

  /**
   * CLI page window IDを保存します。
   * @param {number} windowId CLI page window IDです。
   * @returns {Promise<void>} 保存完了Promiseです。
   */
  const writeCliPageWindowId = async (windowId: number): Promise<void> => {
    await storageArea.set({ [cliPageWindowIdStorageKey]: windowId });
  };

  /**
   * 保存済みCLI page window IDを削除します。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const clearCliPageWindowId = async (): Promise<void> => {
    await storageArea.remove(cliPageWindowIdStorageKey);
  };

  return { clearCliPageWindowId, readCliPageWindowId, writeCliPageWindowId };
};
