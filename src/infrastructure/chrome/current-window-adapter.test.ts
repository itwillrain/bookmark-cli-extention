import {
  type ChromeCurrentWindow,
  type ChromeCurrentWindowApi,
  createChromeCurrentWindowCloser,
} from "./current-window-adapter";
import { describe, expect, it } from "vitest";

/** 現在window ID fixtureです。 */
const currentWindowId = 401;

/** Chrome current window API fixtureです。 */
interface RecordingCurrentWindowApi {
  /** 削除されたwindow ID一覧です。 */
  readonly removedWindowIds: readonly number[];
  /** Chrome current window APIです。 */
  readonly windowsApi: ChromeCurrentWindowApi;
}

/**
 * Chrome current window API fixtureを作ります。
 * @param {ChromeCurrentWindow} currentWindow 現在window fixtureです。
 * @returns {RecordingCurrentWindowApi} Chrome current window API fixtureです。
 */
const createRecordingCurrentWindowApi = (
  currentWindow: ChromeCurrentWindow,
): RecordingCurrentWindowApi => {
  const removedWindowIds: number[] = [];

  /**
   * 現在windowを取得します。
   * @returns {Promise<ChromeCurrentWindow>} 現在windowです。
   */
  const getCurrent = async (): Promise<ChromeCurrentWindow> => {
    await Promise.resolve();

    return currentWindow;
  };

  /**
   * Window削除を記録します。
   * @param {number} windowId 削除対象window IDです。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const remove = async (windowId: number): Promise<void> => {
    removedWindowIds.push(windowId);
    await Promise.resolve();
  };

  return {
    removedWindowIds,
    windowsApi: { getCurrent, remove },
  };
};

/** Chrome current window closerのテストスイートです。 */
describe("createChromeCurrentWindowCloser", (): void => {
  /** 現在window IDを使ってwindowを閉じることを検証します。 */
  it("closes current window by id", async (): Promise<void> => {
    const recordingApi = createRecordingCurrentWindowApi({ id: currentWindowId });
    const closer = createChromeCurrentWindowCloser(recordingApi.windowsApi);

    await closer.closeCurrentWindow();

    expect(recordingApi.removedWindowIds).toStrictEqual([currentWindowId]);
  });

  /** 現在window IDがない場合は閉じないことを検証します。 */
  it("skips closing when current window has no id", async (): Promise<void> => {
    const recordingApi = createRecordingCurrentWindowApi({});
    const closer = createChromeCurrentWindowCloser(recordingApi.windowsApi);

    await closer.closeCurrentWindow();

    expect(recordingApi.removedWindowIds).toStrictEqual([]);
  });
});
