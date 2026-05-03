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
 * Chrome windows APIのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows
 */
export interface ChromeWindowsApi {
  /** 新しいwindowを作成します。 */
  readonly create: (createProperties: ChromeWindowCreateProperties) => Promise<unknown>;
}

/** CLI用popup windowの幅です。 */
const cliPopupWindowWidth = 960;

/** CLI用popup windowの高さです。 */
const cliPopupWindowHeight = 720;

/** CLI用window種別です。 */
const cliPopupWindowType = "popup" satisfies ChromeWindowCreateType;

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
  /**
   * CLI pageを別windowで開きます。
   * @param {string} url CLI page URLです。
   * @returns {Promise<void>} Window作成完了Promiseです。
   */
  const openCliPageWindow = async (url: string): Promise<void> => {
    await windowsApi.create(createCliPageWindowCreateProperties(url));
  };

  return { openCliPageWindow };
};
