import type {
  BookmarkOpenContext,
  BookmarkOpenerPort,
} from "../../application/bookmarks/bookmark-use-cases";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import type { LaunchContextStoragePort } from "./launch-context-storage-adapter";

/**
 * Chrome Tabs APIでtabを作成する入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs#method-create
 */
export interface ChromeTabCreateProperties {
  /**
   * 開くURLです。
   */
  readonly url: string;
}

/**
 * Chrome Tabs APIが返すtabのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs#type-Tab
 */
export interface ChromeCreatedTab {
  /**
   * 作成されたtab IDです。
   */
  readonly id?: number | undefined;
  /**
   * 作成されたtab titleです。
   */
  readonly title?: string | undefined;
  /**
   * 作成されたtab URLです。
   */
  readonly url?: string | undefined;
}

/**
 * Chrome Tabs APIのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/tabs
 */
export interface ChromeTabsApi {
  /**
   * 新しいtabを作成します。
   */
  readonly create: (
    createProperties: ChromeTabCreateProperties,
  ) => Promise<ChromeCreatedTab | undefined>;
}

/**
 * URLを開いたtabからLaunchContextを作成します。
 * @param {string} requestedUrl 開くよう要求したURLです。
 * @param {BookmarkOpenContext | undefined} context URLを開く文脈です。
 * @param {ChromeCreatedTab | undefined} tab 作成されたtabです。
 * @returns {LaunchContext | false} LaunchContextまたは作成不能です。
 */
const createOpenedTabLaunchContext = (
  requestedUrl: string,
  context: BookmarkOpenContext | undefined,
  tab: ChromeCreatedTab | undefined,
): LaunchContext | false => {
  if (typeof tab?.id !== "number") {
    return false;
  }

  return {
    tabId: tab.id,
    title: context?.title ?? tab.title ?? requestedUrl,
    url: tab.url ?? requestedUrl,
  };
};

/**
 * URLを開いたtabを次のmark対象として保存します。
 * @param {LaunchContextStoragePort | undefined} launchContextStorage LaunchContext storageです。
 * @param {LaunchContext | false} launchContext 保存するLaunchContextです。
 * @returns {Promise<void>} 保存完了Promiseです。
 */
const writeOpenedTabLaunchContext = async (
  launchContextStorage: LaunchContextStoragePort | undefined,
  launchContext: LaunchContext | false,
): Promise<void> => {
  if (!launchContextStorage || launchContext === false) {
    return;
  }

  await launchContextStorage.writeLaunchContext(launchContext);
};

/**
 * Chrome Tabs APIをApplication層のopener portへ変換します。
 * @param {ChromeTabsApi} tabsApi Chrome Tabs APIです。
 * @param {LaunchContextStoragePort | undefined} launchContextStorage LaunchContext storageです。
 * @returns {BookmarkOpenerPort} Bookmark URLを開くportです。
 */
export const createChromeBookmarkOpener = (
  tabsApi: ChromeTabsApi,
  launchContextStorage?: LaunchContextStoragePort,
): BookmarkOpenerPort => {
  /**
   * Chrome Tabs APIでBookmark URLを開きます。
   * @param {string} url 開くURLです。
   * @param {BookmarkOpenContext} context URLを開く文脈です。
   * @returns {Promise<void>} Tab作成完了を表すPromiseです。
   */
  const openBookmarkUrl = async (url: string, context?: BookmarkOpenContext): Promise<void> => {
    const tab = await tabsApi.create({ url });

    await writeOpenedTabLaunchContext(
      launchContextStorage,
      createOpenedTabLaunchContext(url, context, tab),
    );
  };

  return { openBookmarkUrl };
};
