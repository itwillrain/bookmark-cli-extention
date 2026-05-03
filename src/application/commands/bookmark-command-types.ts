import type {
  FrequentBookmarksCommand,
  RecentBookmarksCommand,
} from "./bookmark-usage-command-types";

export type {
  FrequentBookmarksCommand,
  RecentBookmarksCommand,
} from "./bookmark-usage-command-types";

/**
 * Find commandです。
 */
export interface FindBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "find";
  /**
   * 検索queryです。
   */
  readonly query: string;
}

/**
 * Go commandです。
 */
export interface GoBookmarkCommand {
  /**
   * Command種別です。
   */
  readonly kind: "go";
  /**
   * 検索queryです。
   */
  readonly query: string;
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
  /**
   * Previewだけ表示するかです。
   */
  readonly preview: boolean;
  /**
   * 確認済みとして実行するかです。
   */
  readonly yes: boolean;
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
   * Previewだけ表示するかです。
   */
  readonly preview: boolean;
  /**
   * 移動先folder path入力です。
   */
  readonly targetFolderPathInput: string;
  /**
   * 対象の直前結果番号です。
   */
  readonly targetInput: string;
  /**
   * 確認済みとして実行するかです。
   */
  readonly yes: boolean;
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
   * Previewだけ表示するかです。
   */
  readonly preview: boolean;
  /**
   * 対象の直前結果番号です。
   */
  readonly targetInput: string;
  /**
   * 変更後title入力です。
   */
  readonly titleInput: string;
  /**
   * 確認済みとして実行するかです。
   */
  readonly yes: boolean;
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
 * 解析済みBookmark commandです。
 */
export type ParsedBookmarkCommand =
  | ChangeDirectoryCommand
  | EmptyBookmarkCommand
  | FindBookmarkCommand
  | GoBookmarkCommand
  | HelpBookmarkCommand
  | ListDirectoryCommand
  | MakeDirectoryCommand
  | MarkBookmarkCommand
  | MoveBookmarkCommand
  | PrintWorkingDirectoryCommand
  | FrequentBookmarksCommand
  | RecentBookmarksCommand
  | RemoveBookmarkCommand
  | RenameBookmarkCommand
  | ShowDirectoryTreeCommand
  | TagBookmarkCommand
  | UnknownBookmarkCommand;
