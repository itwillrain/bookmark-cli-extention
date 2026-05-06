/* oxlint-disable typescript-eslint/prefer-readonly-parameter-types -- React event handler型に合わせるため。 */

import type { ChangeEvent, ReactElement } from "react";
import type { CommandAlias } from "../../../domain/cli/command-alias";

/** Shortcut未設定表示です。 */
const unconfiguredShortcutLabel = "未設定";

/** Shortcut設定画面button labelです。 */
const shortcutSettingsButtonLabel = "ショートカットを変更";

/** CLI起動button labelです。 */
const openCliButtonLabel = "CLIを開く";

/** Abbr追加button labelです。 */
const addAliasButtonLabel = "Abbrを追加";

/** Abbr保存button labelです。 */
const saveAliasesButtonLabel = "Abbrを保存";

/** Alias削除button labelです。 */
const removeAliasButtonLabel = "削除";

/** Abbr未設定表示です。 */
const emptyAliasLabel = "Abbr未設定";

/** Alias name placeholderです。 */
const aliasNamePlaceholder = "g";

/** Alias command placeholderです。 */
const aliasCommandPlaceholder = "go";

/** Alias未設定件数です。 */
const emptyAliasCount = 0;

/** Settings popup propsです。 */
export interface SettingsPopupProps {
  /** Alias保存状態表示です。 */
  readonly aliasStatusText: string;
  /** Command alias一覧です。 */
  readonly commandAliases: readonly CommandAlias[];
  /** Alias追加callbackです。 */
  readonly onAddAlias: () => void;
  /** Alias command変更callbackです。 */
  readonly onChangeAliasCommand: (index: number, command: string) => void;
  /** Alias name変更callbackです。 */
  readonly onChangeAliasName: (index: number, name: string) => void;
  /** CLI pageを開くcallbackです。 */
  readonly onOpenCliPage: () => void;
  /** Shortcut設定画面を開くcallbackです。 */
  readonly onOpenShortcutSettings: () => void;
  /** Alias削除callbackです。 */
  readonly onRemoveAlias: (index: number) => void;
  /** Alias保存callbackです。 */
  readonly onSaveAliases: () => void;
  /** Shortcutが設定済みかです。 */
  readonly shortcutConfigured: boolean;
  /** Shortcut表示文字列です。 */
  readonly shortcutLabel: string;
}

/**
 * 表示用shortcut labelを作ります。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {string} 表示用shortcut labelです。
 */
const createShortcutLabel = (props: SettingsPopupProps): string => {
  if (props.shortcutConfigured) {
    return props.shortcutLabel;
  }

  return unconfiguredShortcutLabel;
};

/** Alias row render入力です。 */
interface AliasRowRenderInput {
  /** Command aliasです。 */
  readonly alias: CommandAlias;
  /** Alias indexです。 */
  readonly aliasIndex: number;
  /** Settings popup propsです。 */
  readonly props: SettingsPopupProps;
}

/**
 * Alias name変更handlerを作ります。
 * @param {AliasRowRenderInput} input Alias row render入力です。
 * @returns {(event: ChangeEvent<HTMLInputElement>) => void} Alias name変更handlerです。
 */
const createAliasNameChangeHandler =
  (input: AliasRowRenderInput): ((event: ChangeEvent<HTMLInputElement>) => void) =>
  (event: ChangeEvent<HTMLInputElement>): void => {
    input.props.onChangeAliasName(input.aliasIndex, event.currentTarget.value);
  };

/**
 * Alias command変更handlerを作ります。
 * @param {AliasRowRenderInput} input Alias row render入力です。
 * @returns {(event: ChangeEvent<HTMLInputElement>) => void} Alias command変更handlerです。
 */
const createAliasCommandChangeHandler =
  (input: AliasRowRenderInput): ((event: ChangeEvent<HTMLInputElement>) => void) =>
  (event: ChangeEvent<HTMLInputElement>): void => {
    input.props.onChangeAliasCommand(input.aliasIndex, event.currentTarget.value);
  };

/**
 * Alias削除handlerを作ります。
 * @param {AliasRowRenderInput} input Alias row render入力です。
 * @returns {() => void} Alias削除handlerです。
 */
const createAliasRemoveHandler =
  (input: AliasRowRenderInput): (() => void) =>
  (): void => {
    input.props.onRemoveAlias(input.aliasIndex);
  };

/**
 * Alias rowを描画します。
 * @param {AliasRowRenderInput} input Alias row render入力です。
 * @returns {ReactElement} Alias row elementです。
 */
const renderAliasRow = (input: AliasRowRenderInput): ReactElement => (
  <div
    className="grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-2"
    key={`${input.alias.name}-${String(input.aliasIndex)}`}
  >
    <input
      aria-label="Abbr name"
      className="min-w-0 rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      onChange={createAliasNameChangeHandler(input)}
      placeholder={aliasNamePlaceholder}
      type="text"
      value={input.alias.name}
    />
    <input
      aria-label="Abbr command"
      className="min-w-0 rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 font-mono text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      onChange={createAliasCommandChangeHandler(input)}
      placeholder={aliasCommandPlaceholder}
      type="text"
      value={input.alias.command}
    />
    <button
      className="rounded border border-zinc-700 px-2 py-1.5 text-xs font-medium text-zinc-200 hover:border-red-400 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
      onClick={createAliasRemoveHandler(input)}
      type="button"
    >
      {removeAliasButtonLabel}
    </button>
  </div>
);

/**
 * Popup headerを描画します。
 * @returns {ReactElement} Popup header elementです。
 */
const renderPopupHeader = (): ReactElement => (
  <header className="border-b border-zinc-800 pb-3">
    <p className="text-xs font-medium uppercase tracking-normal text-emerald-300">Bookmark CLI</p>
    <h1 className="mt-1 text-lg font-semibold tracking-normal">設定</h1>
  </header>
);

/**
 * Hotkey設定sectionを描画します。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {ReactElement} Hotkey設定sectionです。
 */
const renderHotkeySection = (props: SettingsPopupProps): ReactElement => (
  <section className="space-y-3" aria-labelledby="hotkey-heading">
    <div className="flex items-center justify-between gap-3">
      <div>
        <h2 id="hotkey-heading" className="text-sm font-semibold tracking-normal">
          Hotkey
        </h2>
        <p className="mt-1 text-xs text-zinc-400">Dedicated extension pageを開く</p>
      </div>
      <kbd className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 font-mono text-xs text-emerald-200">
        {createShortcutLabel(props)}
      </kbd>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <button
        className="rounded border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        onClick={props.onOpenShortcutSettings}
        type="button"
      >
        {shortcutSettingsButtonLabel}
      </button>
      <button
        className="rounded bg-emerald-500 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        onClick={props.onOpenCliPage}
        type="button"
      >
        {openCliButtonLabel}
      </button>
    </div>
  </section>
);

/**
 * Alias row一覧を描画します。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {ReactElement} Alias row一覧です。
 */
const renderAliasRows = (props: SettingsPopupProps): ReactElement => {
  if (props.commandAliases.length === emptyAliasCount) {
    return <p className="text-xs text-zinc-500">{emptyAliasLabel}</p>;
  }

  return (
    <>
      {props.commandAliases.map((alias, aliasIndex) =>
        renderAliasRow({ alias, aliasIndex, props }),
      )}
    </>
  );
};

/**
 * Alias保存状態を描画します。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {ReactElement | false} Alias保存状態です。
 */
const renderAliasStatus = (props: SettingsPopupProps): ReactElement | false => {
  if (props.aliasStatusText === "") {
    return false;
  }

  return <p className="text-xs text-emerald-300">{props.aliasStatusText}</p>;
};

/**
 * Alias設定sectionを描画します。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {ReactElement} Alias設定sectionです。
 */
const renderAliasSection = (props: SettingsPopupProps): ReactElement => (
  <section className="space-y-3 border-t border-zinc-800 pt-4" aria-labelledby="alias-heading">
    <div>
      <h2 id="alias-heading" className="text-sm font-semibold tracking-normal">
        Abbr
      </h2>
      <p className="mt-1 text-xs text-zinc-400">例: g → go、la → ls -la</p>
    </div>

    <div className="space-y-2">{renderAliasRows(props)}</div>

    <div className="grid grid-cols-2 gap-2">
      <button
        className="rounded border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        onClick={props.onAddAlias}
        type="button"
      >
        {addAliasButtonLabel}
      </button>
      <button
        className="rounded bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
        onClick={props.onSaveAliases}
        type="button"
      >
        {saveAliasesButtonLabel}
      </button>
    </div>

    {renderAliasStatus(props)}
  </section>
);

/**
 * Bookmark CLI settings popupを描画します。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {ReactElement} Settings popup elementです。
 */
export const SettingsPopup = (props: SettingsPopupProps): ReactElement => (
  <main className="min-w-[380px] bg-zinc-950 p-4 text-zinc-100">
    <section className="space-y-4">
      {renderPopupHeader()}
      {renderHotkeySection(props)}
      {renderAliasSection(props)}
    </section>
  </main>
);
