/**
 * Find commandです。
 */
export interface FindBookmarkCommand {
  /**
   * 詳細情報を表示するかです。
   */
  readonly long: boolean;
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
   * 詳細情報を表示するかです。
   */
  readonly long: boolean;
  /**
   * Command種別です。
   */
  readonly kind: "go";
  /**
   * 検索queryです。
   */
  readonly query: string;
}
