/**
 * Suggestion overlay位置計算に使う矩形。
 */
export interface BookmarkCliSuggestionOverlayRect {
  /** 矩形下端のviewport座標。 */
  readonly bottom: number;
  /** 矩形左端のviewport座標。 */
  readonly left: number;
  /** 矩形上端のviewport座標。 */
  readonly top: number;
  /** 矩形幅。 */
  readonly width: number;
}

/**
 * Suggestion overlay位置計算の入力。
 */
export interface ResolveBookmarkCliSuggestionOverlayPositionInput {
  /** 現在promptのanchor矩形。 */
  readonly anchorRect: BookmarkCliSuggestionOverlayRect;
  /** Overlayを配置するterminal bodyの矩形。 */
  readonly containerRect: BookmarkCliSuggestionOverlayRect;
}

/**
 * Suggestion overlayの配置情報。
 */
export interface BookmarkCliSuggestionOverlayPosition {
  /** Terminal body左端からのoverlay左位置。 */
  readonly left: number;
  /** Terminal body上端からのoverlay上位置。 */
  readonly top: number;
  /** Overlay幅。 */
  readonly width: number;
}

/**
 * 現在prompt直下へsuggestion overlayを置く位置を解決する。
 * @param {ResolveBookmarkCliSuggestionOverlayPositionInput} input 位置計算入力。
 * @returns {BookmarkCliSuggestionOverlayPosition} Overlay配置情報。
 */
export const resolveBookmarkCliSuggestionOverlayPosition = (
  input: ResolveBookmarkCliSuggestionOverlayPositionInput,
): BookmarkCliSuggestionOverlayPosition => ({
  left: input.anchorRect.left - input.containerRect.left,
  top: input.anchorRect.bottom - input.containerRect.top,
  width: input.anchorRect.width,
});
