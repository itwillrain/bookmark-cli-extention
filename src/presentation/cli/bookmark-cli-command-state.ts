import type {
  BookmarkCreatorPort,
  LaunchContext,
} from "../../application/bookmarks/mark-bookmark-use-case";
import type {
  BookmarkOpenerPort,
  BookmarkRepositoryPort,
  BrowserHistoryRepositoryPort,
} from "../../application/bookmarks/bookmark-use-cases";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkOrganizerPort } from "../../application/bookmarks/organize-bookmark-use-case";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";
import type { ExtensionState } from "../../domain/storage/extension-state";

/**
 * Clipboard書き込みportです。
 */
export interface ClipboardWriterPort {
  /**
   * Clipboardへtextを書き込みます。
   */
  readonly writeText: (text: string) => Promise<void>;
}

/**
 * Bookmark削除の確認待ち状態です。
 */
export interface BookmarkCliRemovePendingConfirmation {
  /**
   * 確認対象Bookmarkです。
   */
  readonly entry: BookmarkEntry;
  /**
   * 確認種別です。
   */
  readonly kind: "rm";
  /**
   * Folder subtreeを再帰削除する確認かです。
   */
  readonly recursive: boolean;
}

/**
 * CLIの確認待ち状態です。
 */
export type BookmarkCliPendingConfirmation = BookmarkCliRemovePendingConfirmation;

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
  readonly lastResultEntries: readonly BookmarkCliEntry[];
  /**
   * 表示対象の拡張機能versionです。
   */
  readonly extensionVersion?: string;
  /**
   * 確認待ち操作です。
   */
  readonly pendingConfirmation?: BookmarkCliPendingConfirmation;
  /**
   * Chrome履歴取得port。
   */
  readonly historyRepository?: BrowserHistoryRepositoryPort;
  /**
   * CLI起動元タブcontext。
   */
  readonly launchContext?: LaunchContext;
  /**
   * 現在日時を返すport。
   */
  readonly now?: () => string;
  /**
   * Clipboard書き込みportです。
   */
  readonly clipboard?: ClipboardWriterPort;
  /**
   * Bookmark作成port。
   */
  readonly creator: BookmarkCreatorPort;
  /**
   * Bookmark整理port。
   */
  readonly organizer?: BookmarkOrganizerPort;
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
  readonly lastResultEntries: readonly BookmarkCliEntry[];
  /**
   * 確認待ち操作です。
   */
  readonly pendingConfirmation?: BookmarkCliPendingConfirmation;
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
  readonly lastResultEntries: readonly BookmarkCliEntry[];
  /**
   * 確認待ち操作です。
   */
  readonly pendingConfirmation?: BookmarkCliPendingConfirmation;
  /**
   * Result listに表示するitem一覧です。
   */
  readonly resultItems: readonly BookmarkCliResultItem[];
  /**
   * Status lineに表示するtextです。
   */
  readonly statusText: string;
}
