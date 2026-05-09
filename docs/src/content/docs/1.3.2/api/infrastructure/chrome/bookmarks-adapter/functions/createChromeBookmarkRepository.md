---
editUrl: false
next: false
prev: false
title: createChromeBookmarkRepository
slug: 1.3.2/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkrepository
---

> **createChromeBookmarkRepository**(`bookmarksApi`): [`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:172](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L172)

Chrome Bookmarks APIをApplication層のrepository portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.3.2/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkRepositoryPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Bookmark Tree取得portです。
