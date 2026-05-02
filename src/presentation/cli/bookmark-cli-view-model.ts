import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { BookmarkSearchResult } from "../../domain/search/bookmark-search";

/**
 * Bookmark検索結果をCLI表示itemへ変換します。
 * @param {BookmarkSearchResult} result Bookmark検索結果です。
 * @returns {BookmarkCliResultItem} CLI表示itemです。
 */
const createBookmarkCliResultItem = (result: BookmarkSearchResult): BookmarkCliResultItem => ({
  folderPath: result.entry.folderPath,
  kind: result.entry.kind,
  score: result.score,
  title: result.entry.title,
  url: result.entry.url,
});

/**
 * Bookmark検索結果一覧をCLI表示item一覧へ変換します。
 * @param {readonly BookmarkSearchResult[]} results Bookmark検索結果一覧です。
 * @returns {readonly BookmarkCliResultItem[]} CLI表示item一覧です。
 */
export const createBookmarkCliResultItems = (
  results: readonly BookmarkSearchResult[],
): readonly BookmarkCliResultItem[] => results.map((result) => createBookmarkCliResultItem(result));
