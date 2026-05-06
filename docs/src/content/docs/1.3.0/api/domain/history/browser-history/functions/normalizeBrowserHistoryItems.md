---
editUrl: false
next: false
prev: false
title: normalizeBrowserHistoryItems
slug: 1.3.0/api/domain/history/browser-history/functions/normalizebrowserhistoryitems
---

> **normalizeBrowserHistoryItems**(`items`): readonly [`BrowserHistoryEntry`](/1.3.0/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

Defined in: [domain/history/browser-history.ts:127](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L127)

Chrome History API item一覧をCLI entry一覧へ正規化。

## Parameters

### items

readonly [`RawBrowserHistoryItem`](/1.3.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem/)\[]

Chrome History API item一覧。

## Returns

readonly [`BrowserHistoryEntry`](/1.3.0/api/domain/history/browser-history/interfaces/browserhistoryentry/)\[]

正規化済みChrome履歴entry一覧。

## Example

```ts
const result = normalizeBrowserHistoryItems(items);
```
