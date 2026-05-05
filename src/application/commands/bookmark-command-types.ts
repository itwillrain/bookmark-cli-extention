/* oxlint-disable max-lines -- Command AST型の集約地点としてunionを同じfileに保つため。 */

import type {
  BrowserHistoryCommand,
  FrequentBookmarksCommand,
  RecentBookmarksCommand,
} from "./bookmark-usage-command-types";
import type { FindBookmarkCommand, GoBookmarkCommand } from "./bookmark-search-command-types";

export type {
  BrowserHistoryCommand,
  FrequentBookmarksCommand,
  RecentBookmarksCommand,
} from "./bookmark-usage-command-types";

export type { FindBookmarkCommand, GoBookmarkCommand } from "./bookmark-search-command-types";

/**
 * Directory list command optionです。
 */
export interface ListDirectoryOptions {
  /**
   * Dot始まりのentryも表示するかです。
   */
  readonly all: boolean;
  /**
   * 詳細情報を表示するかです。
   */
  readonly long: boolean;
}

/**
 * Directory list commandです。
 */
export interface ListDirectoryCommand {
  /**
   * Command種別です。
   */
  readonly kind: "ls";
  /**
   * 表示optionです。
   */
  readonly options: ListDirectoryOptions;
  /**
   * 対象path入力です。
   */
  readonly pathInput: string;
}

/**
 * Change directory commandです。
 */
export interface ChangeDirectoryCommand {
  /**
   * Command種別です。
   */
  readonly kind: "cd";
  /**
   * 対象pathまたは直前結果番号です。
   */
  readonly pathInput: string;
}

/**
 * Print working directory commandです。
 */
export interface PrintWorkingDirectoryCommand {
  /**
   * Command種別です。
   */
  readonly kind: "pwd";
}

/**
 * Directory tree表示commandです。
 */
export interface ShowDirectoryTreeCommand {
  /**
   * 表示する最大depthです。
   */
  readonly depth: number;
  /**
   * Directoryだけを表示するかです。
   */
  readonly directoriesOnly: boolean;
  /**
   * Command種別です。
   */
  readonly kind: "tree";
  /**
   * 対象path入力です。
   */
  readonly pathInput: string;
}

/**
 * Mark commandです。
 */
export interface MarkBookmarkCommand {
  /**
   * 重複URLの保存を許可するかです。
   */
  readonly allowDuplicate: boolean;
  /**
   * Command種別です。
   */
  readonly kind: "mark";
  /**
   * 保存先folder path入力です。
   */
  readonly targetFolderPathInput: string;
  /**
   * Bookmark title入力です。
   */
  readonly titleInput: string;
}

/**
 * Virtual tag commandです。
 */
export interface TagBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "tag";
  /**
   * 削除操作ならtrueです。
   */
  readonly remove: boolean;
  /**
   * 仮想タグ入力一覧です。
   */
  readonly tagInputs: readonly string[];
  /**
   * 対象の直前結果番号です。
   */
  readonly targetInput: string;
}

/**
 * Make directory commandです。
 */
export interface MakeDirectoryCommand {
  /**
   * Command種別です。
   */
  readonly kind: "mkdir";
  /**
   * 作成するfolder path入力です。
   */
  readonly pathInput: string;
}

/**
 * Move Bookmark commandです。
 */
export interface MoveBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "mv";
  /**
   * 移動先folder path入力です。
   */
  readonly targetFolderPathInput: string;
  /**
   * 対象の直前結果番号です。
   */
  readonly targetInput: string;
}

/**
 * Remove Bookmark commandです。
 */
export interface RemoveBookmarkCommand {
  /**
   * 確認なしで削除するかです。
   */
  readonly force: boolean;
  /**
   * Command種別です。
   */
  readonly kind: "rm";
  /**
   * Folder配下も再帰的に削除するかです。
   */
  readonly recursive: boolean;
  /**
   * 対象の直前結果番号です。
   */
  readonly targetInput: string;
}

/**
 * Rename Bookmark commandです。
 */
export interface RenameBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "rename";
  /**
   * 対象の直前結果番号です。
   */
  readonly targetInput: string;
  /**
   * 変更後title入力です。
   */
  readonly titleInput: string;
}

/**
 * Grep pipe stage commandです。
 */
export interface GrepPipeStageCommand {
  /**
   * Pipe stage種別です。
   */
  readonly kind: "grep";
  /**
   * 絞り込みquery入力です。
   */
  readonly queryInput: string;
}

/**
 * 空入力commandです。
 */
export interface EmptyBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "empty";
}

/**
 * 画面表示削除commandです。
 */
export interface ClearBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "clear";
}

/**
 * Command alias操作種別です。
 */
export type AliasBookmarkCommandOperation = "list" | "set";

/**
 * Command alias設定commandです。
 */
export interface AliasBookmarkCommand {
  /**
   * Alias名です。
   */
  readonly aliasName: string;
  /**
   * 展開後command入力です。
   */
  readonly commandInput: string;
  /**
   * Command種別です。
   */
  readonly kind: "alias";
  /**
   * Alias操作種別です。
   */
  readonly operation: AliasBookmarkCommandOperation;
}

/**
 * Command alias削除commandです。
 */
export interface UnaliasBookmarkCommand {
  /**
   * 削除対象alias名です。
   */
  readonly aliasName: string;
  /**
   * Command種別です。
   */
  readonly kind: "unalias";
}

/**
 * Help表示commandです。
 */
export interface HelpBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "help";
  /**
   * Help対象command名です。空文字の場合はtopic一覧を表示します。
   */
  readonly topicInput: string;
}

/**
 * 未対応commandです。
 */
export interface UnknownBookmarkCommand {
  /**
   * 入力されたcommand名です。
   */
  readonly commandName: string;
  /**
   * Command種別です。
   */
  readonly kind: "unknown";
  /**
   * 正規化済みの入力全体です。
   */
  readonly rawInput: string;
}

/**
 * Pipe sourceとして許可する読み取りcommandです。
 */
export type PipeSourceBookmarkCommand =
  | BrowserHistoryCommand
  | FindBookmarkCommand
  | FrequentBookmarksCommand
  | HelpBookmarkCommand
  | ListDirectoryCommand
  | RecentBookmarksCommand
  | ShowDirectoryTreeCommand;

/**
 * Pipe commandです。
 */
export interface PipeBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "pipe";
  /**
   * Pipe元の読み取りcommandです。
   */
  readonly source: PipeSourceBookmarkCommand;
  /**
   * Pipe stage一覧です。
   */
  readonly stages: readonly GrepPipeStageCommand[];
}

/**
 * 解析済みBookmark commandです。
 */
export type ParsedBookmarkCommand =
  | AliasBookmarkCommand
  | ChangeDirectoryCommand
  | ClearBookmarkCommand
  | EmptyBookmarkCommand
  | FindBookmarkCommand
  | BrowserHistoryCommand
  | GoBookmarkCommand
  | HelpBookmarkCommand
  | ListDirectoryCommand
  | MakeDirectoryCommand
  | MarkBookmarkCommand
  | MoveBookmarkCommand
  | PipeBookmarkCommand
  | PrintWorkingDirectoryCommand
  | FrequentBookmarksCommand
  | RecentBookmarksCommand
  | RemoveBookmarkCommand
  | RenameBookmarkCommand
  | ShowDirectoryTreeCommand
  | TagBookmarkCommand
  | UnaliasBookmarkCommand
  | UnknownBookmarkCommand;
