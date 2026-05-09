---
editUrl: false
next: false
prev: false
title: createChromeBookmarkCreator
slug: 1.3.2/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkcreator
---

> **createChromeBookmarkCreator**(`bookmarksApi`): [`BookmarkCreatorPort`](/1.3.2/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:193](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L193)

Chrome Bookmarks APIをApplication層のcreator portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksApi`](/1.3.2/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkCreatorPort`](/1.3.2/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Bookmark作成portです。
