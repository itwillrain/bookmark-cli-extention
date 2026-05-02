import {
  type BookmarkCliCommandState,
  executeBookmarkCliCommand,
} from "../../presentation/cli/bookmark-cli-controller";
import { type ReactElement, useState } from "react";
import {
  createChromeBookmarkOpener,
  createChromeBookmarkRepository,
} from "../../infrastructure/chrome/bookmarks-adapter";
import { BookmarkCliScreen } from "../../presentation/cli/components/bookmark-cli-screen";
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
  lastResultEntries: [],
  resultItems: [],
  statusText: initialStatusText,
} satisfies BookmarkCliCommandState;

/**
 * Chrome Bookmarks APIを使うrepositoryです。
 */
const bookmarkRepository = createChromeBookmarkRepository(browser.bookmarks);

/**
 * Chrome Tabs APIを使うopenerです。
 */
const bookmarkOpener = createChromeBookmarkOpener(browser.tabs);

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
 * Dedicated extension pageのReact appです。
 * @returns {ReactElement} Dedicated extension pageのReact elementです。
 */
export const App = (): ReactElement => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [commandState, setCommandState] = useState<BookmarkCliCommandState>(initialCommandState);

  /**
   * 現在の入力値をBookmark CLI commandとして実行します。
   * @returns {Promise<void>} 実行完了を表すPromiseです。
   */
  const executeCurrentCommand = async (): Promise<void> => {
    const nextState = await executeBookmarkCliCommand(inputValue, {
      currentDirectory: commandState.currentDirectory,
      lastResultEntries: commandState.lastResultEntries,
      opener: bookmarkOpener,
      repository: bookmarkRepository,
    });

    setCommandState(nextState);
  };

  /**
   * Command実行失敗をstatusへ反映します。
   * @returns {void} 返り値はありません。
   */
  const handleCommandExecutionError = (): void => {
    setCommandState(createFailedCommandState);
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
