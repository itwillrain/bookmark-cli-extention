/**
 * Bookmark CLI favicon URL生成の入力。
 */
export interface CreateBookmarkCliFaviconUrlInput {
  /** 拡張機能pageのorigin。 */
  readonly extensionOrigin: string;
  /** Faviconを取得したいpage URL。 */
  readonly pageUrl: string;
  /** 取得するfaviconのpx size。 */
  readonly size: number;
}

/**
 * Chrome拡張pageのprotocol。
 */
const extensionProtocol = "chrome-extension:";

/**
 * HTTP pageのprotocol。
 */
const httpProtocol = "http:";

/**
 * HTTPS pageのprotocol。
 */
const httpsProtocol = "https:";

/**
 * Chrome拡張favicon endpoint path。
 * @see https://developer.chrome.com/docs/extensions/how-to/ui/favicons
 */
const faviconEndpointPath = "/_favicon/";

/**
 * HostがないURLを表す文字列。
 */
const emptyHost = "";

/**
 * Favicon取得対象page URLのquery key。
 * @see https://developer.chrome.com/docs/extensions/how-to/ui/favicons
 */
const pageUrlSearchParamName = "pageUrl";

/**
 * Favicon sizeのquery key。
 * @see https://developer.chrome.com/docs/extensions/how-to/ui/favicons
 */
const sizeSearchParamName = "size";

/**
 * 文字列をURLとして解釈する。
 * @param {string} value URL文字列候補。
 * @returns {URL | false} 解釈できたURL、またはfalse。
 */
const parseUrl = (value: string): URL | false => {
  try {
    return new URL(value);
  } catch {
    return false;
  }
};

/**
 * Bookmark URLがfavicon endpoint対象のWeb pageか判定する。
 * @param {URL} url 判定するURL。
 * @returns {boolean} httpまたはhttpsの場合はtrue。
 */
const isWebPageUrl = (url: Readonly<Pick<URL, "protocol">>): boolean =>
  url.protocol === httpProtocol || url.protocol === httpsProtocol;

/**
 * 現在pageのoriginからfavicon endpoint用のextension originを解決する。
 * @param {string} origin 現在pageのorigin。
 * @returns {string | false} extension origin、またはfalse。
 */
export const resolveBookmarkCliFaviconExtensionOrigin = (origin: string): string | false => {
  const parsedOrigin = parseUrl(origin);

  if (
    parsedOrigin === false ||
    parsedOrigin.protocol !== extensionProtocol ||
    parsedOrigin.host === emptyHost
  ) {
    return false;
  }

  return `${extensionProtocol}//${parsedOrigin.host}`;
};

/**
 * Chrome拡張のfavicon endpoint URLを生成する。
 * @param {CreateBookmarkCliFaviconUrlInput} input favicon URL生成入力。
 * @returns {string | false} favicon URL、または生成対象外の場合はfalse。
 * @see https://developer.chrome.com/docs/extensions/how-to/ui/favicons
 */
export const createBookmarkCliFaviconUrl = (
  input: CreateBookmarkCliFaviconUrlInput,
): string | false => {
  const extensionOrigin = resolveBookmarkCliFaviconExtensionOrigin(input.extensionOrigin);
  const parsedPageUrl = parseUrl(input.pageUrl);

  if (extensionOrigin === false || parsedPageUrl === false || !isWebPageUrl(parsedPageUrl)) {
    return false;
  }

  const faviconUrl = new URL(faviconEndpointPath, `${extensionOrigin}/`);

  faviconUrl.searchParams.set(pageUrlSearchParamName, input.pageUrl);
  faviconUrl.searchParams.set(sizeSearchParamName, String(input.size));

  return faviconUrl.toString();
};
