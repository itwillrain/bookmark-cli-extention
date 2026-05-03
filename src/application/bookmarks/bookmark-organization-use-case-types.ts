import type { BookmarkCommandResult, BookmarkRepositoryPort } from "./bookmark-use-cases";
import type { BookmarkEntry } from "../../domain/bookmarks/bookmark-tree";
import type { BookmarkOrganizationPreview } from "../../domain/bookmarks/bookmark-organization-preview";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";

/** Folder作成入力。 */
export interface CreateFolderInput {
  /** 作成先parent folder ID。 */
  readonly parentId?: string;
  /** Folder title。 */
  readonly title: string;
}

/** Entry移動入力。 */
export interface MoveEntryInput {
  /** 移動対象Bookmark ID。 */
  readonly id: string;
  /** 移動先parent folder ID。 */
  readonly parentId?: string;
}

/** Entry削除入力。 */
export interface RemoveEntryInput {
  /** 削除対象Bookmark ID。 */
  readonly id: string;
}

/** Entry名称変更入力。 */
export interface RenameEntryInput {
  /** 変更対象Bookmark ID。 */
  readonly id: string;
  /** 変更後title。 */
  readonly title: string;
}

/** Bookmark整理port。 */
export interface BookmarkOrganizerPort {
  /** Folderを作成。 */
  readonly createFolder: (input: CreateFolderInput) => Promise<BookmarkEntry>;
  /** Bookmarkを移動。 */
  readonly moveEntry: (input: MoveEntryInput) => Promise<BookmarkEntry>;
  /** Bookmarkを削除。 */
  readonly removeEntry: (input: RemoveEntryInput) => Promise<void>;
  /** Bookmark名を変更。 */
  readonly renameEntry: (input: RenameEntryInput) => Promise<BookmarkEntry>;
}

/** Bookmark整理共通入力。 */
export interface OrganizeBookmarkBaseInput {
  /** 現在ディレクトリ。 */
  readonly currentDirectory: CurrentDirectory;
  /** Bookmark整理port。 */
  readonly organizer: BookmarkOrganizerPort;
  /** Previewだけ表示するか。 */
  readonly preview: boolean;
  /** Bookmark Tree repository port。 */
  readonly repository: BookmarkRepositoryPort;
  /** 確認済みとして実行するか。 */
  readonly yes: boolean;
}

/** Bookmark整理成功値。 */
export interface OrganizeBookmarkValue {
  /** 書き込み済みならtrue。 */
  readonly executed: boolean;
  /** 表示対象entry一覧。 */
  readonly entries: readonly BookmarkEntry[];
  /** 整理操作preview。 */
  readonly preview: BookmarkOrganizationPreview;
}

/** Bookmark整理use case実行結果。 */
export type OrganizeBookmarkResult = BookmarkCommandResult<OrganizeBookmarkValue>;
