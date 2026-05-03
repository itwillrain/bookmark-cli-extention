import type { ExtensionState, VirtualTagsByBookmarkId } from "../storage/extension-state";
import type { BookmarkEntry } from "../bookmarks/bookmark-tree";

/** 仮想タグ名。 */
export type VirtualTag = string;

/** 空文字。 */
const emptyString = "";

/** 1件もない仮想タグ一覧。 */
const emptyVirtualTags = [] as const satisfies readonly VirtualTag[];

/** 1件もない仮想タグrecord。 */
const emptyVirtualTagsByBookmarkId = {} as const satisfies VirtualTagsByBookmarkId;

/** 空件数。 */
const emptyCount = 0;

/** Tuple先頭index。 */
const firstTupleItemIndex = 0;

/** Query token区切り正規表現。 */
const queryTokenSeparatorPattern = /\s+/gu;

/** Query token結合文字。 */
const queryTokenJoiner = " ";

/** Tag query prefix。 */
const virtualTagQueryPrefix = "#";

/** Tag先頭prefixを取り除く正規表現。 */
const leadingVirtualTagPrefixPattern = /^#+/u;

/** 仮想タグ検索query。 */
export interface VirtualTagSearchQuery {
  /** 検索本文。 */
  readonly textQuery: string;
  /** 検索対象の仮想タグ一覧。 */
  readonly tags: readonly VirtualTag[];
}

/**
 * 仮想タグ名を正規化。
 * @param {string} tagInput 入力された仮想タグ名。
 * @returns {VirtualTag} 正規化済み仮想タグ名。
 */
export const normalizeVirtualTag = (tagInput: string): VirtualTag =>
  tagInput.trim().replace(leadingVirtualTagPrefixPattern, emptyString).toLowerCase();

/**
 * 空ではない仮想タグかを判定。
 * @param {VirtualTag} tag 判定対象の仮想タグ。
 * @returns {boolean} 空ではなければtrue。
 */
const isNonEmptyVirtualTag = (tag: VirtualTag): boolean => tag !== emptyString;

/**
 * 重複を除いた仮想タグ一覧を作成。
 * @param {readonly VirtualTag[]} tags 仮想タグ一覧。
 * @returns {readonly VirtualTag[]} 重複除去済み仮想タグ一覧。
 */
const uniqueVirtualTags = (tags: readonly VirtualTag[]): readonly VirtualTag[] => [
  ...new Set(tags),
];

/**
 * 仮想タグ入力一覧を正規化。
 * @param {readonly string[]} tagInputs 入力された仮想タグ一覧。
 * @returns {readonly VirtualTag[]} 正規化済み仮想タグ一覧。
 */
export const normalizeVirtualTags = (tagInputs: readonly string[]): readonly VirtualTag[] =>
  uniqueVirtualTags(tagInputs.map((tagInput) => normalizeVirtualTag(tagInput))).filter((tag) =>
    isNonEmptyVirtualTag(tag),
  );

/**
 * Bookmark IDに紐づく仮想タグ一覧を取得。
 * @param {VirtualTagsByBookmarkId} virtualTagsByBookmarkId Bookmark ID別仮想タグ。
 * @param {string} bookmarkId Bookmark ID。
 * @returns {readonly VirtualTag[]} Bookmarkの仮想タグ一覧。
 */
export const getVirtualTagsForBookmark = (
  virtualTagsByBookmarkId: VirtualTagsByBookmarkId,
  bookmarkId: string,
): readonly VirtualTag[] => virtualTagsByBookmarkId[bookmarkId] ?? emptyVirtualTags;

/**
 * Bookmark IDのkeyだけをrecordから取り除く。
 * @param {VirtualTagsByBookmarkId} virtualTagsByBookmarkId Bookmark ID別仮想タグ。
 * @param {string} bookmarkId 取り除くBookmark ID。
 * @returns {VirtualTagsByBookmarkId} Bookmark ID削除後のrecord。
 */
const removeVirtualTagsRecordKey = (
  virtualTagsByBookmarkId: VirtualTagsByBookmarkId,
  bookmarkId: string,
): VirtualTagsByBookmarkId => {
  const keptEntries: [string, readonly VirtualTag[]][] = [];

  for (const entry of Object.entries(virtualTagsByBookmarkId)) {
    if (entry[firstTupleItemIndex] !== bookmarkId) {
      keptEntries.push(entry);
    }
  }

  return Object.fromEntries(keptEntries);
};

/**
 * Bookmarkへ仮想タグを追加。
 * @param {ExtensionState} state 現在の拡張状態。
 * @param {string} bookmarkId 対象Bookmark ID。
 * @param {readonly string[]} tagInputs 追加する仮想タグ入力。
 * @returns {ExtensionState} 仮想タグ追加後の拡張状態。
 */
export const addVirtualTagsToBookmark = (
  state: ExtensionState,
  bookmarkId: string,
  tagInputs: readonly string[],
): ExtensionState => {
  const tags = normalizeVirtualTags(tagInputs);

  if (tags.length === emptyCount) {
    return state;
  }

  return {
    ...state,
    virtualTagsByBookmarkId: {
      ...state.virtualTagsByBookmarkId,
      [bookmarkId]: uniqueVirtualTags([
        ...getVirtualTagsForBookmark(state.virtualTagsByBookmarkId, bookmarkId),
        ...tags,
      ]),
    },
  };
};

/**
 * Bookmarkから仮想タグを削除。
 * @param {ExtensionState} state 現在の拡張状態。
 * @param {string} bookmarkId 対象Bookmark ID。
 * @param {readonly string[]} tagInputs 削除する仮想タグ入力。
 * @returns {ExtensionState} 仮想タグ削除後の拡張状態。
 */
export const removeVirtualTagsFromBookmark = (
  state: ExtensionState,
  bookmarkId: string,
  tagInputs: readonly string[],
): ExtensionState => {
  const tagsToRemove = normalizeVirtualTags(tagInputs);
  const currentTags = getVirtualTagsForBookmark(state.virtualTagsByBookmarkId, bookmarkId);
  const nextTags = currentTags.filter((tag) => !tagsToRemove.includes(tag));

  if (nextTags.length === emptyCount) {
    return {
      ...state,
      virtualTagsByBookmarkId: removeVirtualTagsRecordKey(
        state.virtualTagsByBookmarkId,
        bookmarkId,
      ),
    };
  }

  return {
    ...state,
    virtualTagsByBookmarkId: {
      ...state.virtualTagsByBookmarkId,
      [bookmarkId]: nextTags,
    },
  };
};

/**
 * Query tokenが仮想タグ指定かを判定。
 * @param {string} token Query token。
 * @returns {boolean} 仮想タグ指定ならtrue。
 */
const isVirtualTagQueryToken = (token: string): boolean =>
  token.startsWith(virtualTagQueryPrefix) && isNonEmptyVirtualTag(normalizeVirtualTag(token));

/**
 * Query文字列をtokenへ分解。
 * @param {string} query Query文字列。
 * @returns {readonly string[]} Query token一覧。
 */
const tokenizeSearchQuery = (query: string): readonly string[] =>
  query
    .trim()
    .split(queryTokenSeparatorPattern)
    .filter((token) => token !== emptyString);

/**
 * 仮想タグ検索queryを解析。
 * @param {string} query 検索query。
 * @returns {VirtualTagSearchQuery} 仮想タグ検索query。
 */
export const parseVirtualTagSearchQuery = (query: string): VirtualTagSearchQuery => {
  const tokens = tokenizeSearchQuery(query);

  return {
    tags: normalizeVirtualTags(tokens.filter((token) => isVirtualTagQueryToken(token))),
    textQuery: tokens.filter((token) => !isVirtualTagQueryToken(token)).join(queryTokenJoiner),
  };
};

/**
 * 仮想タグ検索条件を持つかを判定。
 * @param {VirtualTagSearchQuery} query 仮想タグ検索query。
 * @returns {boolean} 仮想タグ条件があればtrue。
 */
export const hasVirtualTagFilters = (query: VirtualTagSearchQuery): boolean =>
  query.tags.length > emptyCount;

/**
 * Bookmark Entryが指定された仮想タグをすべて持つかを判定。
 * @param {BookmarkEntry} entry Bookmark Entry。
 * @param {VirtualTagsByBookmarkId} virtualTagsByBookmarkId Bookmark ID別仮想タグ。
 * @param {readonly VirtualTag[]} tags 必須仮想タグ一覧。
 * @returns {boolean} すべて持っていればtrue。
 */
export const entryMatchesVirtualTags = (
  entry: BookmarkEntry,
  virtualTagsByBookmarkId: VirtualTagsByBookmarkId,
  tags: readonly VirtualTag[],
): boolean => {
  if (tags.length === emptyCount) {
    return true;
  }

  if (entry.kind !== "bookmark") {
    return false;
  }

  const entryTags = getVirtualTagsForBookmark(virtualTagsByBookmarkId, entry.id);

  return tags.every((tag) => entryTags.includes(tag));
};

/**
 * Bookmark Entry一覧を仮想タグ条件で絞り込み。
 * @param {readonly BookmarkEntry[]} entries Bookmark Entry一覧。
 * @param {VirtualTagsByBookmarkId} virtualTagsByBookmarkId Bookmark ID別仮想タグ。
 * @param {readonly VirtualTag[]} tags 必須仮想タグ一覧。
 * @returns {readonly BookmarkEntry[]} 絞り込み後のBookmark Entry一覧。
 */
export const filterEntriesByVirtualTags = (
  entries: readonly BookmarkEntry[],
  virtualTagsByBookmarkId: VirtualTagsByBookmarkId,
  tags: readonly VirtualTag[],
): readonly BookmarkEntry[] =>
  entries.filter((entry) => entryMatchesVirtualTags(entry, virtualTagsByBookmarkId, tags));

/**
 * 未指定の仮想タグrecordを空recordへ補正。
 * @param {VirtualTagsByBookmarkId | undefined} virtualTagsByBookmarkId Bookmark ID別仮想タグ。
 * @returns {VirtualTagsByBookmarkId} Bookmark ID別仮想タグ。
 */
export const normalizeVirtualTagsByBookmarkId = (
  virtualTagsByBookmarkId?: VirtualTagsByBookmarkId,
): VirtualTagsByBookmarkId => virtualTagsByBookmarkId ?? emptyVirtualTagsByBookmarkId;
