import { describe, expect, it } from "vitest";
import { resolveBookmarkCliKeyboardAction } from "./bookmark-cli-keyboard";

/**
 * Bookmark CLI keyboard action解決のテストスイート。
 */
describe("resolveBookmarkCliKeyboardAction", (): void => {
  /**
   * Ctrl+jを次候補移動へ変換することを検証。
   */
  it("resolves control j as move next", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "j" })).toBe("moveNext");
  });

  /**
   * Ctrl+kを前候補移動へ変換することを検証。
   */
  it("resolves control k as move previous", (): void => {
    expect(resolveBookmarkCliKeyboardAction({ ctrlKey: true, key: "k" })).toBe("movePrevious");
  });

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
