---
editUrl: false
next: false
prev: false
title: createChromeBookmarkRepository
slug: 1.3.0/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkrepository
---

> **createChromeBookmarkRepository**(`bookmarksApi`): [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:190](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L190)

Chrome Bookmarks APIをApplication層のrepository portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Bookmark Tree取得portです。
