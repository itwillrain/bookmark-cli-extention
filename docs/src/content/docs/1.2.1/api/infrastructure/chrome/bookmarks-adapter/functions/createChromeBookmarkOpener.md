---
editUrl: false
next: false
prev: false
title: createChromeBookmarkOpener
slug: 1.2.1/api/infrastructure/chrome/bookmarks-adapter/functions/createchromebookmarkopener
---

> **createChromeBookmarkOpener**(`tabsApi`): [`BookmarkOpenerPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [infrastructure/chrome/bookmarks-adapter.ts:289](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/bookmarks-adapter.ts#L289)

Chrome Tabs APIをApplication層のopener portへ変換します。

## Parameters

### tabsApi

[`ChromeTabsApi`](/1.2.1/api/infrastructure/chrome/bookmarks-adapter/interfaces/chrometabsapi/)

Chrome Tabs APIです。

## Returns

[`BookmarkOpenerPort`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Bookmark URLを開くportです。
