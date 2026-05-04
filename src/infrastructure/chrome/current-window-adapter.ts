/**
 * Chrome windows APIが返す現在windowの最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows#method-getCurrent
 */
export interface ChromeCurrentWindow {
  /** Window IDです。 */
  readonly id?: number | undefined;
}

/**
 * 現在windowを閉じるために使うChrome windows APIの最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/windows
 */
export interface ChromeCurrentWindowApi {
  /** 現在windowを取得します。 */
  readonly getCurrent: () => Promise<ChromeCurrentWindow>;
  /** Windowを閉じます。 */
  readonly remove: (windowId: number) => Promise<void>;
}

/** Window IDが取得できない状態です。 */
const windowIdMissing = false;

/** 閉じる対象window IDです。 */
type ClosableWindowId = number | typeof windowIdMissing;

/**
 * 現在windowから閉じられるwindow IDを取り出します。
 * @param {ChromeCurrentWindow} window 現在windowです。
 * @returns {ClosableWindowId} 閉じる対象window IDです。
 */
const resolveClosableWindowId = (window: ChromeCurrentWindow): ClosableWindowId => {
  if (typeof window.id === "number") {
    return window.id;
  }

  return windowIdMissing;
};

/** 現在window closerです。 */
export interface ChromeCurrentWindowCloser {
  /** 現在windowを閉じます。 */
  readonly closeCurrentWindow: () => Promise<void>;
}

/**
 * Chrome windows APIを現在window closerへ変換します。
 * @param {ChromeCurrentWindowApi} windowsApi Chrome windows APIです。
 * @returns {ChromeCurrentWindowCloser} 現在window closerです。
 */
export const createChromeCurrentWindowCloser = (
  windowsApi: ChromeCurrentWindowApi,
): ChromeCurrentWindowCloser => {
  /**
   * 現在windowを閉じます。
   * @returns {Promise<void>} close完了Promiseです。
   */
  const closeCurrentWindow = async (): Promise<void> => {
    const windowId = resolveClosableWindowId(await windowsApi.getCurrent());

    if (windowId === windowIdMissing) {
      return;
    }

    await windowsApi.remove(windowId);
  };

  return { closeCurrentWindow };
};
