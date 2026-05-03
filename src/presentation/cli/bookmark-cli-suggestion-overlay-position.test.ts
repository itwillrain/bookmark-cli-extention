import { describe, expect, it } from "vitest";
import { resolveBookmarkCliSuggestionOverlayPosition } from "./bookmark-cli-suggestion-overlay-position";

/** Anchor rect fixture。 */
const anchorRect = {
  bottom: 180,
  left: 120,
  top: 150,
  width: 640,
};

/** Container rect fixture。 */
const containerRect = {
  bottom: 720,
  left: 80,
  top: 100,
  width: 900,
};

/**
 * Suggestion overlay position計算のテストスイート。
 */
describe("resolveBookmarkCliSuggestionOverlayPosition", (): void => {
  /**
   * Prompt anchorの直下へoverlay位置を解決することを検証。
   */
  it("positions the overlay below the active prompt anchor", (): void => {
    expect(
      resolveBookmarkCliSuggestionOverlayPosition({ anchorRect, containerRect }),
    ).toStrictEqual({
      left: 40,
      top: 80,
      width: 640,
    });
  });
});
