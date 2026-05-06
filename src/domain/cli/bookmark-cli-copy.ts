import type { BookmarkCliEntry } from "./bookmark-cli-entry";
import { joinFolderPath } from "../bookmarks/folder-path";

/**
 * Copy対象の値種別です。
 */
export type BookmarkCliCopyValueKind = "default" | "path" | "title" | "url";

/**
 * Copy text解決成功です。
 */
export interface CopyTextFound {
  /** 解決成功です。 */
  readonly ok: true;
  /** Copyする値です。 */
  readonly text: string;
}

/**
 * Copy text解決失敗です。
 */
export interface CopyTextMissing {
  /** 解決失敗です。 */
  readonly ok: false;
}

/**
 * Copy text解決結果です。
 */
export type CopyTextResolution = CopyTextFound | CopyTextMissing;

/**
 * EntryがURLを持つかを判定します。
 * @param {BookmarkCliEntry} entry 判定対象entryです。
 * @returns {boolean} URLを持つならtrueです。
 */
const hasEntryUrl = (
  entry: BookmarkCliEntry,
): entry is BookmarkCliEntry & { readonly url: string } =>
  typeof entry.url === "string" && entry.url !== "";

/**
 * EntryのCLI pathを作ります。
 * @param {BookmarkCliEntry} entry 対象entryです。
 * @returns {string} CLI pathです。
 * @example
 * ```ts
 * const path = createBookmarkCliEntryPath(entry);
 * ```
 */
export const createBookmarkCliEntryPath = (entry: BookmarkCliEntry): string => {
  if (entry.kind === "folder") {
    return entry.folderPath;
  }

  return joinFolderPath(entry.folderPath, entry.title);
};

/**
 * Copy text成功結果を作ります。
 * @param {string} text Copyする値です。
 * @returns {CopyTextResolution} Copy text解決結果です。
 */
const createCopyTextFound = (text: string): CopyTextResolution => ({
  ok: true,
  text,
});

/**
 * URL copy textを解決します。
 * @param {BookmarkCliEntry} entry 対象entryです。
 * @returns {CopyTextResolution} Copy text解決結果です。
 */
const resolveUrlCopyText = (entry: BookmarkCliEntry): CopyTextResolution => {
  if (!hasEntryUrl(entry)) {
    return { ok: false };
  }

  return createCopyTextFound(entry.url);
};

/**
 * Entryからcopy textを解決します。
 * @param {BookmarkCliEntry} entry 対象entryです。
 * @param {CopyBookmarkValueKind} valueKind Copyする値種別です。
 * @returns {CopyTextResolution} Copy text解決結果です。
 * @example
 * ```ts
 * const result = resolveBookmarkCliEntryCopyText(entry, "default");
 * ```
 */
export const resolveBookmarkCliEntryCopyText = (
  entry: BookmarkCliEntry,
  valueKind: BookmarkCliCopyValueKind,
): CopyTextResolution => {
  if (valueKind === "title") {
    return createCopyTextFound(entry.title);
  }

  if (valueKind === "path") {
    return createCopyTextFound(createBookmarkCliEntryPath(entry));
  }

  if (valueKind === "url") {
    return resolveUrlCopyText(entry);
  }

  if (hasEntryUrl(entry)) {
    return createCopyTextFound(entry.url);
  }

  return createCopyTextFound(createBookmarkCliEntryPath(entry));
};
