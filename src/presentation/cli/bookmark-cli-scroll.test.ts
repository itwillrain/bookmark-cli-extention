import {
  type BookmarkCliScrollTarget,
  resolveBookmarkCliBottomScrollTop,
} from "./bookmark-cli-scroll";
import { describe, expect, it } from "vitest";

/** Scroll高さfixture。 */
const scrollHeight = 1200;

/** Scroll対象未mount fixture。 */
const missingScrollTarget = false;

/**
 * Scroll対象element fixtureを作成します。
 * @returns {BookmarkCliScrollTarget} Scroll対象element fixture。
 */
const createScrollTarget = (): BookmarkCliScrollTarget => ({
  scrollHeight,
});

/** Bookmark CLI scroll位置計算のテストスイート。 */
describe("resolveBookmarkCliBottomScrollTop", (): void => {
  /** Terminal viewportをscrollHeightへ移動する値を返すことを検証します。 */
  it("returns scrollHeight as the bottom scrollTop", (): void => {
    const element = createScrollTarget();

    expect(resolveBookmarkCliBottomScrollTop(element)).toBe(scrollHeight);
  });

  /** Scroll対象が未mountの場合は値を返さないことを検証します。 */
  it("returns missing marker before mount", (): void => {
    expect(resolveBookmarkCliBottomScrollTop(missingScrollTarget)).toBe(missingScrollTarget);
  });
});
