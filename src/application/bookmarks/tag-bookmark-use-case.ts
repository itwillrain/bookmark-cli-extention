import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
} from "./bookmark-use-cases";
import {
  type VirtualTag,
  addVirtualTagsToBookmark,
  normalizeVirtualTags,
  removeVirtualTagsFromBookmark,
} from "../../domain/tags/virtual-tag";
import type { BookmarkCliEntry } from "../../domain/cli/bookmark-cli-entry";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { ExtensionState } from "../../domain/storage/extension-state";
import { resolveEntryByResultNumber } from "../../domain/bookmarks/result-selection";

/** 仮想タグ更新入力。 */
export interface TagBookmarkInput {
  /** 現在の拡張状態。 */
  readonly extensionState: ExtensionState;
  /** 直前結果一覧。 */
  readonly lastResultEntries: readonly BookmarkCliEntry[];
  /** 削除操作ならtrue。 */
  readonly remove: boolean;
  /** 仮想タグ入力一覧。 */
  readonly tagInputs: readonly string[];
  /** 直前結果番号入力。 */
  readonly targetInput: string;
}

/** 仮想タグ更新成功値。 */
export interface TagBookmarkValue {
  /** 更新対象Bookmark Entry。 */
  readonly entry: BookmarkEntry & { readonly kind: "bookmark"; readonly url: string };
  /** 更新後の拡張状態。 */
  readonly extensionState: ExtensionState;
  /** 更新対象の仮想タグ一覧。 */
  readonly tags: readonly VirtualTag[];
}

/** 候補未検出のエラーcode。 */
const notFoundErrorCode = "not_found";

/** 無効な仮想タグのエラーcode。 */
const invalidTagErrorCode = "invalid_tag";

/** 空件数。 */
const emptyCount = 0;

/**
 * 成功結果を作成。
 * @param {TValue} value 成功値。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果。
 */
const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * 対象未検出の失敗結果を作成。
 * @param {string} targetInput 対象入力。
 * @returns {BookmarkCommandFailure} 対象未検出の失敗結果。
 */
const createNotFoundFailure = (targetInput: string): BookmarkCommandFailure => ({
  errorCode: notFoundErrorCode,
  message: `Bookmark target was not found: ${targetInput}`,
  ok: false,
});

/**
 * 無効な仮想タグの失敗結果を作成。
 * @returns {BookmarkCommandFailure} 無効な仮想タグの失敗結果。
 */
const createInvalidTagFailure = (): BookmarkCommandFailure => ({
  errorCode: invalidTagErrorCode,
  message: "Virtual tag was not specified",
  ok: false,
});

/**
 * EntryがBookmarkかを判定。
 * @param {BookmarkCliEntry} entry 判定対象entry。
 * @returns {boolean} Bookmarkならtrue。
 */
const isBookmarkEntry = (
  entry: BookmarkCliEntry,
): entry is BookmarkEntry & { readonly kind: "bookmark"; readonly url: string } =>
  entry.kind === "bookmark" && typeof entry.url === "string";

/**
 * 直前結果番号からBookmarkを解決。
 * @param {TagBookmarkInput} input 仮想タグ更新入力。
 * @returns {BookmarkCommandResult<TagBookmarkValue["entry"]>} Bookmark解決結果。
 */
const resolveTargetBookmarkEntry = (
  input: TagBookmarkInput,
): BookmarkCommandResult<TagBookmarkValue["entry"]> => {
  const resolution = resolveEntryByResultNumber(input.lastResultEntries, input.targetInput);

  if (!resolution.ok || !isBookmarkEntry(resolution.entry)) {
    return createNotFoundFailure(input.targetInput);
  }

  return createSuccess(resolution.entry);
};

/**
 * 仮想タグ操作を拡張状態へ反映。
 * @param {TagBookmarkInput} input 仮想タグ更新入力。
 * @param {TagBookmarkValue["entry"]} entry 更新対象Bookmark。
 * @returns {ExtensionState} 更新後の拡張状態。
 */
const updateVirtualTags = (
  input: TagBookmarkInput,
  entry: TagBookmarkValue["entry"],
): ExtensionState => {
  if (input.remove) {
    return removeVirtualTagsFromBookmark(input.extensionState, entry.id, input.tagInputs);
  }

  return addVirtualTagsToBookmark(input.extensionState, entry.id, input.tagInputs);
};

/**
 * Bookmarkへ仮想タグを追加または削除。
 * @param {TagBookmarkInput} input 仮想タグ更新入力。
 * @returns {BookmarkCommandResult<TagBookmarkValue>} 仮想タグ更新結果。
 * @example
 * ```ts
 * const result = tagBookmark({
 *   extensionState,
 *   lastResultEntries,
 *   remove: false,
 *   tagInputs: ["#prod", "finance"],
 *   targetInput: "2",
 * });
 * ```
 */
export const tagBookmark = (input: TagBookmarkInput): BookmarkCommandResult<TagBookmarkValue> => {
  const tags = normalizeVirtualTags(input.tagInputs);

  if (tags.length === emptyCount) {
    return createInvalidTagFailure();
  }

  const entryResolution = resolveTargetBookmarkEntry(input);

  if (!entryResolution.ok) {
    return entryResolution;
  }

  return createSuccess({
    entry: entryResolution.value,
    extensionState: updateVirtualTags(input, entryResolution.value),
    tags,
  });
};
