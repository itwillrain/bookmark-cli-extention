/* oxlint-disable max-lines -- Chrome windows APIの境界型と単一window制御を同じadapterに閉じるため。 */

/**
 * Chrome windows APIで指定できるwindow種別です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#type-CreateType
 */
export type ChromeWindowCreateType = "normal" | "popup";

/** Chrome windows APIで指定できるwindow状態です。 */
export type ChromeWindowState = "minimized" | "normal";

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
  readonly focused?: boolean;
  /** Window状態です。 */
  readonly state?: ChromeWindowState;
}

/**
 * Chrome windows.getAllに渡す入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#method-getAll
 */
export interface ChromeWindowGetAllQuery {
  /** Window内tab情報を含めるかです。 */
  readonly populate: boolean;
  /** 取得対象window種別です。 */
  readonly windowTypes: ChromeWindowCreateType[];
}

/**
 * Chrome windows APIが返すtabの最小shapeです。
 */
export interface ChromeWindowTab {
  /** Tab URLです。 */
  readonly url?: string | undefined;
}

/**
 * Chrome windows APIが返すwindowの最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#type-Window
 */
export interface ChromeWindow {
  /** Windowがfocus中かです。 */
  readonly focused?: boolean | undefined;
  /** Window IDです。 */
  readonly id?: number | undefined;
  /** Window内tab一覧です。 */
  readonly tabs?: readonly ChromeWindowTab[] | undefined;
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
  /** Window一覧を取得します。 */
  // oxlint-disable-next-line typescript-eslint/prefer-readonly-parameter-types -- Chrome APIはmutableなwindowTypes配列を要求するため。
  readonly getAll: (queryInfo: ChromeWindowGetAllQuery) => Promise<readonly ChromeWindow[]>;
  /** 既存windowを閉じます。 */
  readonly remove: (windowId: number) => Promise<void>;
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
export type StoredCliPageWindowId = number | typeof cliPageWindowIdMissing;

/** 実行中のCLI page window open taskがない状態です。 */
const openCliPageWindowTaskMissing = false;

/** CLI page window open taskです。 */
type OpenCliPageWindowTask = Promise<void> | typeof openCliPageWindowTaskMissing;

/** CLI page window ID storageです。 */
export interface CliPageWindowIdStoragePort {
  /** 保存済みCLI page window IDを削除します。 */
  readonly clearCliPageWindowId: () => Promise<void>;
  /** 保存済みCLI page window IDを読み込みます。 */
  readonly readCliPageWindowId: () => Promise<StoredCliPageWindowId>;
  /** CLI page window IDを保存します。 */
  readonly writeCliPageWindowId: (windowId: number) => Promise<void>;
}

/** CLI page window IDを保存しないstorageです。 */
const cliPageWindowIdStorageMissing = {
  /**
   * 保存済みCLI page window IDを削除します。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  clearCliPageWindowId: async (): Promise<void> => {
    await Promise.resolve();
  },
  /**
   * 保存済みCLI page window IDを読み込みます。
   * @returns {Promise<StoredCliPageWindowId>} 保存済みwindow IDです。
   */
  readCliPageWindowId: async (): Promise<StoredCliPageWindowId> => {
    await Promise.resolve();

    return cliPageWindowIdMissing;
  },
  /**
   * CLI page window IDを保存します。
   * @returns {Promise<void>} 保存完了Promiseです。
   */
  writeCliPageWindowId: async (): Promise<void> => {
    await Promise.resolve();
  },
} satisfies CliPageWindowIdStoragePort;

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
  state: "normal",
});

/**
 * CLI page window探索用queryを作ります。
 * @returns {ChromeWindowGetAllQuery} Window一覧取得queryです。
 */
export const createCliPageWindowGetAllQuery = (): ChromeWindowGetAllQuery => ({
  populate: true,
  windowTypes: [cliPopupWindowType],
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
 * Chrome windowがCLI pageを含むか判定します。
 * @param {ChromeWindow} window 判定対象windowです。
 * @param {string} url CLI page URLです。
 * @returns {boolean} CLI page windowならtrueです。
 */
const isCliPageWindow = (window: ChromeWindow, url: string): boolean =>
  window.tabs?.some((tab) => tab.url === url) === true;

/**
 * CLI page windowを一覧から抽出します。
 * @param {readonly ChromeWindow[]} windows Chrome window一覧です。
 * @param {string} url CLI page URLです。
 * @returns {readonly ChromeWindow[]} CLI page window一覧です。
 */
const filterCliPageWindows = (
  windows: readonly ChromeWindow[],
  url: string,
): readonly ChromeWindow[] => windows.filter((window) => isCliPageWindow(window, url));

/**
 * Focus中のCLI page windowを取得します。
 * @param {readonly ChromeWindow[]} windows Chrome window一覧です。
 * @param {string} url CLI page URLです。
 * @returns {ChromeWindow | undefined} Focus中のCLI page windowです。
 */
const findFocusedCliPageWindow = (
  windows: readonly ChromeWindow[],
  url: string,
): ChromeWindow | undefined =>
  filterCliPageWindows(windows, url).find((window) => window.focused === true);

/**
 * 保存済みIDと一致するfocus中windowを取得します。
 * @param {readonly ChromeWindow[]} windows Chrome window一覧です。
 * @param {number} windowId 保存済みwindow IDです。
 * @returns {ChromeWindow | undefined} Focus中の保存済みwindowです。
 */
const findFocusedWindowById = (
  windows: readonly ChromeWindow[],
  windowId: number,
): ChromeWindow | undefined =>
  windows.find((window) => window.id === windowId && window.focused === true);

/**
 * 重複CLI page windowを閉じます。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {readonly ChromeWindow[]} duplicateWindows 重複window一覧です。
 * @returns {Promise<void>} 削除完了Promiseです。
 */
const removeDuplicateCliPageWindows = async (
  windowsApi: ChromeWindowsApi,
  duplicateWindows: readonly ChromeWindow[],
): Promise<void> => {
  await Promise.all(
    duplicateWindows.map(async (window): Promise<void> => {
      const windowId = resolveStoredCliPageWindowId(window);

      if (windowId !== cliPageWindowIdMissing) {
        await windowsApi.remove(windowId);
      }
    }),
  );
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

/**
 * 保存済みCLI page windowを閉じます。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {number} windowId 保存済みwindow IDです。
 * @returns {Promise<boolean>} 閉じられた場合はtrueです。
 */
const closeCliPageWindow = async (
  windowsApi: ChromeWindowsApi,
  windowId: number,
): Promise<boolean> => {
  try {
    await windowsApi.remove(windowId);

    return true;
  } catch {
    return false;
  }
};

/**
 * 実在するCLI page windowを探して前面へ戻します。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {string} url CLI page URLです。
 * @returns {Promise<StoredCliPageWindowId>} 前面復帰したwindow IDです。
 */
const focusDiscoveredCliPageWindow = async (
  windowsApi: ChromeWindowsApi,
  url: string,
): Promise<StoredCliPageWindowId> => {
  const [primaryWindow, ...duplicateWindows] = filterCliPageWindows(
    await windowsApi.getAll(createCliPageWindowGetAllQuery()),
    url,
  );
  const primaryWindowId = resolveStoredCliPageWindowId(primaryWindow);

  await removeDuplicateCliPageWindows(windowsApi, duplicateWindows);

  if (primaryWindowId === cliPageWindowIdMissing) {
    return cliPageWindowIdMissing;
  }

  if (!(await focusCliPageWindow(windowsApi, primaryWindowId))) {
    return cliPageWindowIdMissing;
  }

  return primaryWindowId;
};

/**
 * Focus中のCLI page windowを探して閉じます。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {string} url CLI page URLです。
 * @returns {Promise<boolean>} 閉じられた場合はtrueです。
 */
const closeFocusedDiscoveredCliPageWindow = async (
  windowsApi: ChromeWindowsApi,
  url: string,
): Promise<boolean> => {
  const focusedWindow = findFocusedCliPageWindow(
    await windowsApi.getAll(createCliPageWindowGetAllQuery()),
    url,
  );
  const focusedWindowId = resolveStoredCliPageWindowId(focusedWindow);

  if (focusedWindowId === cliPageWindowIdMissing) {
    return false;
  }

  return closeCliPageWindow(windowsApi, focusedWindowId);
};

/** CLI page window launcherです。 */
export interface ChromeCliPageWindowLauncher {
  /** Focus中のCLI pageを閉じます。 */
  readonly closeFocusedCliPageWindow: (url: string) => Promise<boolean>;
  /** CLI pageを別windowで開きます。 */
  readonly openCliPageWindow: (url: string) => Promise<void>;
}

/**
 * Chrome windows APIをCLI page launcherへ変換します。
 * @param {ChromeWindowsApi} windowsApi Chrome windows APIです。
 * @param {CliPageWindowIdStoragePort} windowIdStorage CLI page window ID storageです。
 * @returns {ChromeCliPageWindowLauncher} CLI page launcherです。
 */
// oxlint-disable-next-line max-lines-per-function, max-statements -- mutableなwindow IDとsingle-flight taskを同じclosureで保持するため。
export const createChromeCliPageWindowLauncher = (
  windowsApi: ChromeWindowsApi,
  windowIdStorage: CliPageWindowIdStoragePort = cliPageWindowIdStorageMissing,
): ChromeCliPageWindowLauncher => {
  let cliPageWindowId: StoredCliPageWindowId = cliPageWindowIdMissing;
  let openCliPageWindowTask: OpenCliPageWindowTask = openCliPageWindowTaskMissing;

  /**
   * 保存済みCLI page window IDを読み込みます。
   * @returns {Promise<StoredCliPageWindowId>} 保存済みCLI page window IDです。
   */
  const readCliPageWindowId = async (): Promise<StoredCliPageWindowId> => {
    if (cliPageWindowId !== cliPageWindowIdMissing) {
      return cliPageWindowId;
    }

    cliPageWindowId = await windowIdStorage.readCliPageWindowId();

    return cliPageWindowId;
  };

  /**
   * CLI page window IDを保存します。
   * @param {number} windowId CLI page window IDです。
   * @returns {Promise<void>} 保存完了Promiseです。
   */
  const writeCliPageWindowId = async (windowId: number): Promise<void> => {
    cliPageWindowId = windowId;
    await windowIdStorage.writeCliPageWindowId(windowId);
  };

  /**
   * CLI page window ID保存を削除します。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const clearCliPageWindowId = async (): Promise<void> => {
    cliPageWindowId = cliPageWindowIdMissing;
    await windowIdStorage.clearCliPageWindowId();
  };

  /**
   * 実在するCLI page windowを前面へ戻します。
   * @param {string} url CLI page URLです。
   * @returns {Promise<boolean>} 前面復帰できた場合はtrueです。
   */
  const focusDiscoveredCliPageWindowIfExists = async (url: string): Promise<boolean> => {
    const discoveredWindowId = await focusDiscoveredCliPageWindow(windowsApi, url);

    if (discoveredWindowId === cliPageWindowIdMissing) {
      return false;
    }

    await writeCliPageWindowId(discoveredWindowId);

    return true;
  };

  /**
   * 保存済みCLI page windowを前面へ戻します。
   * @returns {Promise<boolean>} 前面復帰できた場合はtrueです。
   */
  const focusExistingCliPageWindow = async (): Promise<boolean> => {
    const storedWindowId = await readCliPageWindowId();

    if (storedWindowId === cliPageWindowIdMissing) {
      return false;
    }

    const focused = await focusCliPageWindow(windowsApi, storedWindowId);

    if (!focused) {
      await clearCliPageWindowId();
    }

    return focused;
  };

  /**
   * CLI pageを1つだけ開く処理を実行します。
   * @param {string} url CLI page URLです。
   * @returns {Promise<void>} Window作成または前面復帰完了Promiseです。
   */
  const openSingleCliPageWindow = async (url: string): Promise<void> => {
    if (await focusDiscoveredCliPageWindowIfExists(url)) {
      return;
    }

    if (await focusExistingCliPageWindow()) {
      return;
    }

    const createdWindowId = await createCliPageWindow(windowsApi, url);

    if (createdWindowId !== cliPageWindowIdMissing) {
      await writeCliPageWindowId(createdWindowId);
    }
  };

  /**
   * CLI pageを別windowで開きます。
   * @param {string} url CLI page URLです。
   * @returns {Promise<void>} Window作成完了Promiseです。
   */
  const openCliPageWindow = async (url: string): Promise<void> => {
    if (openCliPageWindowTask !== openCliPageWindowTaskMissing) {
      await openCliPageWindowTask;

      return;
    }

    openCliPageWindowTask = openSingleCliPageWindow(url).finally(() => {
      openCliPageWindowTask = openCliPageWindowTaskMissing;
    });

    await openCliPageWindowTask;
  };

  /**
   * 保存済みCLI page windowがfocus中なら閉じます。
   * @returns {Promise<boolean>} 閉じられた場合はtrueです。
   */
  const closeFocusedStoredCliPageWindow = async (): Promise<boolean> => {
    const storedWindowId = await readCliPageWindowId();

    if (storedWindowId === cliPageWindowIdMissing) {
      return false;
    }

    const focusedWindow = findFocusedWindowById(
      await windowsApi.getAll(createCliPageWindowGetAllQuery()),
      storedWindowId,
    );

    if (resolveStoredCliPageWindowId(focusedWindow) === cliPageWindowIdMissing) {
      return false;
    }

    const closed = await closeCliPageWindow(windowsApi, storedWindowId);

    if (closed) {
      await clearCliPageWindowId();
    }

    return closed;
  };

  /**
   * Focus中のCLI pageを閉じます。
   * @param {string} url CLI page URLです。
   * @returns {Promise<boolean>} 閉じられた場合はtrueです。
   */
  const closeFocusedCliPageWindow = async (url: string): Promise<boolean> => {
    const closed = await closeFocusedDiscoveredCliPageWindow(windowsApi, url);

    if (closed) {
      await clearCliPageWindowId();

      return true;
    }

    return closeFocusedStoredCliPageWindow();
  };

  return { closeFocusedCliPageWindow, openCliPageWindow };
};
