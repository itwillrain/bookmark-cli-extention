import {
  type ChromeStorageSessionArea,
  createChromeLaunchContextStorage,
} from "./launch-context-storage-adapter";
import { describe, expect, it } from "vitest";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";

/** Launch context fixture。 */
const launchContext = {
  tabId: 7,
  title: "Production Admin",
  url: "https://admin.example.com/",
} satisfies LaunchContext;

/** 不正なpayload fixture。 */
const invalidPayload = {
  tabId: "7",
  title: "Production Admin",
};

/** Storage area記録fixture。 */
interface RecordingStorageSessionArea {
  /** Chrome storage.session互換API。 */
  readonly area: ChromeStorageSessionArea;
  /** 書き込みpayload一覧。 */
  readonly writtenPayloads: readonly Readonly<Record<string, unknown>>[];
}

/**
 * 固定payloadを返すstorage.session fixtureを作成。
 * @param {Readonly<Record<string, unknown>>} payload 固定payload。
 * @returns {ChromeStorageSessionArea} storage.session fixture。
 */
const createReadonlyStorageSessionArea = (
  payload: Readonly<Record<string, unknown>>,
): ChromeStorageSessionArea => ({
  /**
   * 固定payloadを返す。
   * @returns {Promise<Readonly<Record<string, unknown>>>} 固定payload。
   */
  get: async (): Promise<Readonly<Record<string, unknown>>> => {
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
 * 書き込みpayloadを記録するstorage.session fixtureを作成。
 * @returns {RecordingStorageSessionArea} storage.session fixture。
 */
const createRecordingStorageSessionArea = (): RecordingStorageSessionArea => {
  const writtenPayloads: Readonly<Record<string, unknown>>[] = [];

  return {
    area: {
      /**
       * 空payloadを返す。
       * @returns {Promise<Readonly<Record<string, unknown>>>} 空payload。
       */
      get: async (): Promise<Readonly<Record<string, unknown>>> => {
        await Promise.resolve();

        return {};
      },
      /**
       * 書き込みpayloadを記録する。
       * @param {Readonly<Record<string, unknown>>} payload 書き込みpayload。
       * @returns {Promise<void>} 書き込み完了Promise。
       */
      set: async (payload: Readonly<Record<string, unknown>>): Promise<void> => {
        writtenPayloads.push(payload);
        await Promise.resolve();
      },
    },
    writtenPayloads,
  };
};

/** Chrome launch context storage adapterのテストスイート。 */
describe("createChromeLaunchContextStorage", (): void => {
  /**
   * 有効なlaunch contextを読み込めることを検証。
   */
  it("reads valid launch context", async (): Promise<void> => {
    const storage = createChromeLaunchContextStorage(
      createReadonlyStorageSessionArea({ bookmarkCliLaunchContext: launchContext }),
    );

    await expect(storage.readLaunchContext()).resolves.toStrictEqual({
      ok: true,
      value: launchContext,
    });
  });

  /**
   * 不正なlaunch contextを未設定として扱うことを検証。
   */
  it("returns empty value for invalid launch context", async (): Promise<void> => {
    const storage = createChromeLaunchContextStorage(
      createReadonlyStorageSessionArea({ bookmarkCliLaunchContext: invalidPayload }),
    );

    await expect(storage.readLaunchContext()).resolves.toStrictEqual({ ok: false });
  });

  /**
   * Launch contextを書き込めることを検証。
   */
  it("writes launch context", async (): Promise<void> => {
    const recordingStorage = createRecordingStorageSessionArea();
    const storage = createChromeLaunchContextStorage(recordingStorage.area);

    await storage.writeLaunchContext(launchContext);

    expect(recordingStorage.writtenPayloads).toStrictEqual([
      { bookmarkCliLaunchContext: launchContext },
    ]);
  });
});
