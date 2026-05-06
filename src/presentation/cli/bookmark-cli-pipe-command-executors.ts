import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import type {
  GrepPipeStageCommand,
  PipeBookmarkCommand,
  PipeSourceBookmarkCommand,
} from "../../application/commands/bookmark-command-parser";
import { createCommandState } from "./bookmark-cli-state-builders";
import { executeCopyPipeStage } from "./bookmark-cli-copy-command-executors";
import { filterBookmarkCliResultItemsByGrep } from "./bookmark-cli-grep-filter";

/**
 * Pipe source commandを実行する関数です。
 */
export type PipeSourceCommandExecutor = (
  command: PipeSourceBookmarkCommand,
  dependencies: BookmarkCliCommandDependencies,
) => Promise<BookmarkCliCommandState>;

/**
 * Pipe stage適用contextです。
 */
interface PipeStageApplicationContext {
  /** Command実行に必要な依存です。 */
  readonly dependencies: BookmarkCliCommandDependencies;
  /** Pipe stage一覧です。 */
  readonly stages: PipeBookmarkCommand["stages"];
}

/** Grep match status suffixです。 */
const grepMatchStatusSuffix = "matches";

/** 先頭pipe stage indexです。 */
const firstPipeStageIndex = 0;

/** 次のpipe stage indexへ進めるoffsetです。 */
const nextPipeStageIndexOffset = 1;

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
  stage: GrepPipeStageCommand,
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
 * Pipe stageをcommand stateへ適用します。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @param {PipeBookmarkCommand["stages"][number]} stage pipe stageです。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} pipe stage適用後のcommand stateです。
 */
const applyPipeStage = async (
  state: BookmarkCliCommandState,
  stage: PipeBookmarkCommand["stages"][number],
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  if (stage.kind === "copy") {
    return executeCopyPipeStage(state, dependencies);
  }

  await Promise.resolve();

  return applyGrepPipeStage(state, stage);
};

/**
 * Pipe stage indexが範囲外かを判定します。
 * @param {PipeBookmarkCommand["stages"]} stages pipe stage一覧です。
 * @param {number} stageIndex pipe stage indexです。
 * @returns {boolean} 範囲外ならtrueです。
 */
const isPipeStageIndexOutOfRange = (
  stages: PipeBookmarkCommand["stages"],
  stageIndex: number,
): boolean => stageIndex >= stages.length;

/**
 * 次に適用するpipe stage indexを返します。
 * @param {number} stageIndex 現在のpipe stage indexです。
 * @returns {number} 次のpipe stage indexです。
 */
const getNextPipeStageIndex = (stageIndex: number): number => stageIndex + nextPipeStageIndexOffset;

/**
 * 指定indexからpipe stageをcommand stateへ順に適用します。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @param {PipeStageApplicationContext} context pipe stage適用contextです。
 * @param {number} stageIndex 適用するpipe stage indexです。
 * @returns {Promise<BookmarkCliCommandState>} pipe適用後のcommand stateです。
 */
const applyPipeStagesFromIndex = async (
  state: BookmarkCliCommandState,
  context: PipeStageApplicationContext,
  stageIndex: number,
): Promise<BookmarkCliCommandState> => {
  if (isPipeStageIndexOutOfRange(context.stages, stageIndex)) {
    return state;
  }

  const stage = context.stages[stageIndex];

  if (!stage) {
    return state;
  }

  const nextState = await applyPipeStage(state, stage, context.dependencies);

  return applyPipeStagesFromIndex(nextState, context, getNextPipeStageIndex(stageIndex));
};

/**
 * Pipe stage一覧をcommand stateへ順に適用します。
 * @param {BookmarkCliCommandState} state pipe source実行状態です。
 * @param {PipeBookmarkCommand["stages"]} stages pipe stage一覧です。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {Promise<BookmarkCliCommandState>} pipe適用後のcommand stateです。
 */
const applyPipeStages = async (
  state: BookmarkCliCommandState,
  stages: PipeBookmarkCommand["stages"],
  dependencies: BookmarkCliCommandDependencies,
): Promise<BookmarkCliCommandState> => {
  const context = {
    dependencies,
    stages,
  } satisfies PipeStageApplicationContext;
  const nextState = await applyPipeStagesFromIndex(state, context, firstPipeStageIndex);

  return nextState;
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

  return applyPipeStages(sourceState, command.stages, dependencies);
};
