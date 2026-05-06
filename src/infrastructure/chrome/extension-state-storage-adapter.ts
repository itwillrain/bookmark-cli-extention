import {
  type ExtensionState,
  createInitialExtensionState,
  currentExtensionStateSchemaVersion,
} from "../../domain/storage/extension-state";
import type { ExtensionStateStoragePort } from "../../application/storage/extension-state-ports";
import { normalizeCommandAliases } from "../../domain/cli/command-alias";
import typia from "typia";

export type { ExtensionStateStoragePort } from "../../application/storage/extension-state-ports";

/** Chrome storage.local APIのうちadapterが使う最小shape。 */
export interface ChromeStorageLocalArea {
  /** Storage全体を取得。 */
  readonly get: () => Promise<unknown>;
  /** Storageへ値を書き込み。 */
  readonly set: (items: ExtensionState) => Promise<void>;
}

/** 旧schema versionです。 */
const legacyExtensionStateSchemaVersion = 1;

/** Command alias追加済みの旧schema versionです。 */
const commandAliasExtensionStateSchemaVersion = 2;

/** Unknown recordです。 */
type UnknownRecord = Readonly<Record<string, unknown>>;

/**
 * 値がrecordか判定します。
 * @param {unknown} value 判定対象です。
 * @returns {boolean} recordならtrueです。
 */
const isUnknownRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null;

/**
 * Settings payloadをmigrationします。
 * @param {unknown} payload settings payloadです。
 * @returns {unknown} migration後settingsです。
 */
const migrateExtensionSettingsPayload = (payload: unknown): unknown => {
  const initialSettings = createInitialExtensionState().settings;

  if (!isUnknownRecord(payload)) {
    return initialSettings;
  }

  return {
    ...initialSettings,
    ...payload,
    commandAbbreviations: normalizeCommandAliases([]),
    commandAliases: normalizeCommandAliases([]),
  };
};

/**
 * Schema version 2のsettings payloadをmigrationします。
 * @param {unknown} payload settings payloadです。
 * @returns {unknown} migration後settingsです。
 */
const migrateCommandAliasExtensionSettingsPayload = (payload: unknown): unknown => {
  const initialSettings = createInitialExtensionState().settings;

  if (!isUnknownRecord(payload)) {
    return initialSettings;
  }

  return {
    ...initialSettings,
    ...payload,
    commandAbbreviations: normalizeCommandAliases([]),
  };
};

/**
 * 旧schema payloadを現在schemaへmigrationします。
 * @param {UnknownRecord} payload storageから取得した旧schema payloadです。
 * @returns {unknown} migration後payloadです。
 */
const migrateLegacyExtensionStatePayload = (payload: UnknownRecord): unknown => ({
  ...createInitialExtensionState(),
  ...payload,
  schemaVersion: currentExtensionStateSchemaVersion,
  settings: migrateExtensionSettingsPayload(payload["settings"]),
});

/**
 * Schema version 2 payloadを現在schemaへmigrationします。
 * @param {UnknownRecord} payload storageから取得したschema version 2 payloadです。
 * @returns {unknown} migration後payloadです。
 */
const migrateCommandAliasExtensionStatePayload = (payload: UnknownRecord): unknown => ({
  ...createInitialExtensionState(),
  ...payload,
  schemaVersion: currentExtensionStateSchemaVersion,
  settings: migrateCommandAliasExtensionSettingsPayload(payload["settings"]),
});

/**
 * 未対応versionまたは旧schemaを初期状態へmigration。
 * @param {unknown} payload storageから取得したraw payload。
 * @returns {unknown} migration後payload。
 */
const migrateExtensionStatePayload = (payload: unknown): unknown => {
  if (
    isUnknownRecord(payload) &&
    "schemaVersion" in payload &&
    payload["schemaVersion"] === currentExtensionStateSchemaVersion
  ) {
    return payload;
  }

  if (
    isUnknownRecord(payload) &&
    "schemaVersion" in payload &&
    payload["schemaVersion"] === commandAliasExtensionStateSchemaVersion
  ) {
    return migrateCommandAliasExtensionStatePayload(payload);
  }

  if (
    isUnknownRecord(payload) &&
    "schemaVersion" in payload &&
    payload["schemaVersion"] === legacyExtensionStateSchemaVersion
  ) {
    return migrateLegacyExtensionStatePayload(payload);
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
