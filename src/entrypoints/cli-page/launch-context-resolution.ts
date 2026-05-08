import type { LaunchContext } from "../../application/bookmarks/mark-bookmark-use-case";
import type { LaunchContextStoragePort } from "../../infrastructure/chrome/launch-context-storage-adapter";

/** 最新LaunchContext解決入力。 */
export interface ResolveLatestLaunchContextInput {
  /** State上に保持しているfallback LaunchContext。 */
  readonly fallbackLaunchContext: LaunchContext | undefined;
  /** LaunchContext storage。 */
  readonly storage: LaunchContextStoragePort;
}

/**
 * Storage上の最新LaunchContextを優先して解決。
 * @param {ResolveLatestLaunchContextInput} input 最新LaunchContext解決入力。
 * @returns {Promise<LaunchContext | undefined>} 最新LaunchContext。
 * @example
 * ```ts
 * const launchContext = await resolveLatestLaunchContext({
 *   fallbackLaunchContext,
 *   storage,
 * });
 * ```
 */
export const resolveLatestLaunchContext = async (
  input: ResolveLatestLaunchContextInput,
): Promise<LaunchContext | undefined> => {
  const readResult = await input.storage.readLaunchContext();

  if (readResult.ok) {
    return readResult.value;
  }

  return input.fallbackLaunchContext;
};
