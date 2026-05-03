import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import typia from "typia";

/** Chrome storage.session APIのうちadapterが使う最小shape。 */
export interface ChromeStorageSessionArea {
  /** Storage keyに対応する値を取得。 */
  readonly get: (keys: string) => Promise<Readonly<Record<string, unknown>>>;
  /** Storageへ値を書き込み。 */
  readonly set: (items: Readonly<Record<string, unknown>>) => Promise<void>;
}

/** Launch context読み込み成功結果。 */
export interface LaunchContextReadSuccess {
  /** 読み込み成功。 */
  readonly ok: true;
  /** Launch context。 */
  readonly value: LaunchContext;
}

/** Launch context未設定結果。 */
export interface LaunchContextReadEmpty {
  /** 読み込み対象なし。 */
  readonly ok: false;
}

/** Launch context読み込み結果。 */
export type LaunchContextReadResult = LaunchContextReadEmpty | LaunchContextReadSuccess;

/** Launch context storage port。 */
export interface LaunchContextStoragePort {
  /** Launch contextを読み込み。 */
  readonly readLaunchContext: () => Promise<LaunchContextReadResult>;
  /** Launch contextを書き込み。 */
  readonly writeLaunchContext: (launchContext: LaunchContext) => Promise<void>;
}

/** Launch contextを保存するstorage key。 */
const launchContextStorageKey = "bookmarkCliLaunchContext";

/** Launch context未設定結果。 */
const emptyLaunchContextResult = { ok: false } satisfies LaunchContextReadEmpty;

/**
 * Raw payloadからLaunchContextを取り出す。
 * @param {Readonly<Record<string, unknown>>} payload storage payload。
 * @returns {LaunchContextReadResult} LaunchContext読み込み結果。
 */
const parseLaunchContextPayload = (
  payload: Readonly<Record<string, unknown>>,
): LaunchContextReadResult => {
  const launchContext = payload[launchContextStorageKey];

  if (typia.is<LaunchContext>(launchContext)) {
    return { ok: true, value: launchContext };
  }

  return emptyLaunchContextResult;
};

/**
 * Chrome storage.sessionをLaunchContextStoragePortへ変換。
 * @param {ChromeStorageSessionArea} storageArea Chrome storage.session API。
 * @returns {LaunchContextStoragePort} Launch context storage port。
 */
export const createChromeLaunchContextStorage = (
  storageArea: ChromeStorageSessionArea,
): LaunchContextStoragePort => {
  /**
   * Chrome storage.sessionからLaunchContextを読み込み。
   * @returns {Promise<LaunchContextReadResult>} LaunchContext読み込み結果。
   */
  const readLaunchContext = async (): Promise<LaunchContextReadResult> => {
    const payload = await storageArea.get(launchContextStorageKey);

    return parseLaunchContextPayload(payload);
  };

  /**
   * Chrome storage.sessionへLaunchContextを書き込み。
   * @param {LaunchContext} launchContext 書き込むLaunchContext。
   * @returns {Promise<void>} 書き込み完了Promise。
   */
  const writeLaunchContext = async (launchContext: LaunchContext): Promise<void> => {
    await storageArea.set({ [launchContextStorageKey]: launchContext });
  };

  return {
    readLaunchContext,
    writeLaunchContext,
  };
};
