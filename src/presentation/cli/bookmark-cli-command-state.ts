import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";
import type { ExtensionState } from "../../domain/storage/extension-state";

/**
 * Bookmark CLI command実行に必要な依存です。
 */
export interface BookmarkCliCommandDependencies {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
  /**
   * 永続化対象の拡張状態。
   */
  readonly extensionState: ExtensionState;
  /**
   * 直前結果一覧です。
   */
  readonly lastResultEntries: readonly BookmarkEntry[];
  /**
   * Bookmark Tree取得portです。
   */
  readonly repository: BookmarkRepositoryPort;
  /**
   * Bookmark URLを開くportです。
   */
  readonly opener: BookmarkOpenerPort;
}

/**
 * Bookmark CLI画面に反映する状態です。
 */
export interface BookmarkCliCommandState {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
  /**
   * 永続化対象の拡張状態。
   */
  readonly extensionState: ExtensionState;
  /**
   * 直前結果一覧です。
   */
  readonly lastResultEntries: readonly BookmarkEntry[];
  /**
   * Result listに表示するitem一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
}

/**
 * Bookmark CLI command state作成入力です。
 */
export interface BookmarkCliCommandStateInput {
  /**
   * 現在ディレクトリです。
   */
  readonly currentDirectory: CurrentDirectory;
  /**
   * 永続化対象の拡張状態。
   */
  readonly extensionState: ExtensionState;
  /**
   * 直前結果一覧です。
   */
  readonly lastResultEntries: readonly BookmarkEntry[];
  /**
   * Result listに表示するitem一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
}
