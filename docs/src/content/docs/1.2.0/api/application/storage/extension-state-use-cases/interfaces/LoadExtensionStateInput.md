---
editUrl: false
next: false
prev: false
title: LoadExtensionStateInput
slug: 1.2.0/api/application/storage/extension-state-use-cases/interfaces/loadextensionstateinput
---

Defined in: [application/storage/extension-state-use-cases.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/storage/extension-state-use-cases.ts#L19)

拡張状態読み込み入力。

## Properties

### now

> `readonly` **now**: [`NowProvider`](/1.2.0/api/application/storage/extension-state-use-cases/type-aliases/nowprovider/)

Defined in: [application/storage/extension-state-use-cases.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/storage/extension-state-use-cases.ts#L21)

現在日時を返すport。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [application/storage/extension-state-use-cases.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/storage/extension-state-use-cases.ts#L23)

Bookmark Tree repository port。

***

### storage

> `readonly` **storage**: [`ExtensionStateStoragePort`](/1.2.0/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

Defined in: [application/storage/extension-state-use-cases.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/storage/extension-state-use-cases.ts#L25)

Extension state storage port。
