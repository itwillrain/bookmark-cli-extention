import {
  type ChromeWindow,
  type ChromeWindowCreateProperties,
  type ChromeWindowGetAllQuery,
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

/** 既存CLI window ID fixtureです。 */
const existingWindowId = 201;

/** 重複CLI window ID fixtureです。 */
const duplicateWindowId = 202;

/** 別window ID fixtureです。 */
const unrelatedWindowId = 301;

/** 別URL fixtureです。 */
const unrelatedUrl = "https://example.com/";

/** Chrome windows APIの記録fixtureです。 */
interface RecordingWindowsApi {
  /** 作成されたwindow入力一覧です。 */
  readonly createdWindows: readonly ChromeWindowCreateProperties[];
  /** Window一覧取得入力です。 */
  readonly getAllQueries: readonly ChromeWindowGetAllQuery[];
  /** 削除されたwindow ID一覧です。 */
  readonly removedWindowIds: readonly number[];
  /** 更新されたwindow入力一覧です。 */
  readonly updatedWindows: readonly (readonly [number, ChromeWindowUpdateProperties])[];
  /** Chrome windows API fixtureです。 */
  readonly windowsApi: ChromeWindowsApi;
}

/** Chrome windows API fixtureのoptionです。 */
interface RecordingWindowsApiOptions {
  /** 既存window一覧です。 */
  readonly existingWindows?: readonly ChromeWindow[];
  /** 次のwindow updateを失敗させるかです。 */
  readonly failNextUpdate?: boolean;
}

/**
 * Chrome window fixtureを作ります。
 * @param {number} windowId window IDです。
 * @param {string} tabUrl window内tab URLです。
 * @returns {ChromeWindow} Chrome window fixtureです。
 */
const createChromeWindow = (windowId: number, tabUrl: string): ChromeWindow => ({
  id: windowId,
  tabs: [{ url: tabUrl }],
});

/**
 * Window作成入力を記録するChrome windows API fixtureを作ります。
 * @param {RecordingWindowsApiOptions} options Chrome windows API fixture optionです。
 * @returns {RecordingWindowsApi} Chrome windows API fixtureです。
 */
// oxlint-disable-next-line max-lines-per-function, max-statements -- create/updateを同じclosureで記録するfixtureのため。
const createRecordingWindowsApi = (
  options: RecordingWindowsApiOptions = {},
): RecordingWindowsApi => {
  const createdWindows: ChromeWindowCreateProperties[] = [];
  const getAllQueries: ChromeWindowGetAllQuery[] = [];
  const removedWindowIds: number[] = [];
  const updatedWindows: (readonly [number, ChromeWindowUpdateProperties])[] = [];
  let nextWindowId = createdWindowId;
  let existingWindows = [...(options.existingWindows ?? [])];
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
    existingWindows = [
      ...existingWindows,
      createChromeWindow(createdWindow.id, createProperties.url),
    ];

    return createdWindow;
  };

  /**
   * Window一覧取得入力を記録します。
   * @param {ChromeWindowGetAllQuery} query Window一覧取得入力です。
   * @returns {Promise<readonly ChromeWindow[]>} Window一覧です。
   */
  // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- Chrome API fixtureが実API型へ合わせるため。
  const getAll = async (query: ChromeWindowGetAllQuery): Promise<readonly ChromeWindow[]> => {
    getAllQueries.push(query);
    await Promise.resolve();

    return existingWindows;
  };

  /**
   * Window削除入力を記録します。
   * @param {number} windowId 削除対象window IDです。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const remove = async (windowId: number): Promise<void> => {
    removedWindowIds.push(windowId);
    existingWindows = existingWindows.filter((window) => window.id !== windowId);
    await Promise.resolve();
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
    getAllQueries,
    removedWindowIds,
    updatedWindows,
    windowsApi: { create, getAll, remove, update },
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

/** Chrome CLI page window launcher作成のテストスイートです。 */
describe("createChromeCliPageWindowLauncher creation", (): void => {
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

/** Chrome CLI page window launcher再利用のテストスイートです。 */
describe("createChromeCliPageWindowLauncher reuse", (): void => {
  /** 作成済みCLI windowがある場合は新規作成せず前面へ戻すことを検証します。 */
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
});

/** Chrome CLI page window launcher検出のテストスイートです。 */
describe("createChromeCliPageWindowLauncher discovery", (): void => {
  /** 既存CLI windowを検出した場合は新規作成せず前面へ戻すことを検証します。 */
  it("focuses discovered CLI page window without creating another window", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({
      existingWindows: [createChromeWindow(existingWindowId, cliPageUrl)],
    });
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowsApi.createdWindows).toStrictEqual([]);
    expect(recordingWindowsApi.updatedWindows).toStrictEqual([
      [existingWindowId, createCliPageWindowFocusProperties()],
    ]);
  });

  /** CLI windowが複数ある場合は1つだけ残して重複windowを閉じることを検証します。 */
  it("removes duplicate CLI page windows before focusing the primary window", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({
      existingWindows: [
        createChromeWindow(existingWindowId, cliPageUrl),
        createChromeWindow(duplicateWindowId, cliPageUrl),
        createChromeWindow(unrelatedWindowId, unrelatedUrl),
      ],
    });
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowsApi.createdWindows).toStrictEqual([]);
    expect(recordingWindowsApi.removedWindowIds).toStrictEqual([duplicateWindowId]);
    expect(recordingWindowsApi.updatedWindows).toStrictEqual([
      [existingWindowId, createCliPageWindowFocusProperties()],
    ]);
  });
});

/** Chrome CLI page window launcher競合制御のテストスイートです。 */
describe("createChromeCliPageWindowLauncher concurrency", (): void => {
  /** 同時に開く要求が来てもwindow作成を1回だけにまとめることを検証します。 */
  it("coalesces concurrent open requests into one window", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi();
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    await Promise.all([
      launcher.openCliPageWindow(cliPageUrl),
      launcher.openCliPageWindow(cliPageUrl),
    ]);

    expect(recordingWindowsApi.createdWindows).toStrictEqual([
      createCliPageWindowCreateProperties(cliPageUrl),
    ]);
  });
});

/** Chrome CLI page window launcher復旧のテストスイートです。 */
describe("createChromeCliPageWindowLauncher recovery", (): void => {
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
