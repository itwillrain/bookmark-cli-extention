import type { ResultCursorIndex } from "../../../domain/bookmarks/result-cursor";

/**
 * CLI resultの表示種別です。
 */
export type BookmarkCliResultKind = "bookmark" | "folder" | "preview";

/**
 * CLI resultとして表示するitemです。
 */
export interface BookmarkCliResultItem {
  /** Tree表示時の階層です。 */
  readonly depth?: number;
  /** Bookmarkまたはfolderを表す種別です。 */
  readonly kind: BookmarkCliResultKind;
  /** 表示名です。 */
  readonly title: string;
  /** Folder pathです。 */
  readonly folderPath: string;
  /** 補足説明です。 */
  readonly description?: string;
  /** 詳細表示token一覧です。 */
  readonly details?: readonly string[];
  /** Bookmark URLです。 */
  readonly url?: string;
  /** 検索scoreです。 */
  readonly score?: number;
}

/**
 * Bookmark CLI result listのpropsです。
 */
export interface BookmarkCliResultListProps {
  /**
   * Nerd Font iconを優先するかです。v1の結果一覧はtofu防止のためASCII labelを使います。
   */
  readonly preferNerdFont: boolean;
  /** CLI result一覧です。 */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /** 選択中result indexです。 */
  readonly selectedResultIndex: ResultCursorIndex;
}
