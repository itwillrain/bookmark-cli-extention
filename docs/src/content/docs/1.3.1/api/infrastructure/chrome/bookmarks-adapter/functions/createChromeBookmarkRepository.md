---
editUrl: false
next: false
prev: false
title: createChromeBookmarkRepository
slug: 1.3.1/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkrepository
---

> **createChromeBookmarkRepository**(`bookmarksApi`): [`BookmarkRepositoryPort`](/1.3.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:190](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/bookmarks-adapter.ts#L190)

Chrome Bookmarks APIをApplication層のrepository portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.3.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkRepositoryPort`](/1.3.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Bookmark Tree取得portです。
