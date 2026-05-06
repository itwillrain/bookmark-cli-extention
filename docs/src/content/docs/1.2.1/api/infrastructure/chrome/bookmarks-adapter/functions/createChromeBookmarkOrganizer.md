---
editUrl: false
next: false
prev: false
title: createChromeBookmarkOrganizer
slug: 1.2.1/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkorganizer
---

> **createChromeBookmarkOrganizer**(`bookmarksApi`): [`BookmarkOrganizerPort`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:235](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L235)

Chrome Bookmarks APIをApplication層のorganizer portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksMutationApi`](/1.2.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksmutationapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkOrganizerPort`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Bookmark整理portです。
