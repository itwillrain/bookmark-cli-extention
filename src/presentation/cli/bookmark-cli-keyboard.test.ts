import { describe, expect, it } from "vitest";
import { resolveBookmarkCliKeyboardAction } from "./bookmark-cli-keyboard";

/**
 * Bookmark CLI result keyboard action解決のテストスイート。
 */
describe("resolveBookmarkCliKeyboardAction result", (): void => {
  /**
   * Ctrl+jを次候補移動へ変換することを検証。
   */
  it("resolves control j as result next", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "j" })).toBe("resultNext");
  });

  /**
   * Ctrl+kを前候補移動へ変換することを検証。
   */
  it("resolves control k as result previous", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "k" })).toBe("resultPrevious");
  });
});

/**
 * Bookmark CLI history keyboard action解決のテストスイート。
 */
describe("resolveBookmarkCliKeyboardAction history", (): void => {
  /**
   * Ctrl+nを新しい履歴移動へ変換することを検証。
   */
  it("resolves control n as history next", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "n" })).toBe("historyNext");
  });

  /**
   * Ctrl+pを古い履歴移動へ変換することを検証。
   */
  it("resolves control p as history previous", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "p" })).toBe("historyPrevious");
  });

  /**
   * 下矢印を新しい履歴移動へ変換することを検証。
   */
  it("resolves arrow down as history next", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "ArrowDown" })).toBe(
      "historyNext",
    );
  });

  /**
   * 上矢印を古い履歴移動へ変換することを検証。
   */
  it("resolves arrow up as history previous", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "ArrowUp" })).toBe(
      "historyPrevious",
    );
  });
});

/**
 * Bookmark CLI common keyboard action解決のテストスイート。
 */
describe("resolveBookmarkCliKeyboardAction common", (): void => {
  /**
   * Tabを補完へ変換することを検証。
   */
  it("resolves tab as completion", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "Tab" })).toBe("complete");
  });

  /**
   * Escapeを解除へ変換することを検証。
   */
  it("resolves escape as clear", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "Escape" })).toBe("clear");
  });
});
