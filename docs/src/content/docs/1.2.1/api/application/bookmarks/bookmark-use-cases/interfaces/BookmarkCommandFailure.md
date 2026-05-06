---
editUrl: false
next: false
prev: false
title: BookmarkCommandFailure
slug: 1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L52)

Bookmark commandの失敗結果です。

## Properties

### errorCode

> `readonly` **errorCode**: [`BookmarkCommandErrorCode`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommanderrorcode/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L60)

エラー種別です。

***

### message

> `readonly` **message**: `string`

Defined in: [application/bookmarks/bookmark-use-cases.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L64)

CLIに表示できるエラーメッセージです。

***

### ok

> `readonly` **ok**: `false`

Defined in: [application/bookmarks/bookmark-use-cases.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-use-cases.ts#L56)

失敗したことを表します。
