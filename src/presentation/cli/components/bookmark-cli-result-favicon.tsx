import {
  createBookmarkCliFaviconUrl,
  resolveBookmarkCliFaviconExtensionOrigin,
} from "../bookmark-cli-favicon-url";
import type { BookmarkCliResultItem } from "./bookmark-cli-result-list-types";
import type { ReactElement } from "react";

/**
 * Result favicon componentのprops。
 */
export interface BookmarkCliResultFaviconProps {
  /** Favicon表示対象のresult item。 */
  readonly item: BookmarkCliResultItem;
}

/**
 * Result内で表示するfavicon size。
 */
const resultFaviconSize = 16;

/**
 * Global locationを参照するproperty名。
 */
const globalLocationPropertyName = "location";

/**
 * Location originを参照するproperty名。
 */
const locationOriginPropertyName = "origin";

/**
 * Favicon画像のclassName。
 */
const faviconImageClassName = "h-4 w-4 flex-none rounded-[2px]";

/**
 * Originを持つlocation相当の値。
 */
interface LocationOriginSource {
  /** Page origin。 */
  readonly origin: string;
}

/**
 * 値がlocation originを持つか判定する。
 * @param {unknown} value 判定する値。
 * @returns {boolean} origin文字列を持つ場合はtrue。
 */
const isLocationOriginSource = (value: unknown): value is LocationOriginSource => {
  if (typeof value !== "object" || value === null || !(locationOriginPropertyName in value)) {
    return false;
  }

  const originValue = (value as Record<typeof locationOriginPropertyName, unknown>).origin;

  return typeof originValue === "string";
};

/**
 * 現在pageのoriginを取得する。
 * @returns {string | false} origin、または取得できない場合はfalse。
 */
const getCurrentLocationOrigin = (): string | false => {
  const locationValue = Reflect.get(globalThis, globalLocationPropertyName) as unknown;

  if (!isLocationOriginSource(locationValue)) {
    return false;
  }

  return locationValue.origin;
};

/**
 * 現在pageからfavicon endpoint用のextension originを取得する。
 * @returns {string | false} extension origin、または取得できない場合はfalse。
 */
const getCurrentFaviconExtensionOrigin = (): string | false => {
  const currentOrigin = getCurrentLocationOrigin();

  if (currentOrigin === false) {
    return false;
  }

  return resolveBookmarkCliFaviconExtensionOrigin(currentOrigin);
};

/**
 * Result itemからfavicon URLを作る。
 * @param {BookmarkCliResultItem} item Result item。
 * @returns {string | false} favicon URL、または表示対象外の場合はfalse。
 */
const createResultFaviconUrl = (item: BookmarkCliResultItem): string | false => {
  if (typeof item.url !== "string") {
    return false;
  }

  const extensionOrigin = getCurrentFaviconExtensionOrigin();

  if (extensionOrigin === false) {
    return false;
  }

  return createBookmarkCliFaviconUrl({
    extensionOrigin,
    pageUrl: item.url,
    size: resultFaviconSize,
  });
};

/**
 * Bookmark faviconを描画する。
 * @param {BookmarkCliResultFaviconProps} props Result favicon props。
 * @returns {ReactElement} favicon画像、または空要素。
 */
export const BookmarkCliResultFavicon = (props: BookmarkCliResultFaviconProps): ReactElement => {
  const faviconUrl = createResultFaviconUrl(props.item);

  if (faviconUrl === false) {
    return <></>;
  }

  return (
    <img
      alt=""
      aria-hidden="true"
      className={faviconImageClassName}
      loading="lazy"
      src={faviconUrl}
    />
  );
};
