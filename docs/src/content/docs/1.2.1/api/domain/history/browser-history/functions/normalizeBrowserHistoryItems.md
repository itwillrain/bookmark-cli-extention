---
editUrl: false
next: false
prev: false
title: normalizeBrowserHistoryItems
slug: 1.2.1/api/domain/history/browser-history/functions/normalizebrowserhistoryitems
---

> **normalizeBrowserHistoryItems**(`items`): readonly [`BrowserHistoryEntry`](/1.2.1/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

Defined in: [domain/history/browser-history.ts:127](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L127)

Chrome History API item一覧をCLI entry一覧へ正規化。

## Parameters

### items

readonly [`RawBrowserHistoryItem`](/1.2.1/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]

Chrome History API item一覧。

## Returns

readonly [`BrowserHistoryEntry`](/1.2.1/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

正規化済みChrome履歴entry一覧。

## Example

```ts
const result = normalizeBrowserHistoryItems(items);
```
