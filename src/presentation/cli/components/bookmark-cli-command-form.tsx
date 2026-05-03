import { BookmarkCliPrompt } from "./bookmark-cli-prompt";
import type { PromptStyle } from "../../../domain/storage/extension-state";
import type { ReactElement } from "react";

/**
 * 入力変更eventとして扱う最小shapeです。
 */
interface InputChangeEvent {
  /**
   * 入力要素です。
   */
  readonly currentTarget: {
    /**
     * 入力値です。
     */
    readonly value: string;
  };
}

/**
 * Form submit eventとして扱う最小shapeです。
 */
interface FormSubmitEvent {
  /**
   * Browser標準のsubmit動作を止めます。
   */
  readonly preventDefault: () => void;
}

/**
 * 入力欄key eventとして扱う最小shapeです。
 */
export interface CommandInputKeyEvent {
  /**
   * Control keyが押されているかです。
   */
  readonly ctrlKey: boolean;
  /**
   * 入力要素です。
   */
  readonly currentTarget: CommandInputElement;
  /**
   * 押されたkey名です。
   */
  readonly key: string;
  /**
   * Browser標準のkey動作を止めます。
   */
  readonly preventDefault: () => void;
}

/**
 * 入力欄DOM elementとして使う最小shapeです。
 */
export interface CommandInputElement {
  /**
   * 選択範囲の終端indexです。
   */
  readonly selectionEnd: number | null;
  /**
   * 選択範囲の開始indexです。
   */
  readonly selectionStart: number | null;
  /**
   * 選択範囲を更新します。
   */
  readonly setSelectionRange: (selectionStart: number, selectionEnd: number) => void;
  /**
   * 入力値です。
   */
  readonly value: string;
}

/**
 * Command formのpropsです。
 */
interface CommandFormProps {
  /**
   * CLI入力値です。
   */
  readonly inputValue: string;
  /**
   * 入力値を更新するcallbackです。
   */
  readonly onInputChange: (value: string) => void;
  /**
   * 入力欄のkey操作callbackです。
   */
  readonly onInputKeyDown: (event: CommandInputKeyEvent) => void;
  /**
   * Commandを実行するcallbackです。
   */
  readonly onSubmit: () => void;
  /**
   * Nerd Font iconを優先するかです。
   */
  readonly preferNerdFont: boolean;
  /**
   * Prompt表示styleです。
   */
  readonly promptStyle: PromptStyle;
}

/**
 * 入力欄のplaceholderです。
 */
const commandInputPlaceholder = "find stripe dashboard";

/**
 * CLI commandのprompt formを描画します。
 * @param {CommandFormProps} props Command formのpropsです。
 * @returns {ReactElement} Prompt formのReact elementです。
 */
export const CommandForm = (props: CommandFormProps): ReactElement => {
  /**
   * 入力変更を親componentへ通知します。
   * @param {InputChangeEvent} event 入力変更eventです。
   * @returns {void} 返り値はありません。
   */
  const handleInputChange = (event: InputChangeEvent): void => {
    props.onInputChange(event.currentTarget.value);
  };

  /**
   * Form submitをcommand実行へ変換します。
   * @param {FormSubmitEvent} event form submit eventです。
   * @returns {void} 返り値はありません。
   */
  const handleSubmit = (event: FormSubmitEvent): void => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <form
      className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 py-1"
      onSubmit={handleSubmit}
    >
      <label htmlFor="bookmark-cli-command">
        <BookmarkCliPrompt preferNerdFont={props.preferNerdFont} promptStyle={props.promptStyle} />
      </label>
      <input
        aria-label="Bookmark CLI command"
        autoFocus
        className="min-w-0 bg-transparent text-zinc-100 caret-emerald-300 outline-none placeholder:text-zinc-600"
        id="bookmark-cli-command"
        onChange={handleInputChange}
        onKeyDown={props.onInputKeyDown}
        placeholder={commandInputPlaceholder}
        spellCheck={false}
        value={props.inputValue}
      />
    </form>
  );
};
