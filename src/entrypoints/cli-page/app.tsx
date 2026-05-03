import {
  type BookmarkCliCommandDependencies,
  type BookmarkCliCommandState,
  executeBookmarkCliCommand,
} from "../../presentation/cli/bookmark-cli-controller";
import { type Dispatch, type ReactElement, type SetStateAction, useEffect, useState } from "react";
import {
  createChromeBookmarkCreator,
  createChromeBookmarkOpener,
  createChromeBookmarkOrganizer,
  createChromeBookmarkRepository,
} from "../../infrastructure/chrome/bookmarks-adapter";
import {
  loadExtensionState,
  persistCommandExecutionState,
} from "../../application/storage/extension-state-use-cases";
import { BookmarkCliScreen } from "../../presentation/cli/components/bookmark-cli-screen";
import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import { createChromeExtensionStateStorage } from "../../infrastructure/chrome/extension-state-storage-adapter";
import { createChromeLaunchContextStorage } from "../../infrastructure/chrome/launch-context-storage-adapter";
import { createInitialExtensionState } from "../../domain/storage/extension-state";
import { currentDirectoryRoot } from "../../domain/bookmarks/current-directory";

/**
 * 初期入力値です。
 */
const initialInputValue = "";

/**
 * 初期status textです。
 */
const initialStatusText = "Ready";

/**
 * Command実行失敗時のstatus textです。
 */
const commandFailedStatusText = "Command failed";

/**
 * 初期command stateです。
 */
const initialCommandState = {
  currentDirectory: currentDirectoryRoot,
  extensionState: createInitialExtensionState(),
  lastResultEntries: [],
  resultItems: [],
  statusText: initialStatusText,
} satisfies BookmarkCliCommandState;

/**
 * Chrome Bookmarks APIを使うrepositoryです。
 */
const bookmarkRepository = createChromeBookmarkRepository(browser.bookmarks);

/**
 * Chrome Bookmarks APIを使うcreatorです。
 */
const bookmarkCreator = createChromeBookmarkCreator(browser.bookmarks);

/**
 * Chrome Bookmarks APIを使うorganizerです。
 */
const bookmarkOrganizer = createChromeBookmarkOrganizer(browser.bookmarks);

/**
 * Chrome Tabs APIを使うopenerです。
 */
const bookmarkOpener = createChromeBookmarkOpener(browser.tabs);

/**
 * Chrome Storage APIを使う拡張状態storage。
 */
const extensionStateStorage = createChromeExtensionStateStorage(browser.storage.local);

/**
 * Chrome Storage Session APIを使うlaunch context storage。
 */
const launchContextStorage = createChromeLaunchContextStorage(browser.storage.session);

/**
 * 現在日時ISO文字列を返します。
 * @returns {string} 現在日時ISO文字列。
 */
const nowIsoString = (): string => new Date().toISOString();

/**
 * Command実行失敗時のcommand stateを作ります。
 * @param {BookmarkCliCommandState} currentState 現在のcommand stateです。
 * @returns {BookmarkCliCommandState} 失敗statusを反映したcommand stateです。
 */
const createFailedCommandState = (
  currentState: BookmarkCliCommandState,
): BookmarkCliCommandState => ({
  ...currentState,
  statusText: commandFailedStatusText,
});

/**
 * 保存済み拡張状態を読み込み。
 * @returns {Promise<BookmarkCliCommandState>} 復元後command state。
 */
const loadInitialCommandState = async (): Promise<BookmarkCliCommandState> => {
  const result = await loadExtensionState({
    now: nowIsoString,
    repository: bookmarkRepository,
    storage: extensionStateStorage,
  });

  if (!result.ok) {
    return createFailedCommandState(initialCommandState);
  }

  return {
    ...initialCommandState,
    currentDirectory: result.value.currentDirectory.folderPath,
    extensionState: result.value,
  };
};

/**
 * Command stateからcommand実行依存を作成。
 * @param {BookmarkCliCommandState} commandState 現在のcommand state。
 * @param {LaunchContext | undefined} launchContext CLI起動元タブcontext。
 * @returns {BookmarkCliCommandDependencies} command実行依存。
 */
const createCommandDependencies = (
  commandState: BookmarkCliCommandState,
  launchContext: LaunchContext | undefined,
): BookmarkCliCommandDependencies => {
  const dependencies = {
    creator: bookmarkCreator,
    currentDirectory: commandState.currentDirectory,
    extensionState: commandState.extensionState,
    lastResultEntries: commandState.lastResultEntries,
    opener: bookmarkOpener,
    organizer: bookmarkOrganizer,
    repository: bookmarkRepository,
  } satisfies BookmarkCliCommandDependencies;

  if (!launchContext) {
    return dependencies;
  }

  return {
    ...dependencies,
    launchContext,
  };
};

/**
 * Command実行結果を永続化。
 * @param {string} inputValue command入力値。
 * @param {BookmarkCliCommandState} nextState command実行後state。
 * @returns {Promise<BookmarkCliCommandState>} 永続化結果を反映したcommand state。
 */
const persistNextCommandState = async (
  inputValue: string,
  nextState: BookmarkCliCommandState,
): Promise<BookmarkCliCommandState> => {
  const persistedState = await persistCommandExecutionState({
    commandInput: inputValue,
    currentDirectory: nextState.currentDirectory,
    extensionState: nextState.extensionState,
    now: nowIsoString,
    repository: bookmarkRepository,
    storage: extensionStateStorage,
  });

  if (!persistedState.ok) {
    return {
      ...nextState,
      statusText: persistedState.message,
    };
  }

  return {
    ...nextState,
    extensionState: persistedState.value,
  };
};

/**
 * CLI commandを実行して永続化。
 * @param {string} inputValue command入力値。
 * @param {BookmarkCliCommandState} commandState 現在のcommand state。
 * @param {LaunchContext | undefined} launchContext CLI起動元タブcontext。
 * @returns {Promise<BookmarkCliCommandState>} 画面へ反映するcommand state。
 */
const executeAndPersistCommand = async (
  inputValue: string,
  commandState: BookmarkCliCommandState,
  launchContext: LaunchContext | undefined,
): Promise<BookmarkCliCommandState> => {
  const nextState = await executeBookmarkCliCommand(
    inputValue,
    createCommandDependencies(commandState, launchContext),
  );

  return persistNextCommandState(inputValue, nextState);
};

/** Command state setter。 */
type CommandStateSetter = Dispatch<SetStateAction<BookmarkCliCommandState>>;

/** Launch context setter。 */
type LaunchContextSetter = Dispatch<SetStateAction<LaunchContext | undefined>>;

/**
 * 起動時に保存状態とlaunch contextを復元。
 * @param {CommandStateSetter} setCommandState command state setter。
 * @param {LaunchContextSetter} setLaunchContext launch context setter。
 * @param {() => void} handleError 失敗handler。
 * @returns {void} 返り値なし。
 */
const restoreInitialStates = (
  setCommandState: CommandStateSetter,
  setLaunchContext: LaunchContextSetter,
  handleError: () => void,
): void => {
  launchContextStorage
    .readLaunchContext()
    .then((result) => {
      if (result.ok) {
        setLaunchContext(result.value);
      }
    })
    .catch(handleError);
  loadInitialCommandState()
    .then((loadedState) => {
      setCommandState(loadedState);
    })
    .catch(handleError);
};

/**
 * Dedicated extension pageのReact appです。
 * @returns {ReactElement} Dedicated extension pageのReact elementです。
 */
export const App = (): ReactElement => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [launchContext, setLaunchContext] = useState<LaunchContext>();
  const [commandState, setCommandState] = useState<BookmarkCliCommandState>(initialCommandState);

  /**
   * Command実行失敗をstatusへ反映します。
   * @returns {void} 返り値はありません。
   */
  const handleCommandExecutionError = (): void => {
    setCommandState(createFailedCommandState);
  };

  useEffect((): void => {
    restoreInitialStates(setCommandState, setLaunchContext, handleCommandExecutionError);
  }, []);

  /**
   * 現在の入力値をBookmark CLI commandとして実行します。
   * @returns {Promise<void>} 実行完了を表すPromiseです。
   */
  const executeCurrentCommand = async (): Promise<void> => {
    const nextState = await executeAndPersistCommand(inputValue, commandState, launchContext);

    setCommandState(nextState);
  };

  /**
   * Submit操作を非同期command実行へ接続します。
   * @returns {void} 返り値はありません。
   */
  const handleSubmit = (): void => {
    executeCurrentCommand().catch(handleCommandExecutionError);
  };

  return (
    <BookmarkCliScreen
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSubmit={handleSubmit}
      resultItems={commandState.resultItems}
      statusText={commandState.statusText}
    />
  );
};
