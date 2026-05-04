/** CLI pageを開くruntime message typeです。 */
export const openCliPageMessageType = "bookmark-cli/open-cli-page";

/** CLI pageを開くruntime messageです。 */
export interface OpenCliPageMessage {
  /** Message typeです。 */
  readonly type: typeof openCliPageMessageType;
}

/** Popupからbackgroundへ送るruntime messageです。 */
export type PopupRuntimeMessage = OpenCliPageMessage;

/**
 * CLI page open messageを作ります。
 * @returns {OpenCliPageMessage} CLI page open messageです。
 */
export const createOpenCliPageMessage = (): OpenCliPageMessage => ({
  type: openCliPageMessageType,
});

/**
 * CLI page open messageかを判定します。
 * @param {unknown} message runtime messageです。
 * @returns {boolean} CLI page open messageならtrueです。
 */
export const isOpenCliPageMessage = (message: unknown): message is OpenCliPageMessage => {
  if (typeof message !== "object" || message === null) {
    return false;
  }

  return "type" in message && message.type === openCliPageMessageType;
};
