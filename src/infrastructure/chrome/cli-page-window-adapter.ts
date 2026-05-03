/**
 * Chrome windows APIで指定できるwindow種別です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#type-CreateType
 */
export type ChromeWindowCreateType = "normal" | "popup";

/**
 * Chrome windows.createに渡す入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#method-create
 */
export interface ChromeWindowCreateProperties {
  /** 作成したwindowへfocusするかです。 */
  readonly focused: boolean;
  /** Windowの高さです。 */
  readonly height: number;
  /** Window種別です。 */
  readonly type: ChromeWindowCreateType;
  /** Windowで開くURLです。 */
  readonly url: string;
  /** Windowの幅です。 */
  readonly width: number;
}

/**
 * Chrome windows.updateに渡す入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#method-update
 */
export interface ChromeWindowUpdateProperties {
  /** Windowへfocusするかです。 */
  readonly focused: boolean;
}

/**
 * Chrome windows APIが返すwindowの最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#type-Window
 */
export interface ChromeWindow {
  /** Window IDです。 */
  readonly id?: number | undefined;
}

/**
 * Chrome windows APIのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows
 */
export interface ChromeWindowsApi {
  /** 新しいwindowを作成します。 */
  readonly create: (
    createProperties: ChromeWindowCreateProperties,
  ) => Promise<ChromeWindow | undefined>;
  /** 既存windowを更新します。 */
  readonly update: (
    windowId: number,
    updateProperties: ChromeWindowUpdateProperties,
  ) => Promise<ChromeWindow | undefined>;
}

/** CLI用popup windowの幅です。 */
const cliPopupWindowWidth = 960;

/** CLI用popup windowの高さです。 */
const cliPopupWindowHeight = 720;

/** CLI用window種別です。 */
const cliPopupWindowType = "popup" satisfies ChromeWindowCreateType;

/** CLI page window ID未保存状態です。 */
const cliPageWindowIdMissing = false;

/** 保存済みCLI page window IDです。 */
type StoredCliPageWindowId = number | typeof cliPageWindowIdMissing;

/**
 * CLI page用popup window作成入力を作ります。
 * @param {string} url CLI page URLです。
 * @returns {ChromeWindowCreateProperties} Window作成入力です。
 */
export const createCliPageWindowCreateProperties = (url: string): ChromeWindowCreateProperties => ({
  focused: true,
  height: cliPopupWindowHeight,
  type: cliPopupWindowType,
  url,
  width: cliPopupWindowWidth,
});

/**
 * CLI page windowを前面へ戻す入力を作ります。
 * @returns {ChromeWindowUpdateProperties} Window更新入力です。
 */
export const createCliPageWindowFocusProperties = (): ChromeWindowUpdateProperties => ({
  focused: true,
});

/**
 * Chrome windowから保存可能なwindow IDを取り出します。
 * @param {ChromeWindow | undefined} window Chrome windows APIが返したwindowです。
 * @returns {StoredCliPageWindowId} 保存可能なwindow IDです。
 */
const resolveStoredCliPageWindowId = (window: ChromeWindow | undefined): StoredCliPageWindowId => {
  if (typeof window?.id === "number") {
    return window.id;
  }

  return cliPageWindowIdMissing;
};

/**
 * CLI page用windowを新規作成します。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {string} url CLI page URLです。
 * @returns {Promise<StoredCliPageWindowId>} 作成されたwindow IDです。
 */
const createCliPageWindow = async (
  windowsApi: ChromeWindowsApi,
  url: string,
): Promise<StoredCliPageWindowId> =>
  resolveStoredCliPageWindowId(await windowsApi.create(createCliPageWindowCreateProperties(url)));

/**
 * 保存済みCLI page windowを前面へ戻します。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {number} windowId 保存済みwindow IDです。
 * @returns {Promise<boolean>} 前面復帰できた場合はtrueです。
 */
const focusCliPageWindow = async (
  windowsApi: ChromeWindowsApi,
  windowId: number,
): Promise<boolean> => {
  try {
    await windowsApi.update(windowId, createCliPageWindowFocusProperties());

    return true;
  } catch {
    return false;
  }
};

/** CLI page window launcherです。 */
export interface ChromeCliPageWindowLauncher {
  /** CLI pageを別windowで開きます。 */
  readonly openCliPageWindow: (url: string) => Promise<void>;
}

/**
 * Chrome windows APIをCLI page launcherへ変換します。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @returns {ChromeCliPageWindowLauncher} CLI page launcherです。
 */
export const createChromeCliPageWindowLauncher = (
  windowsApi: ChromeWindowsApi,
): ChromeCliPageWindowLauncher => {
  let cliPageWindowId: StoredCliPageWindowId = cliPageWindowIdMissing;

  /**
   * 保存済みCLI page windowを前面へ戻します。
   * @returns {Promise<boolean>} 前面復帰できた場合はtrueです。
   */
  const focusExistingCliPageWindow = async (): Promise<boolean> => {
    if (cliPageWindowId === cliPageWindowIdMissing) {
      return false;
    }

    const focused = await focusCliPageWindow(windowsApi, cliPageWindowId);

    if (!focused) {
      cliPageWindowId = cliPageWindowIdMissing;
    }

    return focused;
  };

  /**
   * CLI pageを別windowで開きます。
   * @param {string} url CLI page URLです。
   * @returns {Promise<void>} Window作成完了Promiseです。
   */
  const openCliPageWindow = async (url: string): Promise<void> => {
    if (await focusExistingCliPageWindow()) {
      return;
    }

    cliPageWindowId = await createCliPageWindow(windowsApi, url);
  };

  return { openCliPageWindow };
};
