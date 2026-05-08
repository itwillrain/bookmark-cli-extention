import type {
  BookmarkCreatorPort,
  CreatedBookmarkInput,
} from "../../application/bookmarks/mark-bookmark-use-case";
import type {
  BookmarkOrganizerPort,
  CreateFolderInput,
  MoveEntryInput,
  RemoveEntryInput,
  RemoveFolderTreeInput,
  RenameEntryInput,
} from "../../application/bookmarks/organize-bookmark-use-case";
import {
  type BookmarkTree,
  type RawBookmarkTreeNode,
  normalizeBookmarkTree,
} from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkRepositoryPort } from "../../application/bookmarks/bookmark-use-cases";

export {
  createChromeBookmarkOpener,
  type ChromeCreatedTab,
  type ChromeTabCreateProperties,
  type ChromeTabsApi,
} from "./bookmark-opener-adapter";

/**
 * Chrome Bookmarks APIのうちadapterが使う最小shapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks
 */
export interface ChromeBookmarksApi {
  /**
   * Chrome Bookmarkを作成します。
   */
  readonly create: (
    createProperties: ChromeBookmarkCreateProperties,
  ) => Promise<RawBookmarkTreeNode>;
  /**
   * Chrome Bookmark Treeを取得します。
   */
  readonly getTree: () => Promise<readonly RawBookmarkTreeNode[]>;
}

/**
 * Chrome Bookmarks APIのうち書き込みadapterが使うshapeです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks
 */
export interface ChromeBookmarksMutationApi extends ChromeBookmarksApi {
  /**
   * Chrome Bookmarkを移動します。
   */
  readonly move: (
    id: string,
    destination: ChromeBookmarkMoveDestination,
  ) => Promise<RawBookmarkTreeNode>;
  /**
   * Chrome Bookmarkを削除します。
   */
  readonly remove: (id: string) => Promise<void>;
  /**
   * Chrome Bookmark folder subtreeを削除します。
   */
  readonly removeTree: (id: string) => Promise<void>;
  /**
   * Chrome Bookmarkを更新します。
   */
  readonly update: (
    id: string,
    changes: ChromeBookmarkUpdateProperties,
  ) => Promise<RawBookmarkTreeNode>;
}

/**
 * Chrome Bookmarks APIでbookmarkを作成する入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-create
 */
export interface ChromeBookmarkCreateProperties {
  /**
   * 保存先parent folder IDです。
   */
  readonly parentId?: string;
  /**
   * Bookmark titleです。
   */
  readonly title: string;
  /**
   * Bookmark URLです。
   */
  readonly url?: string;
}

/**
 * Chrome Bookmarks APIでbookmarkを移動する入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-move
 */
export interface ChromeBookmarkMoveDestination {
  /**
   * 移動先parent folder IDです。
   */
  readonly parentId?: string;
}

/**
 * Chrome Bookmarks APIでbookmarkを更新する入力です。
 * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-update
 */
export interface ChromeBookmarkUpdateProperties {
  /**
   * 更新後titleです。
   */
  readonly title: string;
}

/** 子要素なしのchildren countです。 */
const emptyChildrenCount = 0;

/**
 * Chrome Bookmark nodeをBookmark entryへ変換します。
 * @param {RawBookmarkTreeNode} node Chrome Bookmark nodeです。
 * @param {string} fallbackUrl fallback URLです。
 * @returns {BookmarkTree["bookmarks"][number]} Bookmark entryです。
 */
const createBookmarkEntryFromRawNode = (
  node: RawBookmarkTreeNode,
  fallbackUrl: string,
): BookmarkTree["bookmarks"][number] => ({
  childrenCount: emptyChildrenCount,
  folderPath: "/",
  id: node.id,
  kind: "bookmark",
  parentId: node.parentId ?? "",
  title: node.title,
  url: node.url ?? fallbackUrl,
});

/**
 * Chrome Bookmark nodeをfolder entryへ変換します。
 * @param {RawBookmarkTreeNode} node Chrome Bookmark nodeです。
 * @returns {BookmarkTree["folders"][number]} Folder entryです。
 */
const createFolderEntryFromRawNode = (
  node: RawBookmarkTreeNode,
): BookmarkTree["folders"][number] => ({
  childrenCount: node.children?.length ?? emptyChildrenCount,
  folderPath: "/",
  id: node.id,
  kind: "folder",
  parentId: node.parentId ?? "",
  title: node.title,
});

/**
 * Chrome Bookmarks APIへ渡すmove destinationを作ります。
 * @param {MoveEntryInput} input Bookmark移動入力です。
 * @returns {ChromeBookmarkMoveDestination} Chrome Bookmarks API move destinationです。
 */
const createChromeBookmarkMoveDestination = (
  input: MoveEntryInput,
): ChromeBookmarkMoveDestination => {
  if (typeof input.parentId !== "string") {
    return {};
  }

  return { parentId: input.parentId };
};

/**
 * Chrome Bookmarks APIをApplication層のrepository portへ変換します。
 * @param {ChromeBookmarksApi} bookmarksApi Chrome Bookmarks APIです。
 * @returns {BookmarkRepositoryPort} Bookmark Tree取得portです。
 */
export const createChromeBookmarkRepository = (
  bookmarksApi: ChromeBookmarksApi,
): BookmarkRepositoryPort => {
  /**
   * Chrome Bookmark Treeを正規化して取得します。
   * @returns {Promise<BookmarkTree>} 正規化済みBookmark Treeです。
   */
  const getBookmarkTree = async (): Promise<BookmarkTree> => {
    const nodes = await bookmarksApi.getTree();

    return normalizeBookmarkTree(nodes);
  };

  return { getBookmarkTree };
};

/**
 * Chrome Bookmarks APIをApplication層のcreator portへ変換します。
 * @param {ChromeBookmarksApi} bookmarksApi Chrome Bookmarks APIです。
 * @returns {BookmarkCreatorPort} Bookmark作成portです。
 */
export const createChromeBookmarkCreator = (
  bookmarksApi: ChromeBookmarksApi,
): BookmarkCreatorPort => {
  /**
   * Chrome Bookmarks APIでBookmarkを作成します。
   * @param {CreatedBookmarkInput} input Bookmark作成入力です。
   * @returns {Promise<BookmarkTree["bookmarks"][number]>} 作成済みBookmark entryです。
   */
  const createBookmark = async (
    input: CreatedBookmarkInput,
  ): Promise<BookmarkTree["bookmarks"][number]> => {
    const createdNode = await bookmarksApi.create(input);

    return createBookmarkEntryFromRawNode(createdNode, input.url);
  };

  return { createBookmark };
};

/**
 * Chrome Bookmarks APIをApplication層のorganizer portへ変換します。
 * @param {ChromeBookmarksMutationApi} bookmarksApi Chrome Bookmarks APIです。
 * @returns {BookmarkOrganizerPort} Bookmark整理portです。
 */
export const createChromeBookmarkOrganizer = (
  bookmarksApi: ChromeBookmarksMutationApi,
): BookmarkOrganizerPort => {
  /**
   * Chrome Bookmarks APIでfolderを作成します。
   * @param {CreateFolderInput} input Folder作成入力です。
   * @returns {Promise<BookmarkTree["folders"][number]>} 作成済みfolder entryです。
   */
  const createFolder = async (input: CreateFolderInput): Promise<BookmarkTree["folders"][number]> =>
    createFolderEntryFromRawNode(await bookmarksApi.create(input));
  /**
   * Chrome Bookmarks APIでBookmarkを移動します。
   * @param {MoveEntryInput} input Bookmark移動入力です。
   * @returns {Promise<BookmarkTree["bookmarks"][number]>} 移動済みBookmark entryです。
   */
  const moveEntry = async (input: MoveEntryInput): Promise<BookmarkTree["bookmarks"][number]> =>
    createBookmarkEntryFromRawNode(
      await bookmarksApi.move(input.id, createChromeBookmarkMoveDestination(input)),
      "",
    );
  /**
   * Chrome Bookmarks APIでBookmarkを削除します。
   * @param {RemoveEntryInput} input Bookmark削除入力です。
   * @returns {Promise<void>} 削除完了Promiseです。
   */
  const removeEntry = async (input: RemoveEntryInput): Promise<void> => {
    await bookmarksApi.remove(input.id);
  };
  /**
   * Chrome Bookmarks APIでfolder subtreeを削除します。
   * @param {RemoveFolderTreeInput} input Folder subtree削除入力です。
   * @returns {Promise<void>} 削除完了Promiseです。
   * @see https://developer.chrome.com/docs/extensions/reference/api/bookmarks#method-removeTree
   */
  const removeFolderTree = async (input: RemoveFolderTreeInput): Promise<void> => {
    await bookmarksApi.removeTree(input.id);
  };

  /**
   * Chrome Bookmarks APIでBookmark名を変更します。
   * @param {RenameEntryInput} input Bookmark名称変更入力です。
   * @returns {Promise<BookmarkTree["bookmarks"][number]>} 更新済みBookmark entryです。
   */
  const renameEntry = async (input: RenameEntryInput): Promise<BookmarkTree["bookmarks"][number]> =>
    createBookmarkEntryFromRawNode(await bookmarksApi.update(input.id, { title: input.title }), "");

  return { createFolder, moveEntry, removeEntry, removeFolderTree, renameEntry };
};
