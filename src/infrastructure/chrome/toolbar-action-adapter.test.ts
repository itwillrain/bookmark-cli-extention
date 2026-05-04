import {
  type ToolbarAction,
  type ToolbarActionClickListener,
  addToolbarActionClickListener,
} from "./toolbar-action-adapter";
import { describe, expect, it, vi } from "vitest";

/** 登録済みlistener一覧です。 */
type RegisteredListeners = ToolbarActionClickListener[];

/** Toolbar action fixtureと記録状態です。 */
interface RecordingToolbarAction {
  /** Toolbar action fixtureです。 */
  readonly action: ToolbarAction;
  /** 登録済みlistener一覧です。 */
  readonly registeredListeners: readonly ToolbarActionClickListener[];
}

/** Test用のtoolbar action click listenerです。 */
const toolbarActionClickListener = vi.fn<() => void>();

/**
 * Toolbar action fixtureを作ります。
 * @returns {RecordingToolbarAction} Toolbar action fixtureと記録状態です。
 */
const createRecordingToolbarAction = (): RecordingToolbarAction => {
  const registeredListeners: RegisteredListeners = [];

  return {
    action: {
      onClicked: {
        /**
         * Listener登録を記録します。
         * @param {ToolbarActionClickListener} listener 登録するlistenerです。
         * @returns {void} 返り値はありません。
         */
        addListener(listener): void {
          registeredListeners.push(listener);
        },
      },
    },
    registeredListeners,
  };
};

/** Toolbar action adapterのテストスイートです。 */
describe("addToolbarActionClickListener", (): void => {
  /** Chrome MV3のaction APIへlistenerを登録することを検証します。 */
  it("registers listener with action API", (): void => {
    const recordingToolbarAction = createRecordingToolbarAction();

    expect(
      addToolbarActionClickListener(
        { action: recordingToolbarAction.action },
        toolbarActionClickListener,
      ),
    ).toBe(true);
    expect(recordingToolbarAction.registeredListeners).toStrictEqual([toolbarActionClickListener]);
  });

  /** Firefox MV2のbrowserAction APIへfallbackすることを検証します。 */
  it("falls back to browserAction API", (): void => {
    const recordingToolbarAction = createRecordingToolbarAction();

    expect(
      addToolbarActionClickListener(
        { browserAction: recordingToolbarAction.action },
        toolbarActionClickListener,
      ),
    ).toBe(true);
    expect(recordingToolbarAction.registeredListeners).toStrictEqual([toolbarActionClickListener]);
  });

  /** Toolbar action APIがない場合に登録しないことを検証します。 */
  it("returns false when toolbar action API is unavailable", (): void => {
    expect(addToolbarActionClickListener({}, toolbarActionClickListener)).toBe(false);
  });
});
