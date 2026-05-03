import {
  type ChromeWindow,
  type ChromeWindowCreateProperties,
  type ChromeWindowUpdateProperties,
  type ChromeWindowsApi,
  createChromeCliPageWindowLauncher,
  createCliPageWindowCreateProperties,
  createCliPageWindowFocusProperties,
} from "./cli-page-window-adapter";
import { describe, expect, it } from "vitest";

/** CLI page URL fixtureです。 */
const cliPageUrl = "chrome-extension://extension-id/cli-page.html";

/** 期待するwindow幅です。 */
const expectedWindowWidth = 960;

/** 期待するwindow高さです。 */
const expectedWindowHeight = 720;

/** 作成されたwindow ID fixtureです。 */
const createdWindowId = 101;

/** Focus失敗時に作り直すwindow ID fixtureです。 */
const recreatedWindowId = 102;

/** Chrome windows APIの記録fixtureです。 */
interface RecordingWindowsApi {
  /** 作成されたwindow入力一覧です。 */
  readonly createdWindows: readonly ChromeWindowCreateProperties[];
  /** 更新されたwindow入力一覧です。 */
  readonly updatedWindows: readonly (readonly [number, ChromeWindowUpdateProperties])[];
  /** Chrome windows API fixtureです。 */
  readonly windowsApi: ChromeWindowsApi;
}

/** Chrome windows API fixtureのoptionです。 */
interface RecordingWindowsApiOptions {
  /** 次のwindow updateを失敗させるかです。 */
  readonly failNextUpdate?: boolean;
}

/**
 * Window作成入力を記録するChrome windows API fixtureを作ります。
 * @param {RecordingWindowsApiOptions} options Chrome windows API fixture optionです。
 * @returns {RecordingWindowsApi} Chrome windows API fixtureです。
 */
// oxlint-disable-next-line max-lines-per-function -- create/updateを同じclosureで記録するfixtureのため。
const createRecordingWindowsApi = (
  options: RecordingWindowsApiOptions = {},
): RecordingWindowsApi => {
  const createdWindows: ChromeWindowCreateProperties[] = [];
  const updatedWindows: (readonly [number, ChromeWindowUpdateProperties])[] = [];
  let nextWindowId = createdWindowId;
  let shouldFailNextUpdate = options.failNextUpdate === true;

  /**
   * Window作成入力を記録します。
   * @param {ChromeWindowCreateProperties} createProperties window作成入力です。
   * @returns {Promise<ChromeWindow>} 作成されたwindowです。
   */
  const create = async (createProperties: ChromeWindowCreateProperties): Promise<ChromeWindow> => {
    createdWindows.push(createProperties);
    await Promise.resolve();

    const createdWindow = { id: nextWindowId } satisfies ChromeWindow;
    nextWindowId = recreatedWindowId;

    return createdWindow;
  };

  /**
   * Window更新入力を記録します。
   * @param {number} windowId 更新対象window IDです。
   * @param {ChromeWindowUpdateProperties} updateProperties window更新入力です。
   * @returns {Promise<ChromeWindow>} 更新されたwindowです。
   * @throws {Error} update失敗fixtureが有効な場合に失敗します。
   */
  const update = async (
    windowId: number,
    updateProperties: ChromeWindowUpdateProperties,
  ): Promise<ChromeWindow> => {
    if (shouldFailNextUpdate) {
      shouldFailNextUpdate = false;

      throw new Error("window closed");
    }

    updatedWindows.push([windowId, updateProperties]);
    await Promise.resolve();

    return { id: windowId };
  };

  return {
    createdWindows,
    updatedWindows,
    windowsApi: { create, update },
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

  /** CLI page windowを前面へ戻す入力を作ることを検証します。 */
  it("creates focus properties for the CLI page window", (): void => {
    expect(createCliPageWindowFocusProperties()).toStrictEqual({ focused: true });
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

  /** 既存CLI windowがある場合は新規作成せず前面へ戻すことを検証します。 */
  it("focuses existing CLI page window on second open", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi();
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    await launcher.openCliPageWindow(cliPageUrl);
    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowsApi.createdWindows).toStrictEqual([
      createCliPageWindowCreateProperties(cliPageUrl),
    ]);
    expect(recordingWindowsApi.updatedWindows).toStrictEqual([
      [createdWindowId, createCliPageWindowFocusProperties()],
    ]);
  });

  /** 保存済みwindowが閉じられていた場合は作り直すことを検証します。 */
  it("recreates CLI page window when focusing previous window fails", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({ failNextUpdate: true });
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    await launcher.openCliPageWindow(cliPageUrl);
    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowsApi.createdWindows).toStrictEqual([
      createCliPageWindowCreateProperties(cliPageUrl),
      createCliPageWindowCreateProperties(cliPageUrl),
    ]);
    expect(recordingWindowsApi.updatedWindows).toStrictEqual([]);
  });
});
