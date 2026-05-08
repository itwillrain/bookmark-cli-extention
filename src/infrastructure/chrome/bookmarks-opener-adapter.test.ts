import {
  type ChromeTabCreateProperties,
  type ChromeTabsApi,
  createChromeBookmarkOpener,
} from "./bookmarks-adapter";
import { describe, expect, it } from "vitest";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import type { LaunchContextStoragePort } from "./launch-context-storage-adapter";

/** 開くURL fixtureです。 */
const targetUrl = "https://docs.github.com/";

/** 開くURLのtitle fixtureです。 */
const targetTitle = "GitHub Docs";

/** 作成されたtab ID fixtureです。 */
const createdTabId = 42;

/** Chrome Tabs APIの記録fixtureです。 */
interface RecordingTabsApi {
  /** 作成されたtabの入力一覧です。 */
  readonly createdTabs: readonly ChromeTabCreateProperties[];
  /** Chrome Tabs API fixtureです。 */
  readonly tabsApi: ChromeTabsApi;
}

/** LaunchContext storageの記録fixtureです。 */
interface RecordingLaunchContextStorage {
  /** LaunchContext storage fixtureです。 */
  readonly storage: LaunchContextStoragePort;
  /** 書き込まれたLaunchContext一覧です。 */
  readonly writtenLaunchContexts: readonly LaunchContext[];
}

/**
 * Tab作成入力を記録するChrome Tabs API fixtureを作ります。
 * @returns {RecordingTabsApi} Chrome Tabs API fixtureです。
 */
const createRecordingTabsApi = (): RecordingTabsApi => {
  const createdTabs: ChromeTabCreateProperties[] = [];

  /**
   * Tab作成入力を記録します。
   * @param {ChromeTabCreateProperties} createProperties tab作成入力です。
   * @returns {ReturnType<ChromeTabsApi["create"]>} 作成されたtabです。
   */
  const create = async (
    createProperties: ChromeTabCreateProperties,
  ): ReturnType<ChromeTabsApi["create"]> => {
    createdTabs.push(createProperties);
    await Promise.resolve();

    return {
      id: createdTabId,
      url: createProperties.url,
    };
  };

  return {
    createdTabs,
    tabsApi: { create },
  };
};

/**
 * LaunchContext storage fixtureを作ります。
 * @returns {RecordingLaunchContextStorage} LaunchContext storage fixtureです。
 */
const createRecordingLaunchContextStorage = (): RecordingLaunchContextStorage => {
  const writtenLaunchContexts: LaunchContext[] = [];

  return {
    storage: {
      /**
       * LaunchContextを読み込みます。
       * @returns {ReturnType<LaunchContextStoragePort["readLaunchContext"]>} 空の読み込み結果です。
       */
      readLaunchContext: async (): ReturnType<LaunchContextStoragePort["readLaunchContext"]> => {
        await Promise.resolve();

        return { ok: false };
      },
      /**
       * LaunchContextを書き込みます。
       * @param {LaunchContext} launchContext 書き込むLaunchContextです。
       * @returns {Promise<void>} 書き込み完了Promiseです。
       */
      writeLaunchContext: async (launchContext: LaunchContext): Promise<void> => {
        writtenLaunchContexts.push(launchContext);
        await Promise.resolve();
      },
    },
    writtenLaunchContexts,
  };
};

/** Chrome Bookmark opener adapterのlaunch context連携テストスイートです。 */
describe("createChromeBookmarkOpener launch context", (): void => {
  /**
   * URLを開いたtabを次のmark対象として保存することを検証します。
   */
  it("stores opened tab as the next launch context", async (): Promise<void> => {
    const recordingTabsApi = createRecordingTabsApi();
    const recordingStorage = createRecordingLaunchContextStorage();
    const opener = createChromeBookmarkOpener(recordingTabsApi.tabsApi, recordingStorage.storage);

    await opener.openBookmarkUrl(targetUrl, { title: targetTitle });

    expect(recordingTabsApi.createdTabs).toStrictEqual([{ url: targetUrl }]);
    expect(recordingStorage.writtenLaunchContexts).toStrictEqual([
      {
        tabId: createdTabId,
        title: targetTitle,
        url: targetUrl,
      },
    ]);
  });
});
