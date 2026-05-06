---
editUrl: false
next: false
prev: false
title: createChromeBookmarkOrganizer
slug: 1.3.0/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkorganizer
---

> **createChromeBookmarkOrganizer**(`bookmarksApi`): [`BookmarkOrganizerPort`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:235](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L235)

Chrome Bookmarks APIをApplication層のorganizer portへ変換します。

## Parameters

### bookmarksApi

[`ChromeBookmarksMutationApi`](/1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chromebookmarksmutationapi/)

Chrome Bookmarks APIです。

## Returns

[`BookmarkOrganizerPort`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Bookmark整理portです。
