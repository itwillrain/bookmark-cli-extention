import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  PipeBookmarkCommand,
  PipeSourceBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import { createCommandState } from "./bookmark-cli-state-builders";
import { filterBookmarkCliResultItemsByGrep } from "./bookmark-cli-grep-filter";

/**
 * Pipe source commandを実行する関数です。
 */
export type PipeSourceCommandExecutor = (
  command: PipeSourceBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
) => Promise<BookmarkCliCommandState>;

/** Grep match status suffixです。 */
const grepMatchStatusSuffix = "matches";

/**
 * Grep match件数のstatus textを作ります。
 * @param {number} matchCount match件数です。
 * @returns {string} Grep match件数のstatus textです。
 */
const createGrepMatchStatusText = (matchCount: number): string =>
  `${String(matchCount)} ${grepMatchStatusSuffix}`;

/**
 * Result itemとlastResultEntriesが同じindexで対応しているかを判定します。
 * @param {BookmarkCliCommandState} state command実行状態です。
 * @returns {boolean} 同じindexで対応しているならtrueです。
 */
const hasAlignedLastResultEntries = (state: BookmarkCliCommandState): boolean =>
  state.lastResultEntries.length === state.resultItems.length;

/**
 * Match index一覧で直前結果一覧を絞り込みます。
 * @param {BookmarkCliCommandState} state command実行状態です。
 * @param {readonly number[]} matchingIndexes matchしたindex一覧です。
 * @returns {BookmarkCliCommandState["lastResultEntries"]} 絞り込み後の直前結果一覧です。
 */
const filterLastResultEntriesByIndexes = (
  state: BookmarkCliCommandState,
  matchingIndexes: readonly number[],
): BookmarkCliCommandState["lastResultEntries"] => {
  if (!hasAlignedLastResultEntries(state)) {
    return state.lastResultEntries;
  }

  const filteredEntries: BookmarkCliCommandState["lastResultEntries"][number][] = [];

  for (const index of matchingIndexes) {
    const entry = state.lastResultEntries[index];

    if (entry) {
      filteredEntries.push(entry);
    }
  }

  return filteredEntries;
};

/**
 * Grep stageをcommand stateへ適用します。
 * @param {BookmarkCliCommandState} state command実行状態です。
 * @param {PipeBookmarkCommand["stages"][number]} stage grep stageです。
 * @returns {BookmarkCliCommandState} grep適用後のcommand stateです。
 */
const applyGrepPipeStage = (
  state: BookmarkCliCommandState,
  stage: PipeBookmarkCommand["stages"][number],
): BookmarkCliCommandState => {
  const grepResult = filterBookmarkCliResultItemsByGrep(state.resultItems, stage.queryInput);
  const nextState = {
    currentDirectory: state.currentDirectory,
    extensionState: state.extensionState,
    lastResultEntries: filterLastResultEntriesByIndexes(state, grepResult.matchingIndexes),
    resultItems: grepResult.resultItems,
    statusText: createGrepMatchStatusText(grepResult.resultItems.length),
  };

  if (!state.pendingConfirmation) {
    return createCommandState(nextState);
  }

  return createCommandState({
    ...nextState,
    pendingConfirmation: state.pendingConfirmation,
  });
};

/**
 * Grep stage一覧をcommand stateへ順に適用します。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @param {PipeBookmarkCommand["stages"]} stages grep stage一覧です。
 * @returns {BookmarkCliCommandState} pipe適用後のcommand stateです。
 */
const applyGrepPipeStages = (
  state: BookmarkCliCommandState,
  stages: PipeBookmarkCommand["stages"],
): BookmarkCliCommandState => {
  let currentState = state;

  for (const stage of stages) {
    currentState = applyGrepPipeStage(currentState, stage);
  }

  return currentState;
};

/**
 * Pipe commandを実行します。
 * @param {PipeBookmarkCommand} command pipe commandです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @param {PipeSourceCommandExecutor} executeSource pipe source executorです。
 * @returns {Promise<BookmarkCliCommandState>} 画面に反映する状態です。
 */
export const executePipeCommand = async (
  command: PipeBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
  executeSource: PipeSourceCommandExecutor,
): Promise<BookmarkCliCommandState> => {
  const sourceState = await executeSource(command.source, dependencies);

  return applyGrepPipeStages(sourceState, command.stages);
};
