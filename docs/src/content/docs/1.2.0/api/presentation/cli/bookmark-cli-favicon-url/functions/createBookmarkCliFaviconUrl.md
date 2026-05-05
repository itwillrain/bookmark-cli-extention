---
editUrl: false
next: false
prev: false
title: createBookmarkCliFaviconUrl
slug: 1.2.0/api/presentation/cli/bookmark-cli-favicon-url/functions/createbookmarkclifaviconurl
---

> **createBookmarkCliFaviconUrl**(`input`): `string` | `false`

Defined in: [presentation/cli/bookmark-cli-favicon-url.ts:97](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-favicon-url.ts#L97)

Chrome拡張のfavicon endpoint URLを生成する。

## Parameters

### input

[`CreateBookmarkCliFaviconUrlInput`](/1.2.0/api/presentation/cli/bookmark-cli-favicon-url/interfaces/createbookmarkclifaviconurlinput/)

favicon URL生成入力。

## Returns

`string` | `false`

favicon URL、または生成対象外の場合はfalse。

## See

https://developer.chrome.com/docs/extensions/how-to/ui/favicons
