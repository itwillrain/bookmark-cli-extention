/* oxlint-disable max-lines -- Chrome windows API境界のfixtureと単一window制御の仕様を同じ場所で確認するため。 */

import {
  type ChromeWindow,
  type ChromeWindowCreateProperties,
  type ChromeWindowGetAllQuery,
  type ChromeWindowUpdateProperties,
  type ChromeWindowsApi,
  type CliPageWindowIdStoragePort,
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

/** CLI page window ID未保存状態です。 */
const cliPageWindowIdMissing = false;

/** 1回分のcount増分です。 */
const countIncrement = 1;

/** 1回呼び出し済みを表す期待値です。 */
const expectedSingleCallCount = 1;

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

/** CLI page window ID storageの記録fixtureです。 */
interface RecordingWindowIdStorage {
  /** 削除回数です。 */
  readonly clearCount: number;
  /** 読み込み回数です。 */
  readonly readCount: number;
  /** CLI page window ID storage fixtureです。 */
  readonly storage: CliPageWindowIdStoragePort;
  /** 書き込まれたwindow ID一覧です。 */
  readonly writtenWindowIds: readonly number[];
}

/**
 * Chrome window fixtureを作ります。
 * @param {number} windowId window IDです。
 * @param {string} tabUrl window内tab URLです。
 * @param {boolean} focused windowがfocus中かです。
 * @returns {ChromeWindow} Chrome window fixtureです。
 */
const createChromeWindow = (windowId: number, tabUrl: string, focused = false): ChromeWindow => ({
  focused,
  id: windowId,
  tabs: [{ url: tabUrl }],
});

/**
 * Tab URLを取得できないChrome window fixtureを作ります。
 * @param {number} windowId window IDです。
 * @param {boolean} focused windowがfocus中かです。
 * @returns {ChromeWindow} Chrome window fixtureです。
 */
const createChromeWindowWithoutTabUrl = (windowId: number, focused = false): ChromeWindow => ({
  focused,
  id: windowId,
  tabs: [{}],
});

/**
 * CLI page window ID storage fixtureを作ります。
 * @param {number | false} initialWindowId 初期保存window IDです。
 * @returns {RecordingWindowIdStorage} CLI page window ID storage fixtureです。
 */
// oxlint-disable-next-line max-lines-per-function -- storage fixtureのclosureとgetterを同じ場所に置くため。
const createRecordingWindowIdStorage = (
  initialWindowId: number | false = cliPageWindowIdMissing,
): RecordingWindowIdStorage => {
  let storedWindowId = initialWindowId;
  let readCount = 0;
  let clearCount = 0;
  const writtenWindowIds: number[] = [];

  /**
   * 保存済みCLI page window IDを読み込みます。
   * @returns {Promise<number | false>} 保存済みwindow IDです。
   */
  const readCliPageWindowId = async (): Promise<number | false> => {
    readCount += countIncrement;
    await Promise.resolve();

    return storedWindowId;
  };

  /**
   * CLI page window IDを保存します。
   * @param {number} windowId CLI page window IDです。
   * @returns {Promise<void>} 保存完了Promiseです。
   */
  const writeCliPageWindowId = async (windowId: number): Promise<void> => {
    writtenWindowIds.push(windowId);
    storedWindowId = windowId;
    await Promise.resolve();
  };

  /**
   * 保存済みCLI page window IDを削除します。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const clearCliPageWindowId = async (): Promise<void> => {
    clearCount += countIncrement;
    storedWindowId = cliPageWindowIdMissing;
    await Promise.resolve();
  };

  return {
    /**
     * 削除回数を返します。
     * @returns {number} 削除回数です。
     */
    get clearCount(): number {
      return clearCount;
    },
    /**
     * 読み込み回数を返します。
     * @returns {number} 読み込み回数です。
     */
    get readCount(): number {
      return readCount;
    },
    storage: { clearCliPageWindowId, readCliPageWindowId, writeCliPageWindowId },
    writtenWindowIds,
  };
};

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
      existingWindows = existingWindows.filter((window) => window.id !== windowId);

      throw new Error("window closed");
    }

    if (!existingWindows.some((window) => window.id === windowId)) {
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
    expect(createCliPageWindowFocusProperties()).toStrictEqual({ focused: true, state: "normal" });
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

  /** Focus中のCLI windowがある場合は閉じることを検証します。 */
  it("closes focused CLI page window", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({
      existingWindows: [createChromeWindow(existingWindowId, cliPageUrl, true)],
    });
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    const closed = await launcher.closeFocusedCliPageWindow(cliPageUrl);

    expect(closed).toBe(true);
    expect(recordingWindowsApi.createdWindows).toStrictEqual([]);
    expect(recordingWindowsApi.removedWindowIds).toStrictEqual([existingWindowId]);
    expect(recordingWindowsApi.updatedWindows).toStrictEqual([]);
  });

  /** Focus中ではないCLI windowは閉じないことを検証します。 */
  it("keeps unfocused CLI page window as is", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({
      existingWindows: [createChromeWindow(existingWindowId, cliPageUrl)],
    });
    const launcher = createChromeCliPageWindowLauncher(recordingWindowsApi.windowsApi);

    const closed = await launcher.closeFocusedCliPageWindow(cliPageUrl);

    expect(closed).toBe(false);
    expect(recordingWindowsApi.removedWindowIds).toStrictEqual([]);
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

/** Chrome CLI page window launcher保存ID復元のテストスイートです。 */
// oxlint-disable-next-line max-lines-per-function -- 保存IDのfocus、close、writeを同じ仕様群で確認するため。
describe("createChromeCliPageWindowLauncher stored window id", (): void => {
  /** Tab URLを取得できない場合も保存済みwindow IDで既存CLI windowを前面へ戻すことを検証します。 */
  it("focuses stored CLI page window when tab URL is unavailable", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({
      existingWindows: [createChromeWindowWithoutTabUrl(existingWindowId)],
    });
    const recordingWindowIdStorage = createRecordingWindowIdStorage(existingWindowId);
    const launcher = createChromeCliPageWindowLauncher(
      recordingWindowsApi.windowsApi,
      recordingWindowIdStorage.storage,
    );

    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowIdStorage.readCount).toBe(expectedSingleCallCount);
    expect(recordingWindowsApi.createdWindows).toStrictEqual([]);
    expect(recordingWindowsApi.updatedWindows).toStrictEqual([
      [existingWindowId, createCliPageWindowFocusProperties()],
    ]);
  });

  /** Tab URLを取得できないfocus中windowも保存済みwindow IDで閉じることを検証します。 */
  it("closes focused stored CLI page window when tab URL is unavailable", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi({
      existingWindows: [createChromeWindowWithoutTabUrl(existingWindowId, true)],
    });
    const recordingWindowIdStorage = createRecordingWindowIdStorage(existingWindowId);
    const launcher = createChromeCliPageWindowLauncher(
      recordingWindowsApi.windowsApi,
      recordingWindowIdStorage.storage,
    );

    const closed = await launcher.closeFocusedCliPageWindow(cliPageUrl);

    expect(closed).toBe(true);
    expect(recordingWindowsApi.createdWindows).toStrictEqual([]);
    expect(recordingWindowsApi.removedWindowIds).toStrictEqual([existingWindowId]);
    expect(recordingWindowIdStorage.clearCount).toBe(expectedSingleCallCount);
  });

  /** 新規作成したCLI window IDを保存することを検証します。 */
  it("stores created CLI page window id", async (): Promise<void> => {
    const recordingWindowsApi = createRecordingWindowsApi();
    const recordingWindowIdStorage = createRecordingWindowIdStorage();
    const launcher = createChromeCliPageWindowLauncher(
      recordingWindowsApi.windowsApi,
      recordingWindowIdStorage.storage,
    );

    await launcher.openCliPageWindow(cliPageUrl);

    expect(recordingWindowIdStorage.writtenWindowIds).toStrictEqual([createdWindowId]);
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
