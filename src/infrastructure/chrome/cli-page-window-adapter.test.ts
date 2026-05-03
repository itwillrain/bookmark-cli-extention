import {
  type ChromeWindowCreateProperties,
  type ChromeWindowsApi,
  createChromeCliPageWindowLauncher,
  createCliPageWindowCreateProperties,
} from "./cli-page-window-adapter";
import { describe, expect, it } from "vitest";

/** CLI page URL fixtureです。 */
const cliPageUrl = "chrome-extension://extension-id/cli-page.html";

/** 期待するwindow幅です。 */
const expectedWindowWidth = 960;

/** 期待するwindow高さです。 */
const expectedWindowHeight = 720;

/** Chrome windows APIの記録fixtureです。 */
interface RecordingWindowsApi {
  /** 作成されたwindow入力一覧です。 */
  readonly createdWindows: readonly ChromeWindowCreateProperties[];
  /** Chrome windows API fixtureです。 */
  readonly windowsApi: ChromeWindowsApi;
}

/**
 * Window作成入力を記録するChrome windows API fixtureを作ります。
 * @returns {RecordingWindowsApi} Chrome windows API fixtureです。
 */
const createRecordingWindowsApi = (): RecordingWindowsApi => {
  const createdWindows: ChromeWindowCreateProperties[] = [];

  /**
   * Window作成入力を記録します。
   * @param {ChromeWindowCreateProperties} createProperties window作成入力です。
   * @returns {Promise<void>} 記録完了Promiseです。
   */
  const create = async (createProperties: ChromeWindowCreateProperties): Promise<void> => {
    createdWindows.push(createProperties);
    await Promise.resolve();
  };

  return {
    createdWindows,
    windowsApi: { create },
  };
};

/** CLI page window adapterのテストスイートです。 */
describe("createCliPageWindowCreateProperties", (): void => {
  /** CLI pageをpopup windowで開く入力を作ることを検証します。 */
  it("creates popup window properties for the CLI page", (): void => {
    expect(createCliPageWindowCreateProperties(cliPageUrl)).toStrictEqual({
      focused: true,
      height: expectedWindowHeight,
      type: "popup",
      url: cliPageUrl,
      width: expectedWindowWidth,
    });
  });
});

/** Chrome CLI page window launcherのテストスイートです。 */
describe("createChromeCliPageWindowLauncher", (): void => {
  /** Chrome windows APIへpopup window作成入力を渡すことを検証します。 */
  it("opens the CLI page in a popup window", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi();
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowsApi.createdWindows).toStrictEqual([
      createCliPageWindowCreateProperties(cliPageUrl),
    ]);
  });
});
