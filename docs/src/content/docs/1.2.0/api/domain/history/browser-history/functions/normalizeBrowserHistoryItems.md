---
editUrl: false
next: false
prev: false
title: normalizeBrowserHistoryItems
slug: 1.2.0/api/domain/history/browser-history/functions/normalizebrowserhistoryitems
---

> **normalizeBrowserHistoryItems**(`items`): readonly [`BrowserHistoryEntry`](/1.2.0/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

Defined in: [domain/history/browser-history.ts:127](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/history/browser-history.ts#L127)

Chrome History API item一覧をCLI entry一覧へ正規化。

## Parameters

### items

readonly [`RawBrowserHistoryItem`](/1.2.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]

Chrome History API item一覧。

## Returns

readonly [`BrowserHistoryEntry`](/1.2.0/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

正規化済みChrome履歴entry一覧。

## Example

```ts
const result = normalizeBrowserHistoryItems(items);
```
