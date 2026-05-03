import {
  type ChromeBookmarkCreateProperties,
  type ChromeBookmarkMoveDestination,
  type ChromeBookmarkUpdateProperties,
  type ChromeBookmarksMutationApi,
  createChromeBookmarkOrganizer,
} from "./bookmarks-adapter";
import { describe, expect, it } from "vitest";
import type { RawBookmarkTreeNode } from "../../domain/bookmarks/bookmark-tree";

/** 対象Bookmark ID fixtureです。 */
const targetBookmarkId = "42";

/** 移動先parent ID fixtureです。 */
const targetParentId = "11";

/** 作成folder title fixtureです。 */
const folderTitle = "Tools";

/** Bookmark title fixtureです。 */
const bookmarkTitle = "Stripe Dashboard";

/** 更新後title fixtureです。 */
const renamedTitle = "GitHub Pull Requests";

/** Bookmark URL fixtureです。 */
const targetUrl = "https://dashboard.stripe.com/";

/** Chrome Bookmarks API move呼び出し記録です。 */
interface MoveCall {
  /** 移動先指定です。 */
  readonly destination: ChromeBookmarkMoveDestination;
  /** 移動対象IDです。 */
  readonly id: string;
}

/** Chrome Bookmarks API update呼び出し記録です。 */
interface UpdateCall {
  /** 更新内容です。 */
  readonly changes: ChromeBookmarkUpdateProperties;
  /** 更新対象IDです。 */
  readonly id: string;
}

/** Chrome Bookmarks mutation API記録fixtureです。 */
interface RecordingMutationApi {
  /** 作成要求一覧です。 */
  readonly createdFolders: readonly ChromeBookmarkCreateProperties[];
  /** Chrome Bookmarks mutation API fixtureです。 */
  readonly bookmarksApi: ChromeBookmarksMutationApi;
  /** 移動要求一覧です。 */
  readonly movedEntries: readonly MoveCall[];
  /** 削除要求一覧です。 */
  readonly removedEntries: readonly string[];
  /** 更新要求一覧です。 */
  readonly updatedEntries: readonly UpdateCall[];
}

/**
 * 作成済みfolder node fixtureを作ります。
 * @param {ChromeBookmarkCreateProperties} input 作成入力です。
 * @returns {RawBookmarkTreeNode} 作成済みfolder nodeです。
 */
const createFolderNode = (input: ChromeBookmarkCreateProperties): RawBookmarkTreeNode => ({
  id: "200",
  parentId: input.parentId ?? "",
  title: input.title,
});

/**
 * Bookmark node fixtureを作ります。
 * @param {string} parentId parent folder IDです。
 * @param {string} title Bookmark titleです。
 * @returns {RawBookmarkTreeNode} Bookmark nodeです。
 */
const createBookmarkNode = (parentId: string, title: string): RawBookmarkTreeNode => ({
  id: targetBookmarkId,
  parentId,
  title,
  url: targetUrl,
});

/**
 * 空のBookmark Tree node一覧を返します。
 * @returns {Promise<readonly RawBookmarkTreeNode[]>} 空のBookmark Tree node一覧です。
 */
const getEmptyTree = async (): Promise<readonly RawBookmarkTreeNode[]> => {
  await Promise.resolve();

  return [];
};

/**
 * Chrome Bookmarks mutation API fixtureを作ります。
 * @returns {RecordingMutationApi} Chrome Bookmarks mutation API fixtureです。
 */
// oxlint-disable-next-line max-lines-per-function
const createRecordingMutationApi = (): RecordingMutationApi => {
  const createdFolders: ChromeBookmarkCreateProperties[] = [];
  const movedEntries: MoveCall[] = [];
  const removedEntries: string[] = [];
  const updatedEntries: UpdateCall[] = [];

  /**
   * Chrome Bookmark作成入力を記録します。
   * @param {ChromeBookmarkCreateProperties} input 作成入力です。
   * @returns {Promise<RawBookmarkTreeNode>} 作成済みnodeです。
   */
  const create = async (input: ChromeBookmarkCreateProperties): Promise<RawBookmarkTreeNode> => {
    createdFolders.push(input);
    await Promise.resolve();

    return createFolderNode(input);
  };
  /**
   * Chrome Bookmark移動入力を記録します。
   * @param {string} id 移動対象IDです。
   * @param {ChromeBookmarkMoveDestination} destination 移動先指定です。
   * @returns {Promise<RawBookmarkTreeNode>} 移動済みnodeです。
   */
  const move = async (
    id: string,
    destination: ChromeBookmarkMoveDestination,
  ): Promise<RawBookmarkTreeNode> => {
    movedEntries.push({ destination, id });
    await Promise.resolve();

    return createBookmarkNode(destination.parentId ?? "", bookmarkTitle);
  };
  /**
   * Chrome Bookmark削除入力を記録します。
   * @param {string} id 削除対象IDです。
   * @returns {Promise<void>} 完了Promiseです。
   */
  const remove = async (id: string): Promise<void> => {
    removedEntries.push(id);
    await Promise.resolve();
  };
  /**
   * Chrome Bookmark更新入力を記録します。
   * @param {string} id 更新対象IDです。
   * @param {ChromeBookmarkUpdateProperties} changes 更新内容です。
   * @returns {Promise<RawBookmarkTreeNode>} 更新済みnodeです。
   */
  const update = async (
    id: string,
    changes: ChromeBookmarkUpdateProperties,
  ): Promise<RawBookmarkTreeNode> => {
    updatedEntries.push({ changes, id });
    await Promise.resolve();

    return createBookmarkNode(targetParentId, changes.title);
  };

  return {
    bookmarksApi: { create, getTree: getEmptyTree, move, remove, update },
    createdFolders,
    movedEntries,
    removedEntries,
    updatedEntries,
  };
};

/**
 * Chrome Bookmark organizer create adapterのテストスイートです。
 */
describe("createChromeBookmarkOrganizer create", (): void => {
  /**
   * Chrome Bookmarks APIでfolderを作成できることを検証します。
   */
  it("creates folder through Chrome Bookmarks API", async (): Promise<void> => {
    const recordingApi = createRecordingMutationApi();
    const organizer = createChromeBookmarkOrganizer(recordingApi.bookmarksApi);

    const entry = await organizer.createFolder({ parentId: targetParentId, title: folderTitle });

    expect(recordingApi.createdFolders).toStrictEqual([
      { parentId: targetParentId, title: folderTitle },
    ]);
    expect(entry).toMatchObject({ id: "200", parentId: targetParentId, title: folderTitle });
  });
});

/**
 * Chrome Bookmark organizer mutation adapterのテストスイートです。
 */
describe("createChromeBookmarkOrganizer mutation", (): void => {
  /**
   * Chrome Bookmarks APIでBookmarkを移動できることを検証します。
   */
  it("moves bookmark through Chrome Bookmarks API", async (): Promise<void> => {
    const recordingApi = createRecordingMutationApi();
    const organizer = createChromeBookmarkOrganizer(recordingApi.bookmarksApi);

    const entry = await organizer.moveEntry({ id: targetBookmarkId, parentId: targetParentId });

    expect(recordingApi.movedEntries).toStrictEqual([
      { destination: { parentId: targetParentId }, id: targetBookmarkId },
    ]);
    expect(entry).toMatchObject({ id: targetBookmarkId, parentId: targetParentId });
  });

  /**
   * Chrome Bookmarks APIでBookmarkを削除できることを検証します。
   */
  it("removes bookmark through Chrome Bookmarks API", async (): Promise<void> => {
    const recordingApi = createRecordingMutationApi();
    const organizer = createChromeBookmarkOrganizer(recordingApi.bookmarksApi);

    await organizer.removeEntry({ id: targetBookmarkId });

    expect(recordingApi.removedEntries).toStrictEqual([targetBookmarkId]);
  });

  /**
   * Chrome Bookmarks APIでBookmark名を変更できることを検証します。
   */
  it("renames bookmark through Chrome Bookmarks API", async (): Promise<void> => {
    const recordingApi = createRecordingMutationApi();
    const organizer = createChromeBookmarkOrganizer(recordingApi.bookmarksApi);

    const entry = await organizer.renameEntry({ id: targetBookmarkId, title: renamedTitle });

    expect(recordingApi.updatedEntries).toStrictEqual([
      { changes: { title: renamedTitle }, id: targetBookmarkId },
    ]);
    expect(entry).toMatchObject({ id: targetBookmarkId, title: renamedTitle });
  });
});
