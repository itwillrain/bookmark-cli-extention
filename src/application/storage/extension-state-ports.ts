import type { ExtensionState } from "../../domain/storage/extension-state";

/** Extension state storage port。 */
export interface ExtensionStateStoragePort {
  /** 拡張状態を読み込み。 */
  readonly readExtensionState: () => Promise<ExtensionState>;
  /** 拡張状態を書き込み。 */
  readonly writeExtensionState: (state: ExtensionState) => Promise<void>;
}
