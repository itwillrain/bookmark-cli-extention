/** Toolbar action click listenerです。 */
export type ToolbarActionClickListener = () => void;

/** Toolbar action click eventの最小shapeです。 */
export interface ToolbarActionClickEvent {
  /** Click listenerを登録します。 */
  readonly addListener: (listener: ToolbarActionClickListener) => void;
}

/** Toolbar action APIの最小shapeです。 */
export interface ToolbarAction {
  /** Toolbar action click eventです。 */
  readonly onClicked: ToolbarActionClickEvent;
}

/** Chrome MV3とFirefox MV2のtoolbar action APIを含む最小shapeです。 */
export interface ToolbarActionApiSource {
  /** Chrome MV3またはFirefox MV3のaction APIです。 */
  readonly action?: ToolbarAction | undefined;
  /** Firefox MV2のbrowserAction APIです。 */
  readonly browserAction?: ToolbarAction | undefined;
}

/** Toolbar actionが見つからない場合の値です。 */
const toolbarActionMissing = false;

/** 解決済みtoolbar actionです。 */
type ResolvedToolbarAction = ToolbarAction | typeof toolbarActionMissing;

/**
 * Browserごとのtoolbar action APIを解決します。
 * @param {ToolbarActionApiSource} apiSource Browser API sourceです。
 * @returns {ResolvedToolbarAction} 解決済みtoolbar action、または未検出を表すfalseです。
 */
const resolveToolbarAction = (apiSource: ToolbarActionApiSource): ResolvedToolbarAction =>
  apiSource.action ?? apiSource.browserAction ?? toolbarActionMissing;

/**
 * Toolbar action click listenerを登録します。
 * @param {ToolbarActionApiSource} apiSource Browser API sourceです。
 * @param {ToolbarActionClickListener} listener 登録するclick listenerです。
 * @returns {boolean} listenerを登録できた場合はtrueです。
 * @see https://developer.chrome.com/docs/extensions/reference/api/action
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction
 */
export const addToolbarActionClickListener = (
  apiSource: ToolbarActionApiSource,
  listener: ToolbarActionClickListener,
): boolean => {
  const toolbarAction = resolveToolbarAction(apiSource);

  if (toolbarAction === toolbarActionMissing) {
    return false;
  }

  toolbarAction.onClicked.addListener(listener);

  return true;
};
