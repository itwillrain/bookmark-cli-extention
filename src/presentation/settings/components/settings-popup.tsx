import type { ReactElement } from "react";

/** Shortcut未設定表示です。 */
const unconfiguredShortcutLabel = "未設定";

/** Shortcut設定画面button labelです。 */
const shortcutSettingsButtonLabel = "ショートカットを変更";

/** CLI起動button labelです。 */
const openCliButtonLabel = "CLIを開く";

/** Settings popup propsです。 */
export interface SettingsPopupProps {
  /** CLI pageを開くcallbackです。 */
  readonly onOpenCliPage: () => void;
  /** Shortcut設定画面を開くcallbackです。 */
  readonly onOpenShortcutSettings: () => void;
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

/**
 * Bookmark CLI settings popupを描画します。
 * @param {SettingsPopupProps} props Settings popup propsです。
 * @returns {ReactElement} Settings popup elementです。
 */
export const SettingsPopup = (props: SettingsPopupProps): ReactElement => (
  <main className="min-w-[320px] bg-zinc-950 p-4 text-zinc-100">
    <section className="space-y-4">
      <header className="border-b border-zinc-800 pb-3">
        <p className="text-xs font-medium uppercase tracking-normal text-emerald-300">
          Bookmark CLI
        </p>
        <h1 className="mt-1 text-lg font-semibold tracking-normal">設定</h1>
      </header>

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
    </section>
  </main>
);
