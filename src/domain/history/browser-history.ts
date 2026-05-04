import type { FolderPath } from "../bookmarks/folder-path";

/** Chrome履歴を表示する仮想folder path。 */
export const browserHistoryFolderPath = "/History" as const satisfies FolderPath;

/** Chrome履歴entryの親ID。 */
const browserHistoryParentId = "history";

/** Chrome履歴entryの子要素数。 */
const browserHistoryChildrenCount = 0;

/** History itemの数値未指定時の初期値。 */
const defaultHistoryNumber = 0;

/**
 * Chrome History API由来のitem。
 * @see https://developer.chrome.com/docs/extensions/reference/api/history#type-HistoryItem
 */
export interface RawBrowserHistoryItem {
  /** Chrome History API上のID。 */
  readonly id: string;
  /** 最終訪問日時。epoch milliseconds。 */
  readonly lastVisitTime?: number;
  /** 表示title。 */
  readonly title?: string;
  /** アドレスバー入力で開いた回数。 */
  readonly typedCount?: number;
  /** 訪問URL。 */
  readonly url?: string;
  /** 訪問回数。 */
  readonly visitCount?: number;
}

/** 疑似CLIで扱うChrome履歴entry。 */
export interface BrowserHistoryEntry {
  /** 子要素数。 */
  readonly childrenCount: typeof browserHistoryChildrenCount;
  /** 疑似CLI上の仮想folder path。 */
  readonly folderPath: typeof browserHistoryFolderPath;
  /** Chrome History API上のID。 */
  readonly id: string;
  /** Entry種別。 */
  readonly kind: "history";
  /** 最終訪問日時。epoch milliseconds。 */
  readonly lastVisitTime: number;
  /** 仮想親ID。 */
  readonly parentId: typeof browserHistoryParentId;
  /** 表示title。 */
  readonly title: string;
  /** アドレスバー入力で開いた回数。 */
  readonly typedCount: number;
  /** 訪問URL。 */
  readonly url: string;
  /** 訪問回数。 */
  readonly visitCount: number;
}

/** 正規化できないHistory itemの戻り値。 */
const invalidHistoryEntry = false;

/**
 * History itemがURLを持つかを判定。
 * @param {RawBrowserHistoryItem} item 判定対象item。
 * @returns {boolean} URLを持つならtrue。
 */
const hasHistoryUrl = (
  item: RawBrowserHistoryItem,
): item is RawBrowserHistoryItem & { readonly url: string } => typeof item.url === "string";

/**
 * History itemのtitleを取得。
 * @param {RawBrowserHistoryItem & { readonly url: string }} item History item。
 * @returns {string} 表示title。
 */
const getHistoryTitle = (item: RawBrowserHistoryItem & { readonly url: string }): string => {
  const title = item.title?.trim();

  if (typeof title === "string" && title !== "") {
    return title;
  }

  return item.url;
};

/**
 * History itemの数値を取得。
 * @param {number | undefined} value History itemの数値。
 * @returns {number} 正規化済み数値。
 */
const getHistoryNumber = (value: number | undefined): number => value ?? defaultHistoryNumber;

/**
 * Chrome History API itemをCLI entryへ正規化。
 * @param {RawBrowserHistoryItem} item Chrome History API item。
 * @returns {BrowserHistoryEntry | false} 正規化済みentry。URLがなければfalse。
 */
const normalizeBrowserHistoryItem = (
  item: RawBrowserHistoryItem,
): BrowserHistoryEntry | typeof invalidHistoryEntry => {
  if (!hasHistoryUrl(item)) {
    return invalidHistoryEntry;
  }

  return {
    childrenCount: browserHistoryChildrenCount,
    folderPath: browserHistoryFolderPath,
    id: item.id,
    kind: "history",
    lastVisitTime: getHistoryNumber(item.lastVisitTime),
    parentId: browserHistoryParentId,
    title: getHistoryTitle(item),
    typedCount: getHistoryNumber(item.typedCount),
    url: item.url,
    visitCount: getHistoryNumber(item.visitCount),
  };
};

/**
 * Chrome History API item一覧をCLI entry一覧へ正規化。
 * @param {readonly RawBrowserHistoryItem[]} items Chrome History API item一覧。
 * @returns {readonly BrowserHistoryEntry[]} 正規化済みChrome履歴entry一覧。
 * @example
 * ```ts
 * const result = normalizeBrowserHistoryItems(items);
 * ```
 */
export const normalizeBrowserHistoryItems = (
  items: readonly RawBrowserHistoryItem[],
): readonly BrowserHistoryEntry[] =>
  items.flatMap((item) => {
    const entry = normalizeBrowserHistoryItem(item);

    if (entry === false) {
      return [];
    }

    return [entry];
  });
