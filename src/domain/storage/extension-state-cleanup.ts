import {
  type ExtensionState,
  type PersistedCurrentDirectory,
  createPersistedCurrentDirectory,
  rootCurrentDirectoryBookmarkId,
} from "./extension-state";
import type { BookmarkTree } from "../bookmarks/bookmark-tree";
import type { CurrentDirectory } from "../bookmarks/current-directory";

/** 現在ディレクトリ更新入力。 */
export interface UpdateCurrentDirectoryInput {
  /** 現在の拡張状態。 */
  readonly state: ExtensionState;
  /** Bookmark Tree。 */
  readonly bookmarkTree: BookmarkTree;
  /** 実行後の現在ディレクトリ。 */
  readonly currentDirectory: CurrentDirectory;
  /** 更新日時ISO文字列。 */
  readonly updatedAt: string;
}

/** 拡張状態掃除入力。 */
export interface SanitizeExtensionStateInput {
  /** 現在の拡張状態。 */
  readonly state: ExtensionState;
  /** Bookmark Tree。 */
  readonly bookmarkTree: BookmarkTree;
  /** 掃除時の更新日時ISO文字列。 */
  readonly updatedAt: string;
}

/**
 * Bookmark Treeからfolder pathに対応するfolder IDを取得。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} currentDirectory 現在ディレクトリ。
 * @returns {string} 対応するfolder ID。
 */
const resolveCurrentDirectoryBookmarkId = (
  bookmarkTree: BookmarkTree,
  currentDirectory: CurrentDirectory,
): string => {
  if (currentDirectory === "/") {
    return rootCurrentDirectoryBookmarkId;
  }

  return (
    bookmarkTree.folders.find((folder) => folder.folderPath === currentDirectory)?.id ??
    rootCurrentDirectoryBookmarkId
  );
};

/**
 * 現在ディレクトリを保存状態へ反映。
 * @param {UpdateCurrentDirectoryInput} input 現在ディレクトリ更新入力。
 * @returns {ExtensionState} 現在ディレクトリ更新後の拡張状態。
 */
export const updateCurrentDirectory = (input: UpdateCurrentDirectoryInput): ExtensionState => ({
  ...input.state,
  currentDirectory: createPersistedCurrentDirectory(
    resolveCurrentDirectoryBookmarkId(input.bookmarkTree, input.currentDirectory),
    input.currentDirectory,
    input.updatedAt,
  ),
});

/**
 * 現在ディレクトリのfolder IDがBookmark Tree内で有効かを判定。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {PersistedCurrentDirectory} currentDirectory 保存済み現在ディレクトリ。
 * @returns {boolean} 有効ならtrue。
 */
const isPersistedCurrentDirectoryValid = (
  bookmarkTree: BookmarkTree,
  currentDirectory: PersistedCurrentDirectory,
): boolean =>
  currentDirectory.bookmarkId === rootCurrentDirectoryBookmarkId ||
  bookmarkTree.folders.some((folder) => folder.id === currentDirectory.bookmarkId);

/**
 * 保存済み現在ディレクトリを現在のBookmark Treeへ合わせる。
 * @param {ExtensionState} state 現在の拡張状態。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {string} updatedAt 更新日時ISO文字列。
 * @returns {PersistedCurrentDirectory} 掃除後の保存済み現在ディレクトリ。
 */
const sanitizeCurrentDirectory = (
  state: ExtensionState,
  bookmarkTree: BookmarkTree,
  updatedAt: string,
): PersistedCurrentDirectory => {
  if (isPersistedCurrentDirectoryValid(bookmarkTree, state.currentDirectory)) {
    return state.currentDirectory;
  }

  return createPersistedCurrentDirectory(rootCurrentDirectoryBookmarkId, "/", updatedAt);
};

/**
 * Bookmark Tree内に存在するBookmark ID一覧を作成。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @returns {readonly string[]} Bookmark ID一覧。
 */
const createExistingBookmarkIds = (bookmarkTree: BookmarkTree): readonly string[] =>
  bookmarkTree.bookmarks.map((bookmark) => bookmark.id);

/**
 * Bookmark IDが存在するかを判定。
 * @param {readonly string[]} bookmarkIds Bookmark ID一覧。
 * @param {string} bookmarkId 判定対象Bookmark ID。
 * @returns {boolean} 存在するならtrue。
 */
const includesBookmarkId = (bookmarkIds: readonly string[], bookmarkId: string): boolean =>
  bookmarkIds.includes(bookmarkId);

/**
 * 有効なBookmark IDのrecord項目だけを残す。
 * @param {Readonly<Record<string, TValue>>} record 掃除対象record。
 * @param {readonly string[]} existingBookmarkIds 有効なBookmark ID一覧。
 * @returns {Readonly<Record<string, TValue>>} 掃除後record。
 */
const keepExistingBookmarkRecordEntries = <TValue>(
  record: Readonly<Record<string, TValue>>,
  existingBookmarkIds: readonly string[],
): Readonly<Record<string, TValue>> => {
  const entries = Object.entries(record);
  const keptEntries: [string, TValue][] = [];

  for (const entry of entries) {
    const [bookmarkId, value] = entry;

    if (includesBookmarkId(existingBookmarkIds, bookmarkId)) {
      keptEntries.push([bookmarkId, value]);
    }
  }

  return Object.fromEntries(keptEntries);
};

/**
 * Bookmark Treeと照合して拡張状態を掃除。
 * @param {SanitizeExtensionStateInput} input 拡張状態掃除入力。
 * @returns {ExtensionState} 掃除後の拡張状態。
 */
export const sanitizeExtensionStateForBookmarkTree = (
  input: SanitizeExtensionStateInput,
): ExtensionState => {
  const existingBookmarkIds = createExistingBookmarkIds(input.bookmarkTree);

  return {
    ...input.state,
    currentDirectory: sanitizeCurrentDirectory(input.state, input.bookmarkTree, input.updatedAt),
    usageByBookmarkId: keepExistingBookmarkRecordEntries(
      input.state.usageByBookmarkId,
      existingBookmarkIds,
    ),
    virtualTagsByBookmarkId: keepExistingBookmarkRecordEntries(
      input.state.virtualTagsByBookmarkId,
      existingBookmarkIds,
    ),
  };
};
