import {
  type BookmarkCliResultItem,
  BookmarkCliScreen,
  type BookmarkCliScreenProps,
} from "./bookmark-cli-screen";
import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Storyで表示する入力値です。
 */
const storyInputValue = "find stripe";

/**
 * Storyで表示するstatus textです。
 */
const storyStatusText = "3 candidates";

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
 * Bookmark CLI画面 Story のmetadataです。
 */
const meta = {
  args: {
    inputValue: storyInputValue,
    onInputChange: handleStoryInputChange,
    onSubmit: handleStorySubmit,
    resultItems: storyResultItems,
    statusText: storyStatusText,
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
 * 検索結果がない状態のStoryです。
 */
export const Empty: StoryObj<BookmarkCliScreenProps> = {
  args: {
    inputValue: "find unknown",
    resultItems: [],
    statusText: "0 candidates",
  },
};
