import type {
  BookmarkOrganizerPort,
  CreateFolderInput,
  MoveEntryInput,
  RemoveEntryInput,
  RenameEntryInput,
} from "./organize-bookmark-use-case";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";

/** 書き込み記録fixture。 */
export interface RecordingOrganizer {
  /** 作成要求一覧。 */
  readonly createdFolders: readonly CreateFolderInput[];
  /** 移動要求一覧。 */
  readonly movedEntries: readonly MoveEntryInput[];
  /** 削除要求一覧。 */
  readonly removedEntries: readonly RemoveEntryInput[];
  /** 名称変更要求一覧。 */
  readonly renamedEntries: readonly RenameEntryInput[];
  /** Bookmark整理port。 */
  readonly organizer: BookmarkOrganizerPort;
}

/** Recording organizer fixture入力。 */
export interface RecordingOrganizerInput {
  /** 作成済みfolderとして返すentry。 */
  readonly archiveFolderEntry: BookmarkEntry;
  /** 操作済みBookmarkとして返すentry。 */
  readonly stripeBookmarkEntry: BookmarkEntry;
}

/**
 * 書き込みを記録するorganizer fixtureを作成。
 * @param {RecordingOrganizerInput} input Recording organizer fixture入力。
 * @returns {RecordingOrganizer} organizer fixture。
 */
// oxlint-disable-next-line max-lines-per-function
export const createRecordingOrganizer = (input: RecordingOrganizerInput): RecordingOrganizer => {
  const createdFolders: CreateFolderInput[] = [];
  const movedEntries: MoveEntryInput[] = [];
  const removedEntries: RemoveEntryInput[] = [];
  const renamedEntries: RenameEntryInput[] = [];

  return {
    createdFolders,
    movedEntries,
    organizer: {
      /**
       * Folder作成要求を記録。
       * @param {CreateFolderInput} createInput Folder作成入力。
       * @returns {Promise<BookmarkEntry>} 作成済みfolder entry。
       */
      createFolder: async (createInput: CreateFolderInput): Promise<BookmarkEntry> => {
        createdFolders.push(createInput);
        await Promise.resolve();

        return { ...input.archiveFolderEntry, id: "100", title: createInput.title };
      },
      /**
       * Bookmark移動要求を記録。
       * @param {MoveEntryInput} moveInput Bookmark移動入力。
       * @returns {Promise<BookmarkEntry>} 移動済みBookmark entry。
       */
      moveEntry: async (moveInput: MoveEntryInput): Promise<BookmarkEntry> => {
        movedEntries.push(moveInput);
        await Promise.resolve();

        return { ...input.stripeBookmarkEntry, folderPath: "/Work/Archive", parentId: "11" };
      },
      /**
       * Bookmark削除要求を記録。
       * @param {RemoveEntryInput} removeInput Bookmark削除入力。
       * @returns {Promise<void>} 完了Promise。
       */
      removeEntry: async (removeInput: RemoveEntryInput): Promise<void> => {
        removedEntries.push(removeInput);
        await Promise.resolve();
      },
      /**
       * Bookmark名称変更要求を記録。
       * @param {RenameEntryInput} renameInput Bookmark名称変更入力。
       * @returns {Promise<BookmarkEntry>} 名称変更済みBookmark entry。
       */
      renameEntry: async (renameInput: RenameEntryInput): Promise<BookmarkEntry> => {
        renamedEntries.push(renameInput);
        await Promise.resolve();

        return { ...input.stripeBookmarkEntry, title: renameInput.title };
      },
    },
    removedEntries,
    renamedEntries,
  };
};
