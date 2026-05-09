import type { BookmarkEntry, BookmarkTree } from "./bookmark-tree";

/** Bookmark診断種別です。 */
export type BookmarkDiagnosticKind = "duplicate_title" | "duplicate_url" | "empty_title";

/** Bookmark診断で実行するcheck一覧です。 */
export interface BookmarkDiagnosticChecks {
  /** 同じtitleを持つBookmarkを検出するかです。 */
  readonly duplicateTitle: boolean;
  /** 同じURLを持つBookmarkを検出するかです。 */
  readonly duplicateUrl: boolean;
  /** 空titleのBookmarkを検出するかです。 */
  readonly emptyTitle: boolean;
}

/** Bookmark診断入力です。 */
export interface FindBookmarkDiagnosticsInput {
  /** 診断対象のBookmark Treeです。 */
  readonly bookmarkTree: BookmarkTree;
  /** 実行する診断checkです。 */
  readonly checks: BookmarkDiagnosticChecks;
}

/** Bookmark診断結果です。 */
export interface BookmarkDiagnosticIssue {
  /** 診断対象Bookmarkです。 */
  readonly entry: BookmarkEntry;
  /** 同一groupを表すkeyです。 */
  readonly groupKey: string;
  /** 同一groupに含まれるBookmark数です。 */
  readonly groupSize: number;
  /** 診断種別です。 */
  readonly kind: BookmarkDiagnosticKind;
}

/** 空title診断のgroup keyです。 */
const emptyTitleGroupKey = "empty-title";

/** 単独issueのgroup sizeです。 */
const singleIssueGroupSize = 1;

/** 空文字です。 */
const emptyString = "";

/**
 * Bookmark titleを診断用に正規化します。
 * @param {string} title Bookmark titleです。
 * @returns {string} 正規化済みtitleです。
 */
const normalizeTitleKey = (title: string): string => title.trim().toLowerCase();

/**
 * Bookmark URLを診断用に正規化します。
 * @param {string | undefined} url Bookmark URLです。
 * @returns {string} 正規化済みURLです。
 */
const normalizeUrlKey = (url: string | undefined): string => url?.trim() ?? emptyString;

/**
 * Bookmarkが空titleかを判定します。
 * @param {BookmarkEntry} bookmark 判定対象Bookmarkです。
 * @returns {boolean} 空titleならtrueです。
 */
const hasEmptyTitle = (bookmark: BookmarkEntry): boolean =>
  normalizeTitleKey(bookmark.title) === emptyString;

/**
 * 空title診断結果を作ります。
 * @param {BookmarkEntry} bookmark 診断対象Bookmarkです。
 * @returns {BookmarkDiagnosticIssue} 空title診断結果です。
 */
const createEmptyTitleIssue = (bookmark: BookmarkEntry): BookmarkDiagnosticIssue => ({
  entry: bookmark,
  groupKey: emptyTitleGroupKey,
  groupSize: singleIssueGroupSize,
  kind: "empty_title",
});

/**
 * 空title診断結果一覧を作ります。
 * @param {readonly BookmarkEntry[]} bookmarks 診断対象Bookmark一覧です。
 * @returns {readonly BookmarkDiagnosticIssue[]} 空title診断結果一覧です。
 */
const findEmptyTitleIssues = (
  bookmarks: readonly BookmarkEntry[],
): readonly BookmarkDiagnosticIssue[] =>
  bookmarks
    .filter((bookmark) => hasEmptyTitle(bookmark))
    .map((bookmark) => createEmptyTitleIssue(bookmark));

/**
 * Bookmarkをgroup keyごとにまとめます。
 * @param {readonly BookmarkEntry[]} bookmarks 診断対象Bookmark一覧です。
 * @param {(bookmark: BookmarkEntry) => string} createGroupKey group key作成関数です。
 * @returns {ReadonlyMap<string, readonly BookmarkEntry[]>} Bookmark group一覧です。
 */
const groupBookmarksByKey = (
  bookmarks: readonly BookmarkEntry[],
  createGroupKey: (bookmark: BookmarkEntry) => string,
): ReadonlyMap<string, readonly BookmarkEntry[]> => {
  const groups = new Map<string, BookmarkEntry[]>();

  for (const bookmark of bookmarks) {
    const groupKey = createGroupKey(bookmark);

    if (groupKey !== emptyString) {
      groups.set(groupKey, [...(groups.get(groupKey) ?? []), bookmark]);
    }
  }

  return groups;
};

/**
 * 重複groupかを判定します。
 * @param {readonly BookmarkEntry[]} group Bookmark groupです。
 * @returns {boolean} 重複groupならtrueです。
 */
const isDuplicateGroup = (group: readonly BookmarkEntry[]): boolean =>
  group.length > singleIssueGroupSize;

/**
 * 重複診断結果を作ります。
 * @param {BookmarkDiagnosticKind} kind 診断種別です。
 * @param {string} groupKey group keyです。
 * @param {readonly BookmarkEntry[]} group Bookmark groupです。
 * @returns {readonly BookmarkDiagnosticIssue[]} 重複診断結果一覧です。
 */
const createDuplicateIssues = (
  kind: BookmarkDiagnosticKind,
  groupKey: string,
  group: readonly BookmarkEntry[],
): readonly BookmarkDiagnosticIssue[] =>
  group.map((bookmark) => ({
    entry: bookmark,
    groupKey,
    groupSize: group.length,
    kind,
  }));

/**
 * 重複診断結果一覧を作ります。
 * @param {readonly BookmarkEntry[]} bookmarks 診断対象Bookmark一覧です。
 * @param {BookmarkDiagnosticKind} kind 診断種別です。
 * @param {(bookmark: BookmarkEntry) => string} createGroupKey group key作成関数です。
 * @returns {readonly BookmarkDiagnosticIssue[]} 重複診断結果一覧です。
 */
const findDuplicateIssues = (
  bookmarks: readonly BookmarkEntry[],
  kind: BookmarkDiagnosticKind,
  createGroupKey: (bookmark: BookmarkEntry) => string,
): readonly BookmarkDiagnosticIssue[] => {
  const issues: BookmarkDiagnosticIssue[] = [];

  for (const [groupKey, group] of groupBookmarksByKey(bookmarks, createGroupKey).entries()) {
    if (isDuplicateGroup(group)) {
      issues.push(...createDuplicateIssues(kind, groupKey, group));
    }
  }

  return issues;
};

/**
 * 有効な場合だけ空title診断結果を返します。
 * @param {FindBookmarkDiagnosticsInput} input Bookmark診断入力です。
 * @returns {readonly BookmarkDiagnosticIssue[]} 空title診断結果一覧です。
 */
const findEnabledEmptyTitleIssues = (
  input: FindBookmarkDiagnosticsInput,
): readonly BookmarkDiagnosticIssue[] => {
  if (!input.checks.emptyTitle) {
    return [];
  }

  return findEmptyTitleIssues(input.bookmarkTree.bookmarks);
};

/**
 * 有効な場合だけURL重複診断結果を返します。
 * @param {FindBookmarkDiagnosticsInput} input Bookmark診断入力です。
 * @returns {readonly BookmarkDiagnosticIssue[]} URL重複診断結果一覧です。
 */
const findEnabledDuplicateUrlIssues = (
  input: FindBookmarkDiagnosticsInput,
): readonly BookmarkDiagnosticIssue[] => {
  if (!input.checks.duplicateUrl) {
    return [];
  }

  return findDuplicateIssues(input.bookmarkTree.bookmarks, "duplicate_url", (bookmark) =>
    normalizeUrlKey(bookmark.url),
  );
};

/**
 * 有効な場合だけtitle重複診断結果を返します。
 * @param {FindBookmarkDiagnosticsInput} input Bookmark診断入力です。
 * @returns {readonly BookmarkDiagnosticIssue[]} Title重複診断結果一覧です。
 */
const findEnabledDuplicateTitleIssues = (
  input: FindBookmarkDiagnosticsInput,
): readonly BookmarkDiagnosticIssue[] => {
  if (!input.checks.duplicateTitle) {
    return [];
  }

  return findDuplicateIssues(input.bookmarkTree.bookmarks, "duplicate_title", (bookmark) =>
    normalizeTitleKey(bookmark.title),
  );
};

/**
 * 実行する診断checkに応じてBookmark診断結果を返します。
 * @param {FindBookmarkDiagnosticsInput} input Bookmark診断入力です。
 * @returns {readonly BookmarkDiagnosticIssue[]} Bookmark診断結果一覧です。
 * @example
 * ```ts
 * const issues = findBookmarkDiagnostics({
 *   bookmarkTree,
 *   checks: { duplicateTitle: false, duplicateUrl: true, emptyTitle: true },
 * });
 * ```
 */
export const findBookmarkDiagnostics = (
  input: FindBookmarkDiagnosticsInput,
): readonly BookmarkDiagnosticIssue[] => [
  ...findEnabledEmptyTitleIssues(input),
  ...findEnabledDuplicateUrlIssues(input),
  ...findEnabledDuplicateTitleIssues(input),
];
