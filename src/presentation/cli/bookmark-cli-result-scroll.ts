import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/**
 * Result scrollIntoView optionsです。
 */
export type BookmarkCliResultScrollOptions = Readonly<ScrollIntoViewOptions>;

/**
 * Result scroll対象の最小shapeです。
 */
export interface BookmarkCliResultScrollTarget {
  /** 対象要素を表示範囲へscrollします。 */
  readonly scrollIntoView: (options: BookmarkCliResultScrollOptions) => void;
}

/**
 * 選択中result scroll入力です。
 */
export interface ScrollSelectedBookmarkCliResultInput {
  /** 選択中result indexです。 */
  readonly selectedResultIndex: ResultCursorIndex;
  /** Scroll対象要素です。 */
  readonly target: BookmarkCliResultScrollTarget | null;
}

/** 選択中resultを表示範囲へ入れるblock指定です。 */
const resultScrollBlock = "nearest";

/** 選択中resultを表示範囲へ入れるinline指定です。 */
const resultScrollInline = "nearest";

/** Result scroll optionです。 */
const resultScrollOptions = {
  block: resultScrollBlock,
  inline: resultScrollInline,
} as const satisfies ScrollIntoViewOptions;

/**
 * 選択中resultを表示範囲へscrollします。
 * @param {ScrollSelectedBookmarkCliResultInput} input 選択中result scroll入力です。
 * @returns {boolean} scrollした場合はtrueです。
 */
export const scrollSelectedBookmarkCliResultIntoView = (
  input: ScrollSelectedBookmarkCliResultInput,
): boolean => {
  if (input.selectedResultIndex === resultCursorCleared || input.target === null) {
    return false;
  }

  input.target.scrollIntoView(resultScrollOptions);

  return true;
};
