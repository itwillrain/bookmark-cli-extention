---
editUrl: false
next: false
prev: false
title: createChromeBookmarkOrganizer
slug: 1.3.2/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkorganizer
---

> **createChromeBookmarkOrganizer**(`bookmarksApi`): [`BookmarkOrganizerPort`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:217](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmarks-adapter.ts#L217)

Chrome Bookmarks APIをApplication層のorganizer portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksMutationApi`](/1.3.2/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksmutationapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkOrganizerPort`](/1.3.2/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Bookmark整理portです。
