import { type CommandParseContext, getBookmarkCommandFactory } from "./bookmark-command-factory";
import type {
  GrepPipeStageCommand,
  ParsedBookmarkCommand,
  PipeBookmarkCommand,
  PipeSourceBookmarkCommand,
  PipeStageCommand,
  UnknownBookmarkCommand,
} from "./bookmark-command-types";

export type * from "./bookmark-command-types";

/** 空command名です。 */
const emptyCommandName = "";

/** Pipe operatorです。 */
const pipeOperator = "|";

/** Grep command名です。 */
const grepCommandName = "grep";

/** Copy command名です。 */
const copyCommandName = "copy";

/** 空のpipe stage数です。 */
const emptyPipeStageCount = 0;

/** Command tokenの区切り文字です。 */
const commandTokenSeparator = " ";

/** 連続した空白文字に一致する正規表現です。 */
const whitespacePattern = /\s+/gu;

/**
 * 入力文字列の空白をCLI向けに正規化します。
 * @param {string} input 正規化する入力です。
 * @returns {string} 正規化済み入力です。
 */
const normalizeCommandInput = (input: string): string =>
  input.trim().replace(whitespacePattern, commandTokenSeparator);

/**
 * 入力にpipe operatorが含まれるかを判定します。
 * @param {string} input 判定する入力です。
 * @returns {boolean} pipe operatorを含むならtrueです。
 */
const hasPipeOperator = (input: string): boolean => input.includes(pipeOperator);

/**
 * Pipe入力をsegmentへ分割します。
 * @param {string} normalizedInput 正規化済み入力です。
 * @returns {readonly string[]} 正規化済みpipe segment一覧です。
 */
const splitPipeSegments = (normalizedInput: string): readonly string[] =>
  normalizedInput.split(pipeOperator).map((segment) => normalizeCommandInput(segment));

/**
 * Command token一覧からquery部分を取り出します。
 * @param {readonly string[]} queryParts command名を除いたtoken一覧です。
 * @returns {string} Query文字列です。
 */
const joinQueryParts = (queryParts: readonly string[]): string =>
  queryParts.join(commandTokenSeparator);

/**
 * Command parse contextを作ります。
 * @param {string} normalizedInput 正規化済み入力です。
 * @returns {CommandParseContext} Command parse contextです。
 */
const createCommandParseContext = (normalizedInput: string): CommandParseContext => {
  const [commandName = emptyCommandName, ...queryParts] =
    normalizedInput.split(commandTokenSeparator);
  const query = joinQueryParts(queryParts);

  return {
    commandName,
    normalizedInput,
    query,
    queryParts,
  };
};

/**
 * Unknown commandを作成します。
 * @param {string} commandName command名です。
 * @param {string} rawInput 正規化済み入力全体です。
 * @returns {UnknownBookmarkCommand} Unknown commandです。
 */
const createUnknownCommand = (commandName: string, rawInput: string): UnknownBookmarkCommand => ({
  commandName,
  kind: "unknown",
  rawInput,
});

/**
 * 値がUnknown commandかを判定します。
 * @param {UnknownBookmarkCommand | readonly PipeStageCommand[]} value 判定する値です。
 * @returns {boolean} Unknown commandならtrueです。
 */
const isUnknownBookmarkCommand = (
  value: UnknownBookmarkCommand | readonly PipeStageCommand[],
): value is UnknownBookmarkCommand => !Array.isArray(value);

/**
 * Commandがpipe sourceとして使えるかを判定します。
 * @param {ParsedBookmarkCommand} command 判定するcommandです。
 * @returns {boolean} pipe sourceとして使えるならtrueです。
 */
const isPipeSourceBookmarkCommand = (
  command: ParsedBookmarkCommand,
): command is PipeSourceBookmarkCommand =>
  command.kind === "find" ||
  command.kind === "freq" ||
  command.kind === "help" ||
  command.kind === "history" ||
  command.kind === "ls" ||
  command.kind === "pwd" ||
  command.kind === "recent" ||
  command.kind === "tree";

/**
 * 未対応pipe sourceのcommand名を取得します。
 * @param {ParsedBookmarkCommand} source pipe source commandです。
 * @returns {string} 未対応pipe sourceのcommand名です。
 */
const getUnsupportedPipeSourceCommandName = (source: ParsedBookmarkCommand): string => {
  if (source.kind === "unknown") {
    return source.commandName;
  }

  return source.kind;
};

/**
 * Pipe stage segmentをgrep stageへ変換します。
 * @param {string} segment pipe stage segmentです。
 * @param {string} rawInput 正規化済み入力全体です。
 * @returns {GrepPipeStageCommand | UnknownBookmarkCommand} Grep stageまたはunknown commandです。
 */
const parseGrepPipeStage = (
  segment: string,
  rawInput: string,
): GrepPipeStageCommand | UnknownBookmarkCommand => {
  const context = createCommandParseContext(segment);

  if (context.commandName !== grepCommandName || context.query === emptyCommandName) {
    return createUnknownCommand(context.commandName, rawInput);
  }

  return {
    kind: "grep",
    queryInput: context.query,
  };
};

/**
 * Pipe stage segmentをcopy stageへ変換します。
 * @param {CommandParseContext} context Command parse contextです。
 * @param {string} rawInput 正規化済み入力全体です。
 * @returns {PipeStageCommand | UnknownBookmarkCommand} Copy stageまたはunknown commandです。
 */
const parseCopyPipeStage = (
  context: CommandParseContext,
  rawInput: string,
): PipeStageCommand | UnknownBookmarkCommand => {
  if (context.query !== emptyCommandName) {
    return createUnknownCommand(context.commandName, rawInput);
  }

  return { kind: "copy" };
};

/**
 * Pipe stage segmentをstage commandへ変換します。
 * @param {string} segment pipe stage segmentです。
 * @param {string} rawInput 正規化済み入力全体です。
 * @returns {PipeStageCommand | UnknownBookmarkCommand} pipe stageまたはunknown commandです。
 */
const parsePipeStage = (
  segment: string,
  rawInput: string,
): PipeStageCommand | UnknownBookmarkCommand => {
  const context = createCommandParseContext(segment);

  if (context.commandName === grepCommandName) {
    return parseGrepPipeStage(segment, rawInput);
  }

  if (context.commandName === copyCommandName) {
    return parseCopyPipeStage(context, rawInput);
  }

  return createUnknownCommand(context.commandName, rawInput);
};

/**
 * Pipe stage一覧を作成します。
 * @param {readonly string[]} stageSegments pipe stage segment一覧です。
 * @param {string} rawInput 正規化済み入力全体です。
 * @returns {PipeStageCommand[] | UnknownBookmarkCommand} pipe stage一覧またはunknown commandです。
 */
const parsePipeStages = (
  stageSegments: readonly string[],
  rawInput: string,
): readonly PipeStageCommand[] | UnknownBookmarkCommand => {
  const stages: PipeStageCommand[] = [];

  for (const segment of stageSegments) {
    const stage = parsePipeStage(segment, rawInput);

    if (stage.kind !== grepCommandName && stage.kind !== copyCommandName) {
      return stage;
    }

    stages.push(stage);
  }

  return stages;
};

/**
 * 単一Bookmark command入力を解析します。
 * @param {string} normalizedInput 正規化済み入力です。
 * @returns {ParsedBookmarkCommand} 解析済みBookmark commandです。
 */
const parseSingleBookmarkCommand = (normalizedInput: string): ParsedBookmarkCommand => {
  if (normalizedInput === emptyCommandName) {
    return { kind: "empty" };
  }

  const context = createCommandParseContext(normalizedInput);
  const factory = getBookmarkCommandFactory(context);

  return factory(context);
};

/**
 * Pipe command入力を解析します。
 * @param {string} normalizedInput 正規化済み入力です。
 * @returns {ParsedBookmarkCommand} 解析済みBookmark commandです。
 */
const parsePipeBookmarkCommand = (normalizedInput: string): ParsedBookmarkCommand => {
  const [sourceSegment = emptyCommandName, ...stageSegments] = splitPipeSegments(normalizedInput);
  const source = parseSingleBookmarkCommand(sourceSegment);

  if (!isPipeSourceBookmarkCommand(source)) {
    return createUnknownCommand(getUnsupportedPipeSourceCommandName(source), normalizedInput);
  }

  const stages = parsePipeStages(stageSegments, normalizedInput);

  if (isUnknownBookmarkCommand(stages)) {
    return stages;
  }

  if (stages.length === emptyPipeStageCount) {
    return createUnknownCommand(grepCommandName, normalizedInput);
  }

  return {
    kind: "pipe",
    source,
    stages,
  } satisfies PipeBookmarkCommand;
};

/**
 * Bookmark command入力を解析します。
 * @param {string} input CLIに入力された文字列です。
 * @returns {ParsedBookmarkCommand} 解析済みBookmark commandです。
 * @example
 * ```ts
 * const result = parseBookmarkCommand("ls -l /Work | grep Stripe");
 * // result.kind === "pipe"
 * ```
 */
export const parseBookmarkCommand = (input: string): ParsedBookmarkCommand => {
  const normalizedInput = normalizeCommandInput(input);

  if (hasPipeOperator(normalizedInput)) {
    return parsePipeBookmarkCommand(normalizedInput);
  }

  return parseSingleBookmarkCommand(normalizedInput);
};
