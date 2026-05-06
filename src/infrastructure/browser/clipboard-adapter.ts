import type { ClipboardWriterPort } from "../../presentation/cli/bookmark-cli-command-state";

/**
 * Browser Clipboard APIのうちadapterが使う最小shapeです。
 */
export interface BrowserClipboard {
  /**
   * Clipboardへtextを書き込みます。
   */
  readonly writeText: (text: string) => Promise<void>;
}

/**
 * Browser Clipboard APIをClipboardWriterPortへ変換します。
 * @param {BrowserClipboard} clipboard Browser Clipboard APIです。
 * @returns {ClipboardWriterPort} Clipboard writer portです。
 */
export const createBrowserClipboardWriter = (clipboard: BrowserClipboard): ClipboardWriterPort => ({
  writeText: clipboard.writeText.bind(clipboard),
});
