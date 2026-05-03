import type { CurrentDirectory } from "../bookmarks/current-directory";

/** 保存データschema versionの現在値。 */
export const currentExtensionStateSchemaVersion = 1;

/** 保存する入力履歴の最大件数。 */
export const maxCommandHistoryEntries = 100;

/** Chrome root nodeをcurrent directoryとして扱う内部ID。 */
export const rootCurrentDirectoryBookmarkId = "0";

/** 初期状態で使う未保存日時。 */
const emptyTimestamp = "";

/** 空文字。 */
const emptyString = "";

/** 配列先頭index。 */
const firstArrayIndex = 0;

/** 1件を表す数値。 */
const singleItemCount = 1;

/** Powerline形式のprompt style。 */
const powerlinePromptStyle = "powerline";

/** 拡張機能の保存済み現在ディレクトリ。 */
export interface PersistedCurrentDirectory {
  /** Chrome Bookmark Manager上のfolder ID。 */
  readonly bookmarkId: string;
  /** 表示とfallbackに使うfolder path。 */
  readonly folderPath: CurrentDirectory;
  /** 更新日時ISO文字列。 */
  readonly updatedAt: string;
}

/** 保存済みcommand history entry。 */
export interface CommandHistoryEntry {
  /** 入力されたcommand文字列。 */
  readonly input: string;
  /** 実行日時ISO文字列。 */
  readonly executedAt: string;
}

/** Bookmark IDごとの仮想タグ一覧。 */
export type VirtualTagsByBookmarkId = Readonly<Record<string, readonly string[]>>;

/** Bookmark IDごとの利用統計。 */
export type UsageByBookmarkId = Readonly<Record<string, BookmarkUsage>>;

/** Bookmark利用統計。 */
export interface BookmarkUsage {
  /** 疑似CLIから開いた回数。 */
  readonly openCount: number;
  /** 疑似CLIから最後に開いた日時ISO文字列。 */
  readonly lastOpenedAt: string;
}

/** Prompt表示style。 */
export type PromptStyle = "plain" | "powerline";

/** 拡張機能の保存済み設定。 */
export interface ExtensionSettings {
  /** Nerd Font互換iconを優先するか。 */
  readonly preferNerdFont: boolean;
  /** CLI promptの表示style。 */
  readonly promptStyle: PromptStyle;
}

/** 拡張機能がchrome.storage.localへ保存する状態。 */
export interface ExtensionState {
  /** 保存データschema version。 */
  readonly schemaVersion: typeof currentExtensionStateSchemaVersion;
  /** 保存済み現在ディレクトリ。 */
  readonly currentDirectory: PersistedCurrentDirectory;
  /** 入力履歴。 */
  readonly commandHistory: readonly CommandHistoryEntry[];
  /** Bookmark IDごとの仮想タグ一覧。 */
  readonly virtualTagsByBookmarkId: VirtualTagsByBookmarkId;
  /** Bookmark IDごとの利用統計。 */
  readonly usageByBookmarkId: UsageByBookmarkId;
  /** 拡張機能設定。 */
  readonly settings: ExtensionSettings;
}

/**
 * 保存済み現在ディレクトリを作成。
 * @param {string} bookmarkId Chrome Bookmark Manager上のfolder ID。
 * @param {CurrentDirectory} folderPath folder path。
 * @param {string} updatedAt 更新日時ISO文字列。
 * @returns {PersistedCurrentDirectory} 保存済み現在ディレクトリ。
 */
export const createPersistedCurrentDirectory = (
  bookmarkId: string,
  folderPath: CurrentDirectory,
  updatedAt: string,
): PersistedCurrentDirectory => ({
  bookmarkId,
  folderPath,
  updatedAt,
});

/**
 * 初期拡張状態を作成。
 * @returns {ExtensionState} 初期拡張状態。
 */
export const createInitialExtensionState = (): ExtensionState => ({
  commandHistory: [],
  currentDirectory: createPersistedCurrentDirectory(
    rootCurrentDirectoryBookmarkId,
    "/",
    emptyTimestamp,
  ),
  schemaVersion: currentExtensionStateSchemaVersion,
  settings: {
    preferNerdFont: false,
    promptStyle: powerlinePromptStyle,
  },
  usageByBookmarkId: {},
  virtualTagsByBookmarkId: {},
});

/**
 * 入力が保存可能なcommand historyかを判定。
 * @param {string} input 入力文字列。
 * @returns {boolean} 保存可能ならtrue。
 */
const isStorableCommandInput = (input: string): boolean => input.trim() !== emptyString;

/**
 * 直前のcommand history entryを取得。
 * @param {readonly CommandHistoryEntry[]} commandHistory command history一覧。
 * @returns {CommandHistoryEntry | undefined} 直前のentry。
 */
const getLastCommandHistoryEntry = (
  commandHistory: readonly CommandHistoryEntry[],
): CommandHistoryEntry | undefined => commandHistory[commandHistory.length - singleItemCount];

/**
 * 連続重複するcommandかを判定。
 * @param {readonly CommandHistoryEntry[]} commandHistory command history一覧。
 * @param {string} input 入力文字列。
 * @returns {boolean} 連続重複ならtrue。
 */
const isConsecutiveDuplicatedCommand = (
  commandHistory: readonly CommandHistoryEntry[],
  input: string,
): boolean => getLastCommandHistoryEntry(commandHistory)?.input === input;

/**
 * Command historyを最大件数へ丸める。
 * @param {readonly CommandHistoryEntry[]} commandHistory command history一覧。
 * @returns {readonly CommandHistoryEntry[]} 最大件数へ丸めたcommand history。
 */
const trimCommandHistory = (
  commandHistory: readonly CommandHistoryEntry[],
): readonly CommandHistoryEntry[] =>
  commandHistory.slice(Math.max(firstArrayIndex, commandHistory.length - maxCommandHistoryEntries));

/**
 * Command historyへ入力を追加。
 * @param {ExtensionState} state 現在の拡張状態。
 * @param {string} input 入力文字列。
 * @param {string} executedAt 実行日時ISO文字列。
 * @returns {ExtensionState} command history更新後の拡張状態。
 */
export const appendCommandHistory = (
  state: ExtensionState,
  input: string,
  executedAt: string,
): ExtensionState => {
  const normalizedInput = input.trim();

  if (
    !isStorableCommandInput(normalizedInput) ||
    isConsecutiveDuplicatedCommand(state.commandHistory, normalizedInput)
  ) {
    return state;
  }

  return {
    ...state,
    commandHistory: trimCommandHistory([
      ...state.commandHistory,
      { executedAt, input: normalizedInput },
    ]),
  };
};
