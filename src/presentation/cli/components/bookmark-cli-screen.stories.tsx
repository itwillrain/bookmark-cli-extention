import {
  type BookmarkCliResultItem,
  BookmarkCliScreen,
  type BookmarkCliScreenProps,
  type BookmarkCliSuggestionItem,
  type BookmarkCliTranscriptEntry,
} from "./bookmark-cli-screen";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { completionCursorCleared } from "../../../domain/cli/completion-cursor";
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
    title: "Stripe Dashboard",
    url: "https://dashboard.stripe.com/",
  },
  {
    folderPath: "/Finance",
    kind: "bookmark",
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
 * Storyで表示するlong表示付き検索結果です。
 */
const storyLongResultItems = [
  {
    details: ["host=dashboard.stripe.com", "#prod", "#finance", "opened=5"],
    folderPath: "/Work/Admin",
    kind: "bookmark",
    score: 0.98,
    title: "Stripe Dashboard",
    url: "https://dashboard.stripe.com/",
  },
  {
    details: ["host=dashboard.stripe.com", "#finance", "opened=2"],
    folderPath: "/Finance",
    kind: "bookmark",
    score: 0.91,
    title: "Stripe Billing",
    url: "https://dashboard.stripe.com/billing",
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
 * Storyで表示するtranscript entryです。
 */
const storyTranscriptEntries = [
  {
    id: "story-entry-1",
    inputValue: storyInputValue,
    resultItems: storyResultItems,
    statusText: storyStatusText,
  },
] satisfies readonly BookmarkCliTranscriptEntry[];

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
    inputValue: "",
    onInputChange: handleStoryInputChange,
    onInputKeyDown: handleStoryInputKeyDown,
    onSubmit: handleStorySubmit,
    preferNerdFont: false,
    promptStyle: "powerline",
    selectedResultIndex: resultCursorCleared,
    selectedSuggestionIndex: completionCursorCleared,
    statusText: storyStatusText,
    suggestionItems: [],
    transcriptEntries: storyTranscriptEntries,
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
 * Long表示付き検索結果がある状態のStoryです。
 */
export const WithLongCandidates: StoryObj<BookmarkCliScreenProps> = {
  args: {
    inputValue: "find -l stripe",
    transcriptEntries: [
      {
        id: "story-entry-long",
        inputValue: "find -l stripe",
        resultItems: storyLongResultItems,
        statusText: storyStatusText,
      },
    ],
  },
};

/**
 * Command suggestionがある状態のStoryです。
 */
export const WithSuggestions: StoryObj<BookmarkCliScreenProps> = {
  args: {
    inputValue: "f",
    selectedSuggestionIndex: 0,
    statusText: "Ready",
    suggestionItems: storySuggestionItems,
    transcriptEntries: [],
  },
};

/**
 * 検索結果がない状態のStoryです。
 */
export const Empty: StoryObj<BookmarkCliScreenProps> = {
  args: {
    inputValue: "find unknown",
    statusText: "0 candidates",
    suggestionItems: [],
    transcriptEntries: [
      {
        id: "story-entry-empty",
        inputValue: "find unknown",
        resultItems: [],
        statusText: "0 candidates",
      },
    ],
  },
};

/**
 * Plain fallback表示のStoryです。
 */
export const PlainFallback: StoryObj<BookmarkCliScreenProps> = {
  args: {
    preferNerdFont: false,
    promptStyle: "plain",
    selectedResultIndex: selectedStoryResultIndex,
  },
};
