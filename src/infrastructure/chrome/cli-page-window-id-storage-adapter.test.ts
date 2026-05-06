import {
  type ChromeWindowIdStorageArea,
  createChromeCliPageWindowIdStorage,
} from "./cli-page-window-id-storage-adapter";
import { describe, expect, it } from "vitest";

/** CLI page window ID storage keyです。 */
const cliPageWindowIdStorageKey = "cliPageWindowId";

/** 保存済みCLI window ID fixtureです。 */
const storedWindowId = 201;

/** Chrome storage areaの記録fixtureです。 */
interface RecordingStorageArea {
  /** 削除されたkey一覧です。 */
  readonly removedKeys: readonly string[];
  /** Chrome storage area fixtureです。 */
  readonly storageArea: ChromeWindowIdStorageArea;
  /** 書き込まれたrecord一覧です。 */
  readonly writtenRecords: readonly Readonly<Record<string, unknown>>[];
}

/**
 * Chrome storage area fixtureを作ります。
 * @param {Record<string, unknown>} initialRecord 初期recordです。
 * @returns {RecordingStorageArea} Chrome storage area fixtureです。
 */
const createRecordingStorageArea = (
  initialRecord: Readonly<Record<string, unknown>> = {},
): RecordingStorageArea => {
  let record = { ...initialRecord };
  const removedKeys: string[] = [];
  const writtenRecords: Readonly<Record<string, unknown>>[] = [];

  /**
   * 保存値を読み込みます。
   * @returns {Promise<Readonly<Record<string, unknown>>>} 保存recordです。
   */
  const get = async (): Promise<Readonly<Record<string, unknown>>> => {
    await Promise.resolve();

    return record;
  };

  /**
   * 保存値を書き込みます。
   * @param {Readonly<Record<string, unknown>>} items 書き込むrecordです。
   * @returns {Promise<void>} 保存完了Promiseです。
   */
  const set = async (items: Readonly<Record<string, unknown>>): Promise<void> => {
    writtenRecords.push(items);
    record = { ...record, ...items };
    await Promise.resolve();
  };

  /**
   * 保存値を削除します。
   * @param {string} key 削除するkeyです。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const remove = async (key: string): Promise<void> => {
    removedKeys.push(key);
    record = Object.fromEntries(
      Object.keys(record)
        .filter((recordKey) => recordKey !== key)
        .map((recordKey): readonly [string, unknown] => [recordKey, record[recordKey]]),
    );
    await Promise.resolve();
  };

  return {
    removedKeys,
    storageArea: { get, remove, set },
    writtenRecords,
  };
};

/** CLI page window ID storage adapterのテストスイートです。 */
describe("createChromeCliPageWindowIdStorage", (): void => {
  /** 保存済みwindow IDを読み込むことを検証します。 */
  it("reads stored CLI page window id", async (): Promise<void> => {
    const recordingStorageArea = createRecordingStorageArea({
      [cliPageWindowIdStorageKey]: storedWindowId,
    });
    const storage = createChromeCliPageWindowIdStorage(recordingStorageArea.storageArea);

    await expect(storage.readCliPageWindowId()).resolves.toBe(storedWindowId);
  });

  /** Window IDが未保存の場合はfalseを返すことを検証します。 */
  it("returns false when CLI page window id is missing", async (): Promise<void> => {
    const recordingStorageArea = createRecordingStorageArea();
    const storage = createChromeCliPageWindowIdStorage(recordingStorageArea.storageArea);

    await expect(storage.readCliPageWindowId()).resolves.toBe(false);
  });

  /** Window IDを書き込むことを検証します。 */
  it("writes CLI page window id", async (): Promise<void> => {
    const recordingStorageArea = createRecordingStorageArea();
    const storage = createChromeCliPageWindowIdStorage(recordingStorageArea.storageArea);

    await storage.writeCliPageWindowId(storedWindowId);

    expect(recordingStorageArea.writtenRecords).toStrictEqual([
      { [cliPageWindowIdStorageKey]: storedWindowId },
    ]);
  });

  /** Window IDを削除することを検証します。 */
  it("clears CLI page window id", async (): Promise<void> => {
    const recordingStorageArea = createRecordingStorageArea({
      [cliPageWindowIdStorageKey]: storedWindowId,
    });
    const storage = createChromeCliPageWindowIdStorage(recordingStorageArea.storageArea);

    await storage.clearCliPageWindowId();

    expect(recordingStorageArea.removedKeys).toStrictEqual([cliPageWindowIdStorageKey]);
  });
});
