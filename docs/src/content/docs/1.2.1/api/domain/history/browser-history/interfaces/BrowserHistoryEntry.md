---
editUrl: false
next: false
prev: false
title: BrowserHistoryEntry
slug: 1.2.1/api/domain/history/browser-history/interfaces/browserhistoryentry
---

Defined in: [domain/history/browser-history.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L35)

疑似CLIで扱うChrome履歴entry。

## Properties

### childrenCount

> `readonly` **childrenCount**: `0`

Defined in: [domain/history/browser-history.ts:37](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L37)

子要素数。

***

### folderPath

> `readonly` **folderPath**: `"/History"`

Defined in: [domain/history/browser-history.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L39)

疑似CLI上の仮想folder path。

***

### id

> `readonly` **id**: `string`

Defined in: [domain/history/browser-history.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L41)

Chrome History API上のID。

***

### kind

> `readonly` **kind**: `"history"`

Defined in: [domain/history/browser-history.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L43)

Entry種別。

***

### lastVisitTime

> `readonly` **lastVisitTime**: `number`

Defined in: [domain/history/browser-history.ts:45](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L45)

最終訪問日時。epoch milliseconds。

***

### parentId

> `readonly` **parentId**: `"history"`

Defined in: [domain/history/browser-history.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L47)

仮想親ID。

***

### title

> `readonly` **title**: `string`

Defined in: [domain/history/browser-history.ts:49](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L49)

表示title。

***

### typedCount

> `readonly` **typedCount**: `number`

Defined in: [domain/history/browser-history.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L51)

アドレスバー入力で開いた回数。

***

### url

> `readonly` **url**: `string`

Defined in: [domain/history/browser-history.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L53)

訪問URL。

***

### visitCount

> `readonly` **visitCount**: `number`

Defined in: [domain/history/browser-history.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/history/browser-history.ts#L55)

訪問回数。
