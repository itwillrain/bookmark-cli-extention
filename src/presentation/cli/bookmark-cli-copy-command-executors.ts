import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import { createCommandState, createEmptyResultState } from "./bookmark-cli-state-builders";
import type { BookmarkCliResultItem } from "./components/bookmark-cli-screen";
import type { CopyBookmarkCommand } from "../../application/commands/bookmark-command-parser";
import { resolveBookmarkCliEntryCopyText } from "../../domain/cli/bookmark-cli-copy";
import { resolveEntryByResultNumber } from "../../domain/bookmarks/result-selection";

/** Clipboard未設定時のstatus textです。 */
const clipboardUnavailableStatusText = "Clipboard is unavailable";

/** Clipboard書き込み失敗時のstatus textです。 */
const clipboardWriteFailedStatusText = "Clipboard write failed";

/** Copy成功時のstatus textです。 */
const copiedStatusText = "Copied";

/** Copy output成功時のstatus textです。 */
const copiedOutputStatusText = "Copied output";

/** Copy対象未検出status prefixです。 */
const copyTargetNotFoundStatusPrefix = "Copy target was not found";

/** Copy値未検出status prefixです。 */
const copyValueNotFoundStatusPrefix = "Copy value was not found";

/** 空のresult item件数です。 */
const emptyResultItemCount = 0;

/** Result number表示offsetです。 */
const resultNumberOffset = 1;

/** Result item field separatorです。 */
const resultItemFieldSeparator = " | ";

/** 改行文字です。 */
const newline = "\n";

/**
 * Copy commandで解決したcopy textです。
 */
interface ResolvedCopyCommandText {
  /** 解決成功です。 */
  readonly ok: true;
  /** Clipboardへ書き込むtextです。 */
  readonly text: string;
}

/**
 * Copy commandの解決失敗です。
 */
interface MissingCopyCommandText {
  /** 解決失敗です。 */
  readonly ok: false;
  /** Status lineに表示するtextです。 */
  readonly statusText: string;
}

/** Copy commandのtext解決結果です。 */
type CopyCommandTextResolution = MissingCopyCommandText | ResolvedCopyCommandText;

/**
 * Clipboardへtextを書き込みます。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {string} text 書き込むtextです。
 * @returns {Promise<boolean>} 書き込み成功ならtrueです。
 */
const writeClipboardText = async (
  dependencies: BookmarkCliCommandDependencies,
  text: string,
): Promise<boolean> => {
  if (!dependencies.clipboard) {
    return false;
  }

  try {
    await dependencies.clipboard.writeText(text);

    return true;
  } catch {
    return false;
  }
};

/**
 * Copy target未検出のstatus textを作ります。
 * @param {string} targetInput target入力です。
 * @returns {string} status textです。
 */
const createCopyTargetNotFoundStatusText = (targetInput: string): string =>
  `${copyTargetNotFoundStatusPrefix}: ${targetInput}`;

/**
 * Copy value未検出のstatus textを作ります。
 * @param {CopyBookmarkCommand} command Copy commandです。
 * @returns {string} status textです。
 */
const createCopyValueNotFoundStatusText = (command: CopyBookmarkCommand): string =>
  `${copyValueNotFoundStatusPrefix}: ${command.valueKind}`;

/**
 * Copy commandで書き込むtextを解決します。
 * @param {CopyBookmarkCommand} command Copy commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {CopyCommandTextResolution} 解決結果です。
 */
const resolveCopyCommandText = (
  command: CopyBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): CopyCommandTextResolution => {
  const targetResolution = resolveEntryByResultNumber(
    dependencies.lastResultEntries,
    command.targetInput,
  );

  if (!targetResolution.ok) {
    return {
      ok: false,
      statusText: createCopyTargetNotFoundStatusText(command.targetInput),
    };
  }

  const copyTextResolution = resolveBookmarkCliEntryCopyText(
    targetResolution.entry,
    command.valueKind,
  );

  if (!copyTextResolution.ok) {
    return {
      ok: false,
      statusText: createCopyValueNotFoundStatusText(command),
    };
  }

  return {
    ok: true,
    text: copyTextResolution.text,
  };
};

/**
 * Result itemの番号を表示用文字列へ変換します。
 * @param {number} itemIndex 0-based item indexです。
 * @returns {string} 表示用result numberです。
 */
const formatResultNumber = (itemIndex: number): string => String(itemIndex + resultNumberOffset);

/**
 * Result item kindをcopy用textへ変換します。
 * @param {BookmarkCliResultItem} item result itemです。
 * @returns {string} kind textです。
 */
const formatResultItemKind = (item: BookmarkCliResultItem): string => item.kind.toUpperCase();

/**
 * Result itemのcopy text field一覧を作ります。
 * @param {BookmarkCliResultItem} item result itemです。
 * @param {number} itemIndex 0-based item indexです。
 * @returns {readonly string[]} field一覧です。
 */
const createResultItemCopyTextFields = (
  item: BookmarkCliResultItem,
  itemIndex: number,
): readonly string[] => {
  const baseFields = [
    formatResultNumber(itemIndex),
    formatResultItemKind(item),
    item.folderPath,
    item.title,
  ];

  if (typeof item.url === "string") {
    return [...baseFields, item.url];
  }

  return baseFields;
};

/**
 * Result itemをcopy用1行textへ変換します。
 * @param {BookmarkCliResultItem} item result itemです。
 * @param {number} itemIndex 0-based item indexです。
 * @returns {string} copy用textです。
 */
const createResultItemCopyText = (item: BookmarkCliResultItem, itemIndex: number): string =>
  createResultItemCopyTextFields(item, itemIndex).join(resultItemFieldSeparator);

/**
 * Result item一覧をcopy textへ変換します。
 * @param {readonly BookmarkCliResultItem[]} resultItems result item一覧です。
 * @returns {string} copy textです。
 */
const createResultItemsCopyText = (resultItems: readonly BookmarkCliResultItem[]): string =>
  resultItems.map((item, index) => createResultItemCopyText(item, index)).join(newline);

/**
 * Pipe source stateからcopy textを作ります。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @returns {string} copy textです。
 */
const createPipeCopyText = (state: BookmarkCliCommandState): string => {
  if (state.resultItems.length === emptyResultItemCount) {
    return state.statusText;
  }

  return createResultItemsCopyText(state.resultItems);
};

/**
 * Pipe copy後のstateを作ります。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @param {string} statusText status textです。
 * @returns {BookmarkCliCommandState} copy後stateです。
 */
const createPipeCopyState = (
  state: BookmarkCliCommandState,
  statusText: string,
): BookmarkCliCommandState => {
  const input = {
    currentDirectory: state.currentDirectory,
    extensionState: state.extensionState,
    lastResultEntries: state.lastResultEntries,
    resultItems: state.resultItems,
    statusText,
  };

  if (!state.pendingConfirmation) {
    return createCommandState(input);
  }

  return createCommandState({
    ...input,
    pendingConfirmation: state.pendingConfirmation,
  });
};

/**
 * Copy commandを実行します。
 * @param {CopyBookmarkCommand} command Copy commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executeCopyCommand = async (
  command: CopyBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const textResolution = resolveCopyCommandText(command, dependencies);

  if (!textResolution.ok) {
    return createEmptyResultState(dependencies, textResolution.statusText);
  }

  if (!dependencies.clipboard) {
    return createEmptyResultState(dependencies, clipboardUnavailableStatusText);
  }

  const copied = await writeClipboardText(dependencies, textResolution.text);

  if (!copied) {
    return createEmptyResultState(dependencies, clipboardWriteFailedStatusText);
  }

  return createEmptyResultState(dependencies, copiedStatusText);
};

/**
 * Copy pipe stageを実行します。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} copy後stateです。
 */
export const executeCopyPipeStage = async (
  state: BookmarkCliCommandState,
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const copyText = createPipeCopyText(state);

  if (!dependencies.clipboard) {
    return createPipeCopyState(state, clipboardUnavailableStatusText);
  }

  const copied = await writeClipboardText(dependencies, copyText);

  if (!copied) {
    return createPipeCopyState(state, clipboardWriteFailedStatusText);
  }

  return createPipeCopyState(state, copiedOutputStatusText);
};
