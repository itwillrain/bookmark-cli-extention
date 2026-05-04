/** Recently opened Bookmark command。 */
export interface RecentBookmarksCommand {
  /** Command種別。 */
  readonly kind: "recent";
  /** 表示件数。 */
  readonly limit?: number;
}

/** Frequently opened Bookmark command。 */
export interface FrequentBookmarksCommand {
  /** Command種別。 */
  readonly kind: "freq";
  /** 表示件数。 */
  readonly limit?: number;
}

/** Chrome閲覧履歴一覧command。 */
export interface BrowserHistoryCommand {
  /** Command種別。 */
  readonly kind: "history";
  /** 表示件数。 */
  readonly limit?: number;
  /** Chrome履歴検索query。 */
  readonly query: string;
}
