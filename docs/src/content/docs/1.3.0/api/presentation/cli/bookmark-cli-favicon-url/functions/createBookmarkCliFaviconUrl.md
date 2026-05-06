---
editUrl: false
next: false
prev: false
title: createBookmarkCliFaviconUrl
slug: 1.3.0/api/presentation/cli/bookmark-cli-favicon-url/functions/createbookmarkclifaviconurl
---

> **createBookmarkCliFaviconUrl**(`input`): `string` | `false`

Defined in: [presentation/cli/bookmark-cli-favicon-url.ts:97](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-favicon-url.ts#L97)

Chrome拡張のfavicon endpoint URLを生成する。

## Parameters

### input

[`CreateBookmarkCliFaviconUrlInput`](/1.3.0/api/presentation/cli/bookmark-cli-favicon-url/interfaces/createbookmarkclifaviconurlinput/)

favicon URL生成入力。

## Returns

`string` | `false`

favicon URL、または生成対象外の場合はfalse。

## See

https://developer.chrome.com/docs/extensions/how-to/ui/favicons
