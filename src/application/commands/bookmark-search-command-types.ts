/**
 * Find commandです。
 */
export interface FindBookmarkCommand {
  /**
   * Debug情報を表示するかです。
   */
  readonly debug: boolean;
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
   * Debug情報を表示するかです。
   */
  readonly debug: boolean;
  /**
   * Command種別です。
   */
  readonly kind: "go";
  /**
   * 検索queryです。
   */
  readonly query: string;
}
