---
editUrl: false
next: false
prev: false
title: createChromeBookmarkCreator
slug: 1.3.0/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkcreator
---

> **createChromeBookmarkCreator**(`bookmarksApi`): [`BookmarkCreatorPort`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:211](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L211)

Chrome Bookmarks APIをApplication層のcreator portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkCreatorPort`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Bookmark作成portです。
