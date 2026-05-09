import type {
  BookmarkCliCommandDependencies,
  BookmarkCliCommandState,
} from "./bookmark-cli-command-state";
import { createEmptyResultState } from "./bookmark-cli-state-builders";

/** Version表示のproduct名です。 */
const versionProductName = "bookmark-cli";

/** Version未取得時のfallback表示です。 */
const unknownVersionText = "unknown";

/**
 * Version表示用のstatus textを作ります。
 * @param {string | undefined} extensionVersion 拡張機能versionです。
 * @returns {string} Version表示status textです。
 */
const createVersionStatusText = (extensionVersion: string | undefined): string =>
  `${versionProductName} ${extensionVersion ?? unknownVersionText}`;

/**
 * Version commandを実行します。
 * @param {BookmarkCliCommandDependencies} dependencies command実行に必要な依存です。
 * @returns {BookmarkCliCommandState} 画面に反映する状態です。
 */
export const executeVersionCommand = (
  dependencies: BookmarkCliCommandDependencies,
): BookmarkCliCommandState =>
  createEmptyResultState(dependencies, createVersionStatusText(dependencies.extensionVersion));
