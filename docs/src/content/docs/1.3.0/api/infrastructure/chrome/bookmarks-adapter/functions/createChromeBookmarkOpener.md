---
editUrl: false
next: false
prev: false
title: createChromeBookmarkOpener
slug: 1.3.0/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkopener
---

> **createChromeBookmarkOpener**(`tabsApi`): [`BookmarkOpenerPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:289](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/bookmarks-adapter.ts#L289)

Chrome Tabs APIをApplication層のopener portへ変換します。

## Parameters

### tabsApi

[`ChromeTabsApi`](/1.3.0/api/infrastructure/chrome/bookmarks-adapter/interfaces/chrometabsapi/)

Chrome Tabs APIです。

## Returns

[`BookmarkOpenerPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Bookmark URLを開くportです。
