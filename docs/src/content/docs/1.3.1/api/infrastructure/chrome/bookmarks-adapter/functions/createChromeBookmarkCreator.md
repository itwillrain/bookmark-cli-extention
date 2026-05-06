---
editUrl: false
next: false
prev: false
title: createChromeBookmarkCreator
slug: 1.3.1/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkcreator
---

> **createChromeBookmarkCreator**(`bookmarksApi`): [`BookmarkCreatorPort`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:211](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/bookmarks-adapter.ts#L211)

Chrome Bookmarks APIをApplication層のcreator portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.3.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkCreatorPort`](/1.3.1/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Bookmark作成portです。
