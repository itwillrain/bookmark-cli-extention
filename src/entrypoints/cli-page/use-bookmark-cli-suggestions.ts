import {
  canSuggestBookmarkDirectoryPaths,
  suggestBookmarkDirectoryPaths,
} from "../../application/commands/bookmark-directory-suggestion";
import { useEffect, useState } from "react";
import type { BookmarkCliSuggestionItem } from "../../presentation/cli/components/bookmark-cli-suggestion-list";
import type { BookmarkRepositoryPort } from "../../application/bookmarks/bookmark-use-cases";
import type { CurrentDirectory } from "../../domain/bookmarks/current-directory";
import { suggestBookmarkCommands } from "../../application/commands/bookmark-command-suggestion";

/** 空のsuggestion一覧。 */
const emptySuggestionItems = [] as const satisfies readonly BookmarkCliSuggestionItem[];

/** Bookmark CLI suggestion hook入力。 */
export interface UseBookmarkCliSuggestionsInput {
  /** 現在ディレクトリ。 */
  readonly currentDirectory: CurrentDirectory;
  /** 現在のCLI入力値。 */
  readonly inputValue: string;
  /** Bookmark Tree取得port。 */
  readonly repository: BookmarkRepositoryPort;
}

/**
 * Suggestion一覧が存在するかを判定。
 * @param {readonly BookmarkCliSuggestionItem[]} suggestionItems suggestion一覧。
 * @returns {boolean} suggestionがあればtrue。
 */
const hasSuggestionItems = (suggestionItems: readonly BookmarkCliSuggestionItem[]): boolean =>
  suggestionItems.length > emptySuggestionItems.length;

/** Suggestion setter。 */
type SuggestionItemsSetter = (suggestionItems: readonly BookmarkCliSuggestionItem[]) => void;

/** Directory suggestion loader入力。 */
interface LoadDirectorySuggestionsInput extends UseBookmarkCliSuggestionsInput {
  /** Effectがactiveかを返す関数。 */
  readonly isActive: () => boolean;
  /** Directory suggestion setter。 */
  readonly setDirectorySuggestionItems: SuggestionItemsSetter;
}

/**
 * Directory suggestionを非同期に読み込む。
 * @param {LoadDirectorySuggestionsInput} input Directory suggestion loader入力。
 * @returns {void} 返り値なし。
 */
const loadDirectorySuggestions = (input: LoadDirectorySuggestionsInput): void => {
  input.repository
    .getBookmarkTree()
    .then((bookmarkTree) => {
      if (!input.isActive()) {
        return;
      }

      input.setDirectorySuggestionItems(
        suggestBookmarkDirectoryPaths({
          bookmarkTree,
          currentDirectory: input.currentDirectory,
          inputValue: input.inputValue,
        }),
      );
    })
    .catch(() => {
      if (input.isActive()) {
        input.setDirectorySuggestionItems(emptySuggestionItems);
      }
    });
};

/**
 * Directory suggestionを使うべきか判定。
 * @param {UseBookmarkCliSuggestionsInput} input Bookmark CLI suggestion hook入力。
 * @param {readonly BookmarkCliSuggestionItem[]} commandSuggestionItems command suggestion一覧。
 * @returns {boolean} Directory suggestionを使うならtrue。
 */
const shouldUseDirectorySuggestions = (
  input: UseBookmarkCliSuggestionsInput,
  commandSuggestionItems: readonly BookmarkCliSuggestionItem[],
): boolean =>
  !hasSuggestionItems(commandSuggestionItems) && canSuggestBookmarkDirectoryPaths(input.inputValue);

/**
 * Directory suggestion一覧を返す。
 * @param {UseBookmarkCliSuggestionsInput} input Bookmark CLI suggestion hook入力。
 * @param {readonly BookmarkCliSuggestionItem[]} commandSuggestionItems command suggestion一覧。
 * @returns {readonly BookmarkCliSuggestionItem[]} Directory suggestion一覧。
 */
const useDirectorySuggestionItems = (
  input: UseBookmarkCliSuggestionsInput,
  commandSuggestionItems: readonly BookmarkCliSuggestionItem[],
): readonly BookmarkCliSuggestionItem[] => {
  const [directorySuggestionItems, setDirectorySuggestionItems] =
    useState<readonly BookmarkCliSuggestionItem[]>(emptySuggestionItems);

  useEffect((): (() => void) => {
    let active = true;

    /**
     * Effectがactiveかを返す。
     * @returns {boolean} activeならtrue。
     */
    const isActive = (): boolean => active;

    if (!shouldUseDirectorySuggestions(input, commandSuggestionItems)) {
      setDirectorySuggestionItems(emptySuggestionItems);

      return (): void => {
        active = false;
      };
    }

    loadDirectorySuggestions({
      ...input,
      isActive,
      setDirectorySuggestionItems,
    });

    return (): void => {
      active = false;
    };
  }, [commandSuggestionItems.length, input.currentDirectory, input.inputValue, input.repository]);

  return directorySuggestionItems;
};

/**
 * Bookmark CLI suggestionを返す。
 * @param {UseBookmarkCliSuggestionsInput} input Bookmark CLI suggestion hook入力。
 * @returns {readonly BookmarkCliSuggestionItem[]} Bookmark CLI suggestion一覧。
 */
export const useBookmarkCliSuggestions = (
  input: UseBookmarkCliSuggestionsInput,
): readonly BookmarkCliSuggestionItem[] => {
  const commandSuggestionItems = suggestBookmarkCommands(input.inputValue);
  const directorySuggestionItems = useDirectorySuggestionItems(input, commandSuggestionItems);

  if (hasSuggestionItems(commandSuggestionItems)) {
    return commandSuggestionItems;
  }

  return directorySuggestionItems;
};
