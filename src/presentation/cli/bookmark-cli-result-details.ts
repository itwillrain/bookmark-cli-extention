import type {
  UsageByBookmarkId,
  VirtualTagsByBookmarkId,
} from "../../domain/storage/extension-state";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";

/** Bookmark entry詳細変換option。 */
export interface BookmarkCliResultDetailOptions {
  /** 詳細情報を表示するか。 */
  readonly long: boolean;
  /** Bookmark IDごとの利用統計。 */
  readonly usageByBookmarkId?: UsageByBookmarkId;
  /** Bookmark IDごとの仮想タグ一覧。 */
  readonly virtualTagsByBookmarkId?: VirtualTagsByBookmarkId;
}

/** Entry詳細tokenのid keyです。 */
const idDetailKey = "id";

/** Entry詳細tokenのparent keyです。 */
const parentDetailKey = "parent";

/** Entry詳細tokenのchildren keyです。 */
const childrenDetailKey = "children";

/** Entry詳細tokenのhost keyです。 */
const hostDetailKey = "host";

/** Entry詳細tokenのopened keyです。 */
const openedDetailKey = "opened";

/** Entry詳細tokenのlast keyです。 */
const lastDetailKey = "last";

/** Entry詳細tokenのtyped keyです。 */
const typedDetailKey = "typed";

/** Entry詳細tokenのvisits keyです。 */
const visitsDetailKey = "visits";

/** Entry詳細tokenの区切り文字です。 */
const detailTokenSeparator = "=";

/** Sliceの開始indexです。 */
const sliceStartIndex = 0;

/** ISO日付文字列の長さです。 */
const isoDateLength = 10;

/** 空のtoken一覧です。 */
const emptyDetailTokens = [] as const satisfies readonly string[];

/** 未設定扱いにするepoch millisecondsの最大値です。 */
const emptyEpochMilliseconds = 0;

/**
 * Entry詳細tokenを作ります。
 * @param {string} key 詳細keyです。
 * @param {string | number} value 詳細値です。
 * @returns {string} 詳細tokenです。
 */
const createEntryDetailToken = (key: string, value: string | number): string =>
  `${key}${detailTokenSeparator}${String(value)}`;

/**
 * URLからhost tokenを作ります。
 * @param {string | undefined} url URLです。
 * @returns {readonly string[]} host token一覧です。
 */
const createHostDetailTokens = (url: string | undefined): readonly string[] => {
  if (typeof url !== "string") {
    return emptyDetailTokens;
  }

  try {
    return [createEntryDetailToken(hostDetailKey, new URL(url).hostname)];
  } catch {
    return emptyDetailTokens;
  }
};

/**
 * ISO日時を日付token用文字列へ変換します。
 * @param {string} isoDateTime ISO日時です。
 * @returns {string} ISO日付です。
 */
const formatIsoDate = (isoDateTime: string): string =>
  isoDateTime.slice(sliceStartIndex, isoDateLength);

/**
 * Epoch millisecondsを日付token用文字列へ変換します。
 * @param {number} epochMilliseconds epoch millisecondsです。
 * @returns {string | false} ISO日付です。
 */
const formatEpochDate = (epochMilliseconds: number): string | false => {
  const timestamp = new Date(epochMilliseconds).getTime();

  if (Number.isNaN(timestamp) || timestamp <= emptyEpochMilliseconds) {
    return false;
  }

  return new Date(timestamp).toISOString().slice(sliceStartIndex, isoDateLength);
};

/**
 * Bookmarkの仮想タグtoken一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @param {VirtualTagsByBookmarkId | undefined} virtualTagsByBookmarkId Bookmark IDごとの仮想タグ一覧です。
 * @returns {readonly string[]} 仮想タグtoken一覧です。
 */
const createVirtualTagDetailTokens = (
  entry: BookmarkCliEntry,
  virtualTagsByBookmarkId: VirtualTagsByBookmarkId | undefined,
): readonly string[] => {
  if (entry.kind !== "bookmark") {
    return emptyDetailTokens;
  }

  return [...(virtualTagsByBookmarkId?.[entry.id] ?? emptyDetailTokens)]
    .toSorted()
    .map((tag) => `#${tag}`);
};

/**
 * Bookmark利用統計token一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @param {UsageByBookmarkId | undefined} usageByBookmarkId Bookmark IDごとの利用統計です。
 * @returns {readonly string[]} Bookmark利用統計token一覧です。
 */
const createBookmarkUsageDetailTokens = (
  entry: BookmarkCliEntry,
  usageByBookmarkId: UsageByBookmarkId | undefined,
): readonly string[] => {
  if (entry.kind !== "bookmark") {
    return emptyDetailTokens;
  }

  const usage = usageByBookmarkId?.[entry.id];

  if (typeof usage !== "object") {
    return emptyDetailTokens;
  }

  return [
    createEntryDetailToken(openedDetailKey, usage.openCount),
    createEntryDetailToken(lastDetailKey, formatIsoDate(usage.lastOpenedAt)),
  ];
};

/**
 * Chrome履歴固有の詳細token一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @returns {readonly string[]} Chrome履歴詳細token一覧です。
 */
const createHistoryDetailTokens = (entry: BookmarkCliEntry): readonly string[] => {
  if (entry.kind !== "history") {
    return emptyDetailTokens;
  }

  const lastVisitedAt = formatEpochDate(entry.lastVisitTime);
  const baseTokens = [
    createEntryDetailToken(visitsDetailKey, entry.visitCount),
    createEntryDetailToken(typedDetailKey, entry.typedCount),
  ];

  if (lastVisitedAt === false) {
    return baseTokens;
  }

  return [...baseTokens, createEntryDetailToken(lastDetailKey, lastVisitedAt)];
};

/**
 * Folderの子node数詳細token一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @returns {readonly string[]} 子node数詳細token一覧です。
 */
const createChildrenCountDetailTokens = (entry: BookmarkCliEntry): readonly string[] => {
  if (entry.kind !== "folder") {
    return emptyDetailTokens;
  }

  return [createEntryDetailToken(childrenDetailKey, entry.childrenCount)];
};

/**
 * Entry種別ごとの主要詳細token一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark CLI entryです。
 * @param {BookmarkCliResultDetailOptions} options Bookmark entry変換optionです。
 * @returns {readonly string[]} 主要詳細token一覧です。
 */
const createPrimaryEntryDetailTokens = (
  entry: BookmarkCliEntry,
  options: BookmarkCliResultDetailOptions,
): readonly string[] => [
  ...createChildrenCountDetailTokens(entry),
  ...createHostDetailTokens(entry.url),
  ...createVirtualTagDetailTokens(entry, options.virtualTagsByBookmarkId),
  ...createBookmarkUsageDetailTokens(entry, options.usageByBookmarkId),
  ...createHistoryDetailTokens(entry),
];

/**
 * Bookmark entryの内部詳細token一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark entryです。
 * @returns {readonly string[]} 内部詳細token一覧です。
 */
const createInternalEntryDetailTokens = (entry: BookmarkCliEntry): readonly string[] => [
  createEntryDetailToken(idDetailKey, entry.id),
  createEntryDetailToken(parentDetailKey, entry.parentId),
];

/**
 * Bookmark entryの詳細token一覧を作ります。
 * @param {BookmarkCliEntry} entry Bookmark entryです。
 * @param {BookmarkCliResultDetailOptions} options Bookmark entry変換optionです。
 * @returns {readonly string[]} 詳細token一覧です。
 */
export const createEntryDetailTokens = (
  entry: BookmarkCliEntry,
  options: BookmarkCliResultDetailOptions,
): readonly string[] => [
  ...createPrimaryEntryDetailTokens(entry, options),
  ...createInternalEntryDetailTokens(entry),
];
