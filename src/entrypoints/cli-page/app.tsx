import {
  type BookmarkCliResultItem,
  BookmarkCliScreen,
} from "../../presentation/cli/components/bookmark-cli-screen";
import { type ReactElement, useState } from "react";
import {
  createChromeBookmarkOpener,
  createChromeBookmarkRepository,
} from "../../infrastructure/chrome/bookmarks-adapter";
import { executeBookmarkCliCommand } from "../../presentation/cli/bookmark-cli-controller";

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
 * 初期result item一覧です。
 */
const initialResultItems = [] as const satisfies readonly BookmarkCliResultItem[];

/**
 * Chrome Bookmarks APIを使うrepositoryです。
 */
const bookmarkRepository = createChromeBookmarkRepository(browser.bookmarks);

/**
 * Chrome Tabs APIを使うopenerです。
 */
const bookmarkOpener = createChromeBookmarkOpener(browser.tabs);

/**
 * Dedicated extension pageのReact appです。
 * @returns {ReactElement} Dedicated extension pageのReact elementです。
 */
export const App = (): ReactElement => {
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [resultItems, setResultItems] =
    useState<readonly BookmarkCliResultItem[]>(initialResultItems);
  const [statusText, setStatusText] = useState(initialStatusText);

  /**
   * 現在の入力値をBookmark CLI commandとして実行します。
   * @returns {Promise<void>} 実行完了を表すPromiseです。
   */
  const executeCurrentCommand = async (): Promise<void> => {
    const nextState = await executeBookmarkCliCommand(inputValue, {
      opener: bookmarkOpener,
      repository: bookmarkRepository,
    });

    setResultItems(nextState.resultItems);
    setStatusText(nextState.statusText);
  };

  /**
   * Command実行失敗をstatusへ反映します。
   * @returns {void} 返り値はありません。
   */
  const handleCommandExecutionError = (): void => {
    setStatusText(commandFailedStatusText);
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
      resultItems={resultItems}
      statusText={statusText}
    />
  );
};
