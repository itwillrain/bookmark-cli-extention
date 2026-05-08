/**
 * Bookmark CLI help topic。
 */
export interface BookmarkCliHelpTopic {
  /**
   * Command名。
   */
  readonly commandName: string;
  /**
   * Command説明。
   */
  readonly description: string;
  /**
   * 実行例。
   */
  readonly examples: readonly string[];
  /**
   * Usage表記。
   */
  readonly usage: readonly string[];
}

/** Help topic未検出の値。 */
const helpTopicMissing = false;

/** 空のtopic入力。 */
const emptyTopicInput = "";

/** Bookmark CLI help topic一覧。 */
const bookmarkCliHelpTopics = [
  {
    commandName: "alias",
    description: "command aliasを表示または設定する",
    examples: ["alias", "alias g=go", "alias la='ls -la'"],
    usage: ["alias", "alias <name>=<command>"],
  },
  {
    commandName: "unalias",
    description: "command aliasを削除する",
    examples: ["unalias g", "unalias la"],
    usage: ["unalias <name>"],
  },
  {
    commandName: "abbr",
    description: "空白またはEnter確定時に展開するcommand abbreviationを表示または設定する",
    examples: ["abbr", "abbr g=go", "abbr la='ls -la'"],
    usage: ["abbr", "abbr <name>=<command>"],
  },
  {
    commandName: "unabbr",
    description: "command abbreviationを削除する",
    examples: ["unabbr g", "unabbr la"],
    usage: ["unabbr <name>"],
  },
  {
    commandName: "go",
    description: "Bookmarkを検索して開く",
    examples: ["go stripe bill", "go #prod admin", "go 3", "go -l stripe"],
    usage: ["go <query>", "go <result-number>", "go [-l] <query>"],
  },
  {
    commandName: "find",
    description: "Bookmarkを検索して一覧表示する",
    examples: ["find stripe", "find #finance stripe", "find -l stripe"],
    usage: ["find [-l] <query>"],
  },
  {
    commandName: "history",
    description: "Chrome履歴を一覧表示しfind/goの検索候補として扱う",
    examples: ["history", "history docs", "history | grep github", "go 3"],
    usage: [
      "history [query] [--limit <number>]",
      "go <query> can open a history URL",
      "#tag queries search bookmarks only",
    ],
  },
  {
    commandName: "grep",
    description: "pipeで結果一覧を絞り込む",
    examples: ["ls | grep stripe", "find docs | grep github"],
    usage: ["<result-command> | grep <query>", "<result-command> | grep <query> | grep <query>"],
  },
  {
    commandName: "copy",
    description: "直前結果またはpipe出力をclipboardへcopyする",
    examples: ["copy 1", "copy --path 1", "copy --title 1", "pwd | copy", "ls | copy"],
    usage: ["copy [--url|--path|--title] <result-number>", "pwd | copy", "<result-command> | copy"],
  },
  {
    commandName: "ls",
    description: "現在ディレクトリの中身を表示する",
    examples: ["ls", "ls -a", "ls -la Work/Admin", "ll -a"],
    usage: ["ls [-a] [-l] [path]", "ll [-a] [path]"],
  },
  {
    commandName: "ll",
    description: "現在ディレクトリの中身を詳細表示する",
    examples: ["ll", "ll -a Work/Admin"],
    usage: ["ll [-a] [path]"],
  },
  {
    commandName: "cd",
    description: "現在ディレクトリを移動する",
    examples: ["cd", "cd Work/Admin", "cd ../Research", "cd 2"],
    usage: ["cd [path-or-index]"],
  },
  {
    commandName: "pwd",
    description: "現在ディレクトリを表示する",
    examples: ["pwd"],
    usage: ["pwd"],
  },
  {
    commandName: "tree",
    description: "Bookmark Treeを階層表示する",
    examples: ["tree", "tree Work", "tree -d Work", "tree --depth 3"],
    usage: ["tree [-d] [path] [--depth <number>]"],
  },
  {
    commandName: "help",
    description: "コマンド一覧または指定commandの説明を表示する",
    examples: ["help", "help go", "man ls", "go --help"],
    usage: ["help [command]", "man <command>", "<command> --help", "<command> -h"],
  },
  {
    commandName: "clear",
    description: "画面上のscrollback transcriptを消す",
    examples: ["clear"],
    usage: ["clear"],
  },
  {
    commandName: "mark",
    description: "CLI起動元タブをBookmarkへ保存する",
    examples: [
      "mark",
      'mark ""',
      "mark --to Work/Admin",
      'mark "Production Admin" --to Work/Admin',
    ],
    usage: ["mark [title] [--to <path>] [--allow-duplicate]", 'mark "" [--to <path>]'],
  },
  {
    commandName: "tag",
    description: "直前結果へ仮想tagを追加または削除する",
    examples: ["tag 3 prod finance", "tag 3 --remove prod"],
    usage: ["tag <result-number> <tag...>", "tag <result-number> --remove <tag...>"],
  },
  {
    commandName: "mkdir",
    description: "Folderを追加する",
    examples: ["mkdir Work/Admin", "mkdir Archive"],
    usage: ["mkdir <path>"],
  },
  {
    commandName: "mv",
    description: "Bookmarkまたはfolderを移動する",
    examples: ["mv 3 Archive", "mv 3 Work/Admin"],
    usage: ["mv <result-number> <target-folder-path>"],
  },
  {
    commandName: "rm",
    description: "Bookmarkまたはfolderを削除する",
    examples: ["rm 3", "rm ./Stripe Dashboard", "rm -r ./Archive", "rm -rf ./Archive"],
    usage: [
      "rm <path-or-index>",
      "rm -f <path-or-index>",
      "rm -r <path-or-index>",
      "rm -rf <path-or-index>",
    ],
  },
  {
    commandName: "rename",
    description: "Bookmarkまたはfolderのtitleを変更する",
    examples: ['rename 3 "Stripe Billing"', 'rename 3 "GitHub Pull Requests"'],
    usage: ["rename <result-number> <new-title>"],
  },
  {
    commandName: "recent",
    description: "最近開いたBookmarkを表示する",
    examples: ["recent", "recent --limit 20"],
    usage: ["recent [--limit <number>]"],
  },
  {
    commandName: "freq",
    description: "よく開くBookmarkを表示する",
    examples: ["freq", "freq --limit 20"],
    usage: ["freq [--limit <number>]"],
  },
] as const satisfies readonly BookmarkCliHelpTopic[];

/**
 * Help topic入力を検索用に正規化。
 * @param {string} topicInput Help topic入力。
 * @returns {string} 正規化済みtopic入力。
 */
const normalizeHelpTopicInput = (topicInput: string): string => topicInput.trim().toLowerCase();

/**
 * Bookmark CLI help topic一覧を返す。
 * @returns {readonly BookmarkCliHelpTopic[]} Help topic一覧。
 * @example
 * ```ts
 * const result = listBookmarkCliHelpTopics();
 * ```
 */
export const listBookmarkCliHelpTopics = (): readonly BookmarkCliHelpTopic[] =>
  bookmarkCliHelpTopics;

/**
 * Command名に対応するhelp topicを探す。
 * @param {string} topicInput Help topic入力。
 * @returns {BookmarkCliHelpTopic | false} Help topic。未検出ならfalse。
 * @example
 * ```ts
 * const result = findBookmarkCliHelpTopic(topicInput);
 * ```
 */
export const findBookmarkCliHelpTopic = (
  topicInput: string,
): BookmarkCliHelpTopic | typeof helpTopicMissing => {
  const normalizedTopicInput = normalizeHelpTopicInput(topicInput);

  if (normalizedTopicInput === emptyTopicInput) {
    return helpTopicMissing;
  }

  return (
    bookmarkCliHelpTopics.find((topic) => topic.commandName === normalizedTopicInput) ??
    helpTopicMissing
  );
};
