/**
 * 疑似CLIで扱うfolder pathです。
 */
export type FolderPath = string;

/**
 * 疑似CLIのroot folder pathです。
 */
export const rootFolderPath = "/";

/**
 * Root folder pathのaliasです。
 */
const rootFolderPathAlias = "~";

/**
 * Folder path separatorです。
 */
const folderPathSeparator = "/";

/**
 * 先頭slashの有無を判定します。
 * @param {string} input 判定対象のpath入力です。
 * @returns {boolean} 先頭slashを持つ場合はtrueです。
 */
const startsWithRootSeparator = (input: string): boolean => input.startsWith(folderPathSeparator);

/**
 * Folder path入力を絶対pathへ正規化します。
 * @param {string} input ユーザー入力または内部生成されたfolder pathです。
 * @returns {FolderPath} 絶対folder pathです。
 */
export const normalizeFolderPathInput = (input: string): FolderPath => {
  if (input === rootFolderPathAlias) {
    return rootFolderPath;
  }

  if (startsWithRootSeparator(input)) {
    return input;
  }

  return `${rootFolderPath}${input}`;
};

/**
 * 親folder pathへfolder titleを追加します。
 * @param {FolderPath} parentFolderPath 親folder pathです。
 * @param {string} folderTitle 追加するfolder titleです。
 * @returns {FolderPath} 追加後のfolder pathです。
 */
export const joinFolderPath = (parentFolderPath: FolderPath, folderTitle: string): FolderPath => {
  if (parentFolderPath === rootFolderPath) {
    return `${rootFolderPath}${folderTitle}`;
  }

  return `${parentFolderPath}${folderPathSeparator}${folderTitle}`;
};
