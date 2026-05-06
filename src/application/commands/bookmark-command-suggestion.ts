import { type CommandAlias, normalizeCommandAliases } from "../../domain/cli/command-alias";

/**
 * Bookmark CLI command suggestion。
 */
export interface BookmarkCommandSuggestion {
  /** Command名。 */
  readonly commandName: string;
  /** 補完後の入力値。 */
  readonly completion: string;
  /** Command説明。 */
  readonly description: string;
}

/** Bookmark CLI command catalog item。 */
type BookmarkCommandCatalogItem = Omit<BookmarkCommandSuggestion, "completion">;

/** 空文字。 */
const emptyString = "";

/** Command補完後のsuffix。 */
const commandCompletionSuffix = " ";

/** 最大suggestion件数。 */
const maxSuggestionCount = 6;

/** 先頭token index。 */
const firstTokenIndex = 0;

/** Slice開始index。 */
const sliceStartIndex = 0;

/** 空白を含む入力か判定する正規表現。 */
const commandArgumentInputPattern = /\S+\s/u;

/** 連続空白に一致する正規表現。 */
const whitespacePattern = /\s+/u;

/** Bookmark CLI command一覧。 */
const bookmarkCommandCatalog = [
  {
    commandName: "alias",
    description: "command aliasを表示または設定",
  },
  {
    commandName: "unalias",
    description: "command aliasを削除",
  },
  {
    commandName: "abbr",
    description: "command abbreviationを表示または設定",
  },
  {
    commandName: "unabbr",
    description: "command abbreviationを削除",
  },
  {
    commandName: "find",
    description: "Bookmarkを検索",
  },
  {
    commandName: "go",
    description: "検索上位のBookmarkを開く",
  },
  {
    commandName: "ls",
    description: "現在または指定folderを一覧表示",
  },
  {
    commandName: "ll",
    description: "詳細形式でfolderを一覧表示",
  },
  {
    commandName: "cd",
    description: "現在folderを移動",
  },
  {
    commandName: "pwd",
    description: "現在folderを表示",
  },
  {
    commandName: "tree",
    description: "folder treeを表示",
  },
  {
    commandName: "clear",
    description: "画面上の実行結果を消す",
  },
  {
    commandName: "help",
    description: "コマンドの使い方を表示",
  },
  {
    commandName: "history",
    description: "Chrome履歴を表示",
  },
  {
    commandName: "mark",
    description: "現在tabをBookmarkに保存",
  },
  {
    commandName: "tag",
    description: "直前結果へ仮想tagを追加または削除",
  },
  {
    commandName: "mkdir",
    description: "folderを作成",
  },
  {
    commandName: "mv",
    description: "Bookmarkを移動",
  },
  {
    commandName: "rm",
    description: "Bookmarkまたはfolderを削除",
  },
  {
    commandName: "rename",
    description: "Bookmark titleを変更",
  },
  {
    commandName: "recent",
    description: "最近開いたBookmarkを表示",
  },
  {
    commandName: "freq",
    description: "よく開くBookmarkを表示",
  },
] as const satisfies readonly BookmarkCommandCatalogItem[];

/**
 * Command aliasをcommand suggestion catalog itemへ変換。
 * @param {CommandAlias} alias command alias。
 * @returns {BookmarkCommandCatalogItem} Command suggestion catalog item。
 */
const createAliasCommandCatalogItem = (alias: CommandAlias): BookmarkCommandCatalogItem => ({
  commandName: alias.name,
  description: `alias: ${alias.command}`,
});

/**
 * Command abbreviationをcommand suggestion catalog itemへ変換。
 * @param {CommandAlias} abbreviation command abbreviation。
 * @returns {BookmarkCommandCatalogItem} Command suggestion catalog item。
 */
const createAbbreviationCommandCatalogItem = (
  abbreviation: CommandAlias,
): BookmarkCommandCatalogItem => ({
  commandName: abbreviation.name,
  description: `abbr: ${abbreviation.command}`,
});

/**
 * Command catalog itemをsuggestionへ変換。
 * @param {BookmarkCommandCatalogItem} item command catalog item。
 * @returns {BookmarkCommandSuggestion} Command suggestion。
 */
const createBookmarkCommandSuggestion = (
  item: BookmarkCommandCatalogItem,
): BookmarkCommandSuggestion => ({
  ...item,
  completion: `${item.commandName}${commandCompletionSuffix}`,
});

/**
 * 入力済みcommand名tokenを取り出す。
 * @param {string} inputValue CLI入力値。
 * @returns {string} Command名候補token。
 */
const extractCommandPrefix = (inputValue: string): string =>
  inputValue.trimStart().split(whitespacePattern)[firstTokenIndex] ?? emptyString;

/**
 * Command引数入力に到達しているかを判定。
 * @param {string} inputValue CLI入力値。
 * @returns {boolean} 引数入力中ならtrue。
 */
const hasCommandArgumentInput = (inputValue: string): boolean =>
  commandArgumentInputPattern.test(inputValue.trimStart());

/**
 * Command名がprefixに一致するかを判定。
 * @param {BookmarkCommandSuggestion} suggestion Command suggestion。
 * @param {string} commandPrefix Command prefix。
 * @returns {boolean} 一致するならtrue。
 */
const commandSuggestionMatchesPrefix = (
  suggestion: BookmarkCommandSuggestion,
  commandPrefix: string,
): boolean => suggestion.commandName.startsWith(commandPrefix.toLowerCase());

/**
 * Command suggestionを開始できる入力かを判定。
 * @param {string} commandPrefix Command prefix。
 * @returns {boolean} Suggestion開始可能ならtrue。
 */
const canStartCommandSuggestion = (commandPrefix: string): boolean => commandPrefix !== emptyString;

/**
 * Bookmark CLI command suggestionを返す。
 * @param {string} inputValue CLI入力値。
 * @param {readonly CommandAlias[]} aliases command alias一覧。
 * @param {readonly CommandAlias[]} abbreviations command abbreviation一覧。
 * @returns {readonly BookmarkCommandSuggestion[]} Command suggestion一覧。
 * @example
 * ```ts
 * const result = suggestBookmarkCommands(inputValue, aliases, abbreviations);
 * ```
 */
export const suggestBookmarkCommands = (
  inputValue: string,
  aliases: readonly CommandAlias[] = [],
  abbreviations: readonly CommandAlias[] = [],
): readonly BookmarkCommandSuggestion[] => {
  if (hasCommandArgumentInput(inputValue)) {
    return [];
  }

  const commandPrefix = extractCommandPrefix(inputValue);

  if (!canStartCommandSuggestion(commandPrefix)) {
    return [];
  }

  return [
    ...normalizeCommandAliases(aliases).map((alias) => createAliasCommandCatalogItem(alias)),
    ...normalizeCommandAliases(abbreviations).map((abbreviation) =>
      createAbbreviationCommandCatalogItem(abbreviation),
    ),
    ...bookmarkCommandCatalog,
  ]
    .map((item) => createBookmarkCommandSuggestion(item))
    .filter((suggestion) => commandSuggestionMatchesPrefix(suggestion, commandPrefix))
    .slice(sliceStartIndex, maxSuggestionCount);
};
