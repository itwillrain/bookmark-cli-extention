---
editUrl: false
next: false
prev: false
title: createChromeBookmarkRepository
slug: 1.2.1/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkrepository
---

> **createChromeBookmarkRepository**(`bookmarksApi`): [`BookmarkRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:190](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L190)

Chrome Bookmarks APIをApplication層のrepository portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.2.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkRepositoryPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Bookmark Tree取得portです。
