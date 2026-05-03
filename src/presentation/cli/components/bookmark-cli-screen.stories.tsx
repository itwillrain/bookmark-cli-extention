import {
  type BookmarkCliResultItem,
  BookmarkCliScreen,
  type BookmarkCliScreenProps,
  type BookmarkCliSuggestionItem,
} from "./bookmark-cli-screen";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { resultCursorCleared } from "../../../domain/bookmarks/result-cursor";

/**
 * Storyで表示する入力値です。
 */
const storyInputValue = "find stripe";

/**
 * Storyで表示するstatus textです。
 */
const storyStatusText = "3 candidates";

/**
 * Storyで選択するresult indexです。
 */
const selectedStoryResultIndex = 1;

/**
 * Storyで表示する検索結果です。
 */
const storyResultItems = [
  {
    folderPath: "/Work/Admin",
    kind: "bookmark",
    score: 0.98,
    title: "Stripe Dashboard",
    url: "https://dashboard.stripe.com/",
  },
  {
    folderPath: "/Finance",
    kind: "bookmark",
    score: 0.91,
    title: "Stripe Billing",
    url: "https://dashboard.stripe.com/billing",
  },
  {
    folderPath: "/Work/Admin",
    kind: "folder",
    title: "Admin",
  },
] satisfies readonly BookmarkCliResultItem[];

/**
 * Storyで表示するcommand suggestionです。
 */
const storySuggestionItems = [
  {
    commandName: "find",
    completion: "find ",
    description: "Bookmarkを検索",
  },
  {
    commandName: "freq",
    completion: "freq ",
    description: "よく開くBookmarkを表示",
  },
] satisfies readonly BookmarkCliSuggestionItem[];

/**
 * Story用の入力変更callbackです。
 * @param {string} value Story上の入力値です。
 * @returns {void} 返り値はありません。
 */
const handleStoryInputChange = (value: string): void => {
  globalThis.dispatchEvent(new CustomEvent("bookmark-cli-story-input", { detail: value }));
};

/**
 * Story用のsubmit callbackです。
 * @returns {void} 返り値はありません。
 */
const handleStorySubmit = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-story-submit"));
};

/**
 * Story用のkey操作callbackです。
 * @returns {void} 返り値はありません。
 */
const handleStoryInputKeyDown = (): void => {
  globalThis.dispatchEvent(new Event("bookmark-cli-story-keydown"));
};

/**
 * Bookmark CLI画面 Story のmetadataです。
 */
const meta = {
  args: {
    inputValue: storyInputValue,
    onInputChange: handleStoryInputChange,
    onInputKeyDown: handleStoryInputKeyDown,
    onSubmit: handleStorySubmit,
    preferNerdFont: true,
    resultItems: storyResultItems,
    resultViewStyle: "powerline",
    selectedResultIndex: resultCursorCleared,
    statusText: storyStatusText,
    suggestionItems: [],
  },
  component: BookmarkCliScreen,
  title: "CLI/BookmarkCliScreen",
} satisfies Meta<BookmarkCliScreenProps>;

export default meta;

/**
 * 検索結果がある状態のStoryです。
 */
export const WithCandidates: StoryObj<BookmarkCliScreenProps> = {};

/**
 * Command suggestionがある状態のStoryです。
 */
export const WithSuggestions: StoryObj<BookmarkCliScreenProps> = {
  args: {
    inputValue: "f",
    resultItems: [],
    statusText: "Ready",
    suggestionItems: storySuggestionItems,
  },
};

/**
 * 検索結果がない状態のStoryです。
 */
export const Empty: StoryObj<BookmarkCliScreenProps> = {
  args: {
    inputValue: "find unknown",
    resultItems: [],
    statusText: "0 candidates",
    suggestionItems: [],
  },
};

/**
 * Plain fallback表示のStoryです。
 */
export const PlainFallback: StoryObj<BookmarkCliScreenProps> = {
  args: {
    preferNerdFont: false,
    resultViewStyle: "plain",
    selectedResultIndex: selectedStoryResultIndex,
  },
};
