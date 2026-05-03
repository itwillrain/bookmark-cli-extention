import {
  type ChromeStorageLocalArea,
  createChromeExtensionStateStorage,
} from "./extension-state-storage-adapter";
import {
  type ExtensionState,
  createInitialExtensionState,
} from "../../domain/storage/extension-state";
import { describe, expect, it } from "vitest";

/** 無効なstorage payload fixture。 */
const invalidStoragePayload = {
  schemaVersion: 1,
  settings: {
    preferNerdFont: "yes",
    promptStyle: "powerline",
  },
};

/** 実行日時fixture。 */
const executedAt = "2026-05-03T00:00:00.000Z";

/** Storage set記録fixture。 */
interface RecordingStorageArea {
  /** Chrome storage.local互換API。 */
  readonly area: ChromeStorageLocalArea;
  /** Setへ渡されたpayload一覧。 */
  readonly writtenPayloads: readonly unknown[];
}

/**
 * 読み込み値を固定したstorage areaを作成。
 * @param {unknown} payload getが返すpayload。
 * @returns {ChromeStorageLocalArea} storage area fixture。
 */
const createReadonlyStorageArea = (payload: unknown): ChromeStorageLocalArea => ({
  /**
   * 固定payloadを返す。
   * @returns {Promise<unknown>} 固定payload。
   */
  get: async (): Promise<unknown> => {
    await Promise.resolve();

    return payload;
  },
  /**
   * 書き込みを何もせず成功させる。
   * @returns {Promise<void>} 書き込み完了Promise。
   */
  set: async (): Promise<void> => {
    await Promise.resolve();
  },
});

/**
 * 書き込みpayloadを記録するstorage areaを作成。
 * @returns {RecordingStorageArea} storage area fixture。
 */
const createRecordingStorageArea = (): RecordingStorageArea => {
  const writtenPayloads: unknown[] = [];

  return {
    area: {
      /**
       * 初期拡張状態を返す。
       * @returns {Promise<unknown>} 初期拡張状態。
       */
      get: async (): Promise<unknown> => {
        await Promise.resolve();

        return createInitialExtensionState();
      },
      /**
       * 書き込みpayloadを記録する。
       * @param {ExtensionState} payload 書き込みpayload。
       * @returns {Promise<void>} 書き込み完了Promise。
       */
      set: async (payload: ExtensionState): Promise<void> => {
        writtenPayloads.push(payload);
        await Promise.resolve();
      },
    },
    writtenPayloads,
  };
};

/** Chrome extension state storage adapterのテストスイート。 */
describe("createChromeExtensionStateStorage", (): void => {
  /**
   * 有効な保存状態を読み込めることを検証。
   */
  it("reads valid extension state", async (): Promise<void> => {
    const state = {
      ...createInitialExtensionState(),
      commandHistory: [{ executedAt, input: "find stripe" }],
    };
    const storage = createChromeExtensionStateStorage(createReadonlyStorageArea(state));

    await expect(storage.readExtensionState()).resolves.toStrictEqual(state);
  });

  /**
   * 不正な保存状態を初期状態へfallbackできることを検証。
   */
  it("falls back to initial state for invalid payload", async (): Promise<void> => {
    const storage = createChromeExtensionStateStorage(
      createReadonlyStorageArea(invalidStoragePayload),
    );

    await expect(storage.readExtensionState()).resolves.toStrictEqual(
      createInitialExtensionState(),
    );
  });

  /**
   * 保存状態を書き込めることを検証。
   */
  it("writes extension state", async (): Promise<void> => {
    const recordingStorage = createRecordingStorageArea();
    const storage = createChromeExtensionStateStorage(recordingStorage.area);
    const state = createInitialExtensionState();

    await storage.writeExtensionState(state);

    expect(recordingStorage.writtenPayloads).toStrictEqual([state]);
  });
});
