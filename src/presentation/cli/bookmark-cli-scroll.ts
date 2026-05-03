/** Bookmark CLI scroll位置計算対象の最小shape。 */
export interface BookmarkCliScrollTarget {
  /** Scroll可能なcontent全体の高さ。 */
  readonly scrollHeight: number;
}

/** Scroll対象が未mountであることを表す値。 */
export type BookmarkCliScrollTargetMissing = false;

/** Bookmark CLI scroll対象候補。 */
export type BookmarkCliScrollTargetCandidate =
  | Readonly<BookmarkCliScrollTarget>
  | BookmarkCliScrollTargetMissing;

/** Bookmark CLI scrollTop解決結果。 */
export type BookmarkCliResolvedScrollTop = number | BookmarkCliScrollTargetMissing;

/**
 * Bookmark CLI terminal viewportを最下部へ移動するscrollTopを解決します。
 * @param {BookmarkCliScrollTargetCandidate} element scroll対象element。
 * @returns {BookmarkCliResolvedScrollTop} 最下部へ移動するscrollTop。
 */
export const resolveBookmarkCliBottomScrollTop = (
  element: BookmarkCliScrollTargetCandidate,
): BookmarkCliResolvedScrollTop => {
  if (element === false) {
    return false;
  }

  return element.scrollHeight;
};
