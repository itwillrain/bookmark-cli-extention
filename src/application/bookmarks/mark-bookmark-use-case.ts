import type {
  BookmarkCommandFailure,
  BookmarkCommandResult,
  BookmarkCommandSuccess,
  BookmarkRepositoryPort,
} from "./bookmark-use-cases";
import type { BookmarkEntry, BookmarkTree } from "../../domain/bookmarks/bookmark-tree";
import { type CurrentDirectory, resolveFolderPath } from "../../domain/bookmarks/current-directory";
import { doesFolderPathExist } from "../../domain/bookmarks/bookmark-directory";

/** CLI起動元タブcontext。 */
export interface LaunchContext {
  /** 起動元tab ID。 */
  readonly tabId: number;
  /** 起動元tab title。 */
  readonly title: string;
  /** 起動元tab URL。 */
  readonly url: string;
}

/** Bookmark作成入力。 */
export interface CreatedBookmarkInput {
  /** 保存先folder ID。 */
  readonly parentId?: string;
  /** Bookmark title。 */
  readonly title: string;
  /** Bookmark URL。 */
  readonly url: string;
}

/** Bookmark作成port。 */
export interface BookmarkCreatorPort {
  /** Bookmarkを作成。 */
  readonly createBookmark: (input: CreatedBookmarkInput) => Promise<BookmarkEntry>;
}

/** 現在タブ保存入力。 */
export interface MarkCurrentTabInput {
  /** 重複URLの保存を許可するか。 */
  readonly allowDuplicate: boolean;
  /** Bookmark作成port。 */
  readonly creator: BookmarkCreatorPort;
  /** 現在ディレクトリ。 */
  readonly currentDirectory: CurrentDirectory;
  /** CLI起動元タブcontext。 */
  readonly launchContext?: LaunchContext;
  /** Bookmark Tree repository port。 */
  readonly repository: BookmarkRepositoryPort;
  /** 保存先folder path入力。 */
  readonly targetFolderPathInput: string;
  /** Bookmark title入力。 */
  readonly titleInput: string;
}

/** 現在タブ保存成功値。 */
export interface MarkCurrentTabValue {
  /** 作成されたBookmark entry。 */
  readonly entry: BookmarkEntry;
}

/** Bookmark作成入力作成用の入力。 */
interface CreateBookmarkInputInput {
  /** Bookmark Tree。 */
  readonly bookmarkTree: BookmarkTree;
  /** 保存先folder path。 */
  readonly targetFolderPath: CurrentDirectory;
  /** Bookmark title。 */
  readonly title: string;
  /** Bookmark URL。 */
  readonly url: string;
}

/** Folder未検出のエラーcode。 */
const folderNotFoundErrorCode = "folder_not_found";

/** Unsupported tabのエラーcode。 */
const unsupportedTabErrorCode = "unsupported_tab";

/** Already markedのエラーcode。 */
const alreadyMarkedErrorCode = "already_marked";

/** 空文字。 */
const emptyString = "";

/**
 * 成功結果を作成。
 * @param {TValue} value 成功値。
 * @returns {BookmarkCommandSuccess<TValue>} 成功結果。
 */
const createSuccess = <TValue>(value: TValue): BookmarkCommandSuccess<TValue> => ({
  ok: true,
  value,
});

/**
 * 失敗結果を作成。
 * @param {BookmarkCommandFailure["errorCode"]} errorCode エラーcode。
 * @param {string} message 表示message。
 * @returns {BookmarkCommandFailure} 失敗結果。
 */
const createFailure = (
  errorCode: BookmarkCommandFailure["errorCode"],
  message: string,
): BookmarkCommandFailure => ({
  errorCode,
  message,
  ok: false,
});

/**
 * 起動元タブなしの失敗結果を作成。
 * @returns {BookmarkCommandFailure} 起動元タブなしの失敗結果。
 */
const createUnsupportedTabFailure = (): BookmarkCommandFailure =>
  createFailure(unsupportedTabErrorCode, "Launch context tab is not available");

/**
 * Folder未検出の失敗結果を作成。
 * @param {CurrentDirectory} folderPath 見つからなかったfolder path。
 * @returns {BookmarkCommandFailure} Folder未検出の失敗結果。
 */
const createFolderNotFoundFailure = (folderPath: CurrentDirectory): BookmarkCommandFailure =>
  createFailure(folderNotFoundErrorCode, `Folder was not found: ${folderPath}`);

/**
 * URL重複の失敗結果を作成。
 * @param {string} url 重複したURL。
 * @returns {BookmarkCommandFailure} URL重複の失敗結果。
 */
const createAlreadyMarkedFailure = (url: string): BookmarkCommandFailure =>
  createFailure(alreadyMarkedErrorCode, `Bookmark URL is already marked: ${url}`);

/**
 * Bookmark保存先folder entryを取得。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} folderPath 保存先folder path。
 * @returns {BookmarkEntry | undefined} 保存先folder entry。
 */
const findTargetFolderEntry = (
  bookmarkTree: BookmarkTree,
  folderPath: CurrentDirectory,
): BookmarkEntry | undefined =>
  bookmarkTree.folders.find((folder) => folder.folderPath === folderPath);

/**
 * Bookmark作成時のparentIdを解決。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {CurrentDirectory} folderPath 保存先folder path。
 * @returns {string | undefined} 保存先folder ID。
 */
const resolveParentId = (
  bookmarkTree: BookmarkTree,
  folderPath: CurrentDirectory,
): string | undefined => findTargetFolderEntry(bookmarkTree, folderPath)?.id;

/**
 * 保存先folder pathを解決。
 * @param {MarkCurrentTabInput} input 現在タブ保存入力。
 * @returns {CurrentDirectory} 保存先folder path。
 */
const resolveTargetFolderPath = (input: MarkCurrentTabInput): CurrentDirectory =>
  resolveFolderPath(input.currentDirectory, input.targetFolderPathInput);

/**
 * 入力titleまたは起動元tab titleをBookmark titleとして解決。
 * @param {MarkCurrentTabInput} input 現在タブ保存入力。
 * @param {LaunchContext} launchContext 起動元タブcontext。
 * @returns {string} Bookmark title。
 */
const resolveBookmarkTitle = (input: MarkCurrentTabInput, launchContext: LaunchContext): string => {
  const titleInput = input.titleInput.trim();

  if (titleInput === emptyString) {
    return launchContext.title;
  }

  return titleInput;
};

/**
 * URL重複があるかを判定。
 * @param {BookmarkTree} bookmarkTree Bookmark Tree。
 * @param {string} url 検査対象URL。
 * @returns {boolean} URL重複があればtrue。
 */
const hasDuplicateBookmarkUrl = (bookmarkTree: BookmarkTree, url: string): boolean =>
  bookmarkTree.bookmarks.some((bookmark) => bookmark.url === url);

/**
 * Bookmark作成入力を作成。
 * @param {CreateBookmarkInputInput} input Bookmark作成入力作成用の入力。
 * @returns {CreatedBookmarkInput} Bookmark作成入力。
 */
const createBookmarkInput = (input: CreateBookmarkInputInput): CreatedBookmarkInput => {
  const parentId = resolveParentId(input.bookmarkTree, input.targetFolderPath);

  if (typeof parentId !== "string") {
    return { title: input.title, url: input.url };
  }

  return { parentId, title: input.title, url: input.url };
};

/**
 * CLI起動元タブをBookmarkへ保存。
 * @param {MarkCurrentTabInput} input 現在タブ保存入力。
 * @returns {Promise<BookmarkCommandResult<MarkCurrentTabValue>>} 現在タブ保存結果。
 */
export const markCurrentTab = async (
  input: MarkCurrentTabInput,
): Promise<BookmarkCommandResult<MarkCurrentTabValue>> => {
  if (!input.launchContext) {
    return createUnsupportedTabFailure();
  }

  const bookmarkTree = await input.repository.getBookmarkTree();
  const targetFolderPath = resolveTargetFolderPath(input);

  if (!doesFolderPathExist(bookmarkTree, targetFolderPath)) {
    return createFolderNotFoundFailure(targetFolderPath);
  }

  if (!input.allowDuplicate && hasDuplicateBookmarkUrl(bookmarkTree, input.launchContext.url)) {
    return createAlreadyMarkedFailure(input.launchContext.url);
  }

  const entry = await input.creator.createBookmark(
    createBookmarkInput({
      bookmarkTree,
      targetFolderPath,
      title: resolveBookmarkTitle(input, input.launchContext),
      url: input.launchContext.url,
    }),
  );

  return createSuccess({ entry });
};
