import type {
  OrganizeBookmarkBaseInput,
  OrganizeBookmarkResult,
} from "./bookmark-organization-use-case-types";
import {
  createFolderNotFoundFailure,
  createOrganizeBookmarkValue,
  createParentId,
  createSuccess,
  getFolderName,
} from "./bookmark-organization-use-case-helpers";
import { getParentFolderPath, resolveFolderPath } from "../../domain/bookmarks/current-directory";
import { doesFolderPathExist } from "../../domain/bookmarks/bookmark-directory";

/** Folder作成use case入力。 */
export interface MakeDirectoryInput extends OrganizeBookmarkBaseInput {
  /** 作成するfolder path入力。 */
  readonly pathInput: string;
}

/** 空文字。 */
const emptyString = "";

/** Folder作成context。 */
interface MakeDirectoryContext {
  /** Bookmark Tree。 */
  readonly bookmarkTree: Awaited<ReturnType<MakeDirectoryInput["repository"]["getBookmarkTree"]>>;
  /** 作成するfolder名。 */
  readonly folderName: string;
  /** 作成するfolder path。 */
  readonly folderPath: ReturnType<typeof resolveFolderPath>;
  /** 親folder path。 */
  readonly parentFolderPath: ReturnType<typeof getParentFolderPath>;
}

/**
 * Folder作成contextを作成。
 * @param {MakeDirectoryInput} input Folder作成use case入力。
 * @returns {Promise<MakeDirectoryContext>} Folder作成context。
 */
const createMakeDirectoryContext = async (
  input: MakeDirectoryInput,
): Promise<MakeDirectoryContext> => {
  const bookmarkTree = await input.repository.getBookmarkTree();
  const folderPath = resolveFolderPath(input.currentDirectory, input.pathInput);
  const parentFolderPath = getParentFolderPath(folderPath);

  return {
    bookmarkTree,
    folderName: getFolderName(folderPath),
    folderPath,
    parentFolderPath,
  };
};

/**
 * Folder作成contextが有効かを判定。
 * @param {MakeDirectoryContext} context Folder作成context。
 * @returns {boolean} 有効ならtrue。
 */
const isMakeDirectoryContextValid = (context: MakeDirectoryContext): boolean =>
  doesFolderPathExist(context.bookmarkTree, context.parentFolderPath) &&
  context.folderName !== emptyString;

/**
 * Folderを作成。
 * @param {MakeDirectoryInput} input Folder作成use case入力。
 * @returns {Promise<OrganizeBookmarkResult>} Folder作成結果。
 */
export const makeDirectory = async (input: MakeDirectoryInput): Promise<OrganizeBookmarkResult> => {
  const context = await createMakeDirectoryContext(input);

  if (!isMakeDirectoryContextValid(context)) {
    return createFolderNotFoundFailure(context.parentFolderPath);
  }

  const entry = await input.organizer.createFolder({
    parentId: createParentId(context.bookmarkTree, context.parentFolderPath),
    title: context.folderName,
  });

  return createSuccess(createOrganizeBookmarkValue(true, [entry]));
};
