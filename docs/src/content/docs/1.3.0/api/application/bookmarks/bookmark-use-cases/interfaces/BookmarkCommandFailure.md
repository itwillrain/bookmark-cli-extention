---
editUrl: false
next: false
prev: false
title: BookmarkCommandFailure
slug: 1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure
---

Defined in: [application/bookmarks/bookmark-use-cases.ts:52](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-use-cases.ts#L52)

Bookmark commandの失敗結果です。

## Properties

### errorCode

> `readonly` **errorCode**: [`BookmarkCommandErrorCode`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommanderrorcode/)

Defined in: [application/bookmarks/bookmark-use-cases.ts:60](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-use-cases.ts#L60)

エラー種別です。

***

### message

> `readonly` **message**: `string`

Defined in: [application/bookmarks/bookmark-use-cases.ts:64](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-use-cases.ts#L64)

CLIに表示できるエラーメッセージです。

***

### ok

> `readonly` **ok**: `false`

Defined in: [application/bookmarks/bookmark-use-cases.ts:56](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-use-cases.ts#L56)

失敗したことを表します。
