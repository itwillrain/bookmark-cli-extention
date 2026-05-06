---
editUrl: false
next: false
prev: false
title: RawBrowserHistoryItem
slug: 1.3.0/api/domain/history/browser-history/interfaces/rawbrowserhistoryitem
---

Defined in: [domain/history/browser-history.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L19)

Chrome History API由来のitem。

## See

https://developer.chrome.com/docs/extensions/reference/api/history#type-HistoryItem

## Properties

### id

> `readonly` **id**: `string`

Defined in: [domain/history/browser-history.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L21)

Chrome History API上のID。

***

### lastVisitTime?

> `readonly` `optional` **lastVisitTime?**: `number`

Defined in: [domain/history/browser-history.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L23)

最終訪問日時。epoch milliseconds。

***

### title?

> `readonly` `optional` **title?**: `string`

Defined in: [domain/history/browser-history.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L25)

表示title。

***

### typedCount?

> `readonly` `optional` **typedCount?**: `number`

Defined in: [domain/history/browser-history.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L27)

アドレスバー入力で開いた回数。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [domain/history/browser-history.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L29)

訪問URL。

***

### visitCount?

> `readonly` `optional` **visitCount?**: `number`

Defined in: [domain/history/browser-history.ts:31](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/history/browser-history.ts#L31)

訪問回数。
