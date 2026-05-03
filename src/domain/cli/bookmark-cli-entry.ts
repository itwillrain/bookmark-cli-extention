import type { BookmarkEntry } from "../bookmarks/bookmark-tree";
import type { BrowserHistoryEntry } from "../history/browser-history";

/** 疑似CLIの直前結果として番号指定できるentry。 */
export type BookmarkCliEntry = BookmarkEntry | BrowserHistoryEntry;
