import {
  type ExtensionState,
  createInitialExtensionState,
  currentExtensionStateSchemaVersion,
} from "../../domain/storage/extension-state";
import type { ExtensionStateStoragePort } from "../../application/storage/extension-state-ports";
import typia from "typia";

export type { ExtensionStateStoragePort } from "../../application/storage/extension-state-ports";

/** Chrome storage.local APIのうちadapterが使う最小shape。 */
export interface ChromeStorageLocalArea {
  /** Storage全体を取得。 */
  readonly get: () => Promise<unknown>;
  /** Storageへ値を書き込み。 */
  readonly set: (items: ExtensionState) => Promise<void>;
}

/**
 * 未対応versionまたは旧schemaを初期状態へmigration。
 * @param {unknown} payload storageから取得したraw payload。
 * @returns {unknown} migration後payload。
 */
const migrateExtensionStatePayload = (payload: unknown): unknown => {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "schemaVersion" in payload &&
    payload.schemaVersion === currentExtensionStateSchemaVersion
  ) {
    return payload;
  }

  return createInitialExtensionState();
};

/**
 * Raw payloadをExtensionStateへ検証して変換。
 * @param {unknown} payload storageから取得したraw payload。
 * @returns {ExtensionState} 検証済み拡張状態。
 */
const parseExtensionStatePayload = (payload: unknown): ExtensionState => {
  const migratedPayload = migrateExtensionStatePayload(payload);

  if (typia.is<ExtensionState>(migratedPayload)) {
    return migratedPayload;
  }

  return createInitialExtensionState();
};

/**
 * Chrome storage.localをExtensionStateStoragePortへ変換。
 * @param {ChromeStorageLocalArea} storageArea Chrome storage.local API。
 * @returns {ExtensionStateStoragePort} 拡張状態storage port。
 */
export const createChromeExtensionStateStorage = (
  storageArea: ChromeStorageLocalArea,
): ExtensionStateStoragePort => {
  /**
   * Chrome storage.localから拡張状態を読み込み。
   * @returns {Promise<ExtensionState>} 検証済み拡張状態。
   */
  const readExtensionState = async (): Promise<ExtensionState> => {
    const payload = await storageArea.get();

    return parseExtensionStatePayload(payload);
  };

  /**
   * Chrome storage.localへ拡張状態を書き込み。
   * @param {ExtensionState} state 書き込む拡張状態。
   * @returns {Promise<void>} 書き込み完了Promise。
   */
  const writeExtensionState = async (state: ExtensionState): Promise<void> => {
    await storageArea.set(state);
  };

  return {
    readExtensionState,
    writeExtensionState,
  };
};
