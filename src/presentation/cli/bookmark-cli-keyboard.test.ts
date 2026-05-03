import { describe, expect, it } from "vitest";
import { resolveBookmarkCliKeyboardAction } from "./bookmark-cli-keyboard";

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
 * Bookmark CLI readline keyboard action解決のテストスイート。
 */
describe("resolveBookmarkCliKeyboardAction readline", (): void => {
  /**
   * Ctrl+aを行頭移動へ変換することを検証。
   */
  it("resolves control a as line start", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "a" })).toBe("lineStart");
  });

  /**
   * Ctrl+eを行末移動へ変換することを検証。
   */
  it("resolves control e as line end", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "e" })).toBe("lineEnd");
  });

  /**
   * Ctrl+uをcursor以前削除へ変換することを検証。
   */
  it("resolves control u as kill before cursor", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "u" })).toBe("killBeforeCursor");
  });

  /**
   * Ctrl+kをcursor以後削除へ変換することを検証。
   */
  it("resolves control k as kill after cursor", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "k" })).toBe("killAfterCursor");
  });

  /**
   * Ctrl+wを前方単語削除へ変換することを検証。
   */
  it("resolves control w as delete previous word", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "w" })).toBe(
      "deletePreviousWord",
    );
  });
});

/**
 * Bookmark CLI common keyboard action解決のテストスイート。
 */
describe("resolveBookmarkCliKeyboardAction common", (): void => {
  /**
   * Tabを次の補完候補選択へ変換することを検証。
   */
  it("resolves tab as selecting next completion", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "Tab" })).toBe(
      "selectNextCompletion",
    );
  });

  /**
   * Enterを補完候補確定へ変換することを検証。
   */
  it("resolves enter as confirming completion", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "Enter" })).toBe(
      "confirmCompletion",
    );
  });

  /**
   * Escapeを解除へ変換することを検証。
   */
  it("resolves escape as clear", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: false, key: "Escape" })).toBe("clear");
  });
});
