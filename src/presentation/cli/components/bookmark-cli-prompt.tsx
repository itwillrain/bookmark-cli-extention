import type { PromptStyle } from "../../../domain/storage/extension-state";
import type { ReactElement } from "react";

/** CLI prompt command name。 */
const promptCommandName = "bookmark-cli";

/** CLI prompt symbol。 */
const promptSymbol = "$";

/** CLI prompt text。 */
const promptText = `${promptCommandName} ${promptSymbol}`;

/** Bookmark CLI prompt props。 */
export interface BookmarkCliPromptProps {
  /** Nerd Font iconを優先するか。 */
  readonly preferNerdFont: boolean;
  /** Prompt表示style。 */
  readonly promptStyle: PromptStyle;
}

/**
 * Powerline promptを表示するか判定。
 * @param {BookmarkCliPromptProps} props Bookmark CLI prompt props。
 * @returns {boolean} Powerline promptを表示するならtrue。
 */
const shouldRenderPowerlinePrompt = (props: BookmarkCliPromptProps): boolean =>
  props.promptStyle === "powerline";

/**
 * Plain promptを描画。
 * @returns {ReactElement} Plain prompt element。
 */
const PlainPrompt = (): ReactElement => (
  <span className="whitespace-nowrap text-emerald-300">{promptText}</span>
);

/**
 * CSS shapeでPowerline separatorを描画。
 * @returns {ReactElement} CSS separator element。
 */
const PowerlineSeparator = (): ReactElement => (
  <span
    aria-hidden="true"
    className="h-5 w-0 border-y-[10px] border-l-[10px] border-y-transparent border-l-emerald-500"
  />
);

/**
 * Powerline promptのsymbol segmentを描画。
 * @returns {ReactElement} Symbol segment element。
 */
const PowerlineSymbolSegment = (): ReactElement => (
  <span className="inline-flex bg-zinc-900" aria-hidden="true">
    <PowerlineSeparator />
    <span className="px-2 text-emerald-200">{promptSymbol}</span>
  </span>
);

/**
 * Powerline promptを描画。
 * @returns {ReactElement} Powerline prompt element。
 */
const PowerlinePrompt = (): ReactElement => (
  <span
    aria-label={promptText}
    className="inline-flex max-w-full overflow-hidden rounded-sm align-middle font-mono text-xs font-semibold leading-5"
  >
    <span className="bg-emerald-500 px-2 text-zinc-950" aria-hidden="true">
      {promptCommandName}
    </span>
    <PowerlineSymbolSegment />
  </span>
);

/**
 * Bookmark CLI promptを描画。
 * @param {BookmarkCliPromptProps} props Bookmark CLI prompt props。
 * @returns {ReactElement} Bookmark CLI prompt element。
 */
export const BookmarkCliPrompt = (props: BookmarkCliPromptProps): ReactElement => {
  if (shouldRenderPowerlinePrompt(props)) {
    return <PowerlinePrompt />;
  }

  return <PlainPrompt />;
};
