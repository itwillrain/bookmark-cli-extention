import { type FolderPath, rootFolderPath } from "./folder-path";

/**
 * 疑似CLIの現在ディレクトリです。
 */
export type CurrentDirectory = FolderPath;

/**
 * 疑似CLIのroot current directoryです。
 */
export const currentDirectoryRoot = rootFolderPath;

/**
 * Folder pathのseparatorです。
 */
const folderPathSeparator = "/";

/**
 * Root aliasのprefixです。
 */
const rootAliasPrefix = "~";

/**
 * Root alias配下pathのprefixです。
 */
const rootAliasPathPrefix = "~/";

/**
 * 現在ディレクトリtokenです。
 */
const currentDirectoryToken = ".";

/**
 * 親ディレクトリtokenです。
 */
const parentDirectoryToken = "..";

/**
 * 空文字です。
 */
const emptyString = "";

/**
 * 最初のsegment indexです。
 */
const firstSegmentIndex = 0;

/**
 * 末尾のsegmentを除外する数です。
 */
const lastSegmentExcludeCount = -1;

/**
 * 入力がrootからの絶対pathかを判定します。
 * @param {string} pathInput 判定対象のpath入力です。
 * @returns {boolean} 絶対pathならtrueです。
 */
const isAbsolutePathInput = (pathInput: string): boolean =>
  pathInput.startsWith(folderPathSeparator);

/**
 * 入力がroot alias pathかを判定します。
 * @param {string} pathInput 判定対象のpath入力です。
 * @returns {boolean} root alias pathならtrueです。
 */
const isRootAliasPathInput = (pathInput: string): boolean =>
  pathInput === rootAliasPrefix || pathInput.startsWith(rootAliasPathPrefix);

/**
 * Root aliasをroot pathへ置換します。
 * @param {string} pathInput 置換対象のpath入力です。
 * @returns {string} root aliasを置換したpath入力です。
 */
const replaceRootAlias = (pathInput: string): string => {
  if (pathInput === rootAliasPrefix) {
    return currentDirectoryRoot;
  }

  if (pathInput.startsWith(rootAliasPathPrefix)) {
    return `${folderPathSeparator}${pathInput.slice(rootAliasPathPrefix.length)}`;
  }

  return pathInput;
};

/**
 * Folder pathをsegment一覧へ分解します。
 * @param {string} folderPath 分解するfolder pathです。
 * @returns {readonly string[]} 空segmentを除いたsegment一覧です。
 */
const splitFolderPath = (folderPath: string): readonly string[] =>
  folderPath.split(folderPathSeparator).filter((segment) => segment !== emptyString);

/**
 * Segment一覧をfolder pathへ変換します。
 * @param {readonly string[]} segments folder path segment一覧です。
 * @returns {FolderPath} folder pathです。
 */
const createFolderPath = (segments: readonly string[]): FolderPath => {
  if (segments.length === firstSegmentIndex) {
    return currentDirectoryRoot;
  }

  return `${folderPathSeparator}${segments.join(folderPathSeparator)}`;
};

/**
 * Path segmentを現在の解決済みsegment一覧へ反映します。
 * @param {readonly string[]} resolvedSegments 解決済みsegment一覧です。
 * @param {string} nextSegment 次に反映するpath segmentです。
 * @returns {readonly string[]} 反映後のsegment一覧です。
 */
const resolveSegment = (
  resolvedSegments: readonly string[],
  nextSegment: string,
): readonly string[] => {
  if (nextSegment === emptyString || nextSegment === currentDirectoryToken) {
    return resolvedSegments;
  }

  if (nextSegment === parentDirectoryToken) {
    return resolvedSegments.slice(firstSegmentIndex, lastSegmentExcludeCount);
  }

  return [...resolvedSegments, nextSegment];
};

/**
 * Path segment一覧を正規化します。
 * @param {readonly string[]} segments 正規化するpath segment一覧です。
 * @returns {readonly string[]} 正規化済みpath segment一覧です。
 */
const normalizeSegments = (segments: readonly string[]): readonly string[] => {
  const resolvedSegments: string[] = [];

  for (const segment of segments) {
    resolvedSegments.splice(
      firstSegmentIndex,
      resolvedSegments.length,
      ...resolveSegment(resolvedSegments, segment),
    );
  }

  return resolvedSegments;
};

/**
 * 現在ディレクトリと入力pathから基準segment一覧を作ります。
 * @param {CurrentDirectory} currentDirectory 現在ディレクトリです。
 * @param {string} pathInput 入力pathです。
 * @returns {readonly string[]} 基準segment一覧です。
 */
const createBaseSegments = (
  currentDirectory: CurrentDirectory,
  pathInput: string,
): readonly string[] => {
  if (isAbsolutePathInput(pathInput) || isRootAliasPathInput(pathInput)) {
    return [];
  }

  return splitFolderPath(currentDirectory);
};

/**
 * 現在ディレクトリから入力pathを絶対folder pathへ解決します。
 * @param {CurrentDirectory} currentDirectory 現在ディレクトリです。
 * @param {string} pathInput 入力pathです。
 * @returns {FolderPath} 解決済みfolder pathです。
 * @example
 * ```ts
 * const result = resolveFolderPath("/Work", "../Finance");
 * // "/Finance"
 * ```
 */
export const resolveFolderPath = (
  currentDirectory: CurrentDirectory,
  pathInput: string,
): FolderPath => {
  const replacedPathInput = replaceRootAlias(pathInput.trim());
  const baseSegments = createBaseSegments(currentDirectory, replacedPathInput);
  const inputSegments = splitFolderPath(replacedPathInput);
  const normalizedSegments = normalizeSegments([...baseSegments, ...inputSegments]);

  return createFolderPath(normalizedSegments);
};

/**
 * Folder pathの親pathを取得します。
 * @param {FolderPath} folderPath 親pathを取得するfolder pathです。
 * @returns {FolderPath} 親folder pathです。
 * @example
 * ```ts
 * const result = getParentFolderPath("/Work/Admin");
 * // "/Work"
 * ```
 */
export const getParentFolderPath = (folderPath: FolderPath): FolderPath => {
  const segments = splitFolderPath(folderPath);
  const parentSegments = segments.slice(firstSegmentIndex, lastSegmentExcludeCount);

  return createFolderPath(parentSegments);
};
