---
editUrl: false
next: false
prev: false
title: createChromeBookmarkOpener
slug: 1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/functions/createchromebookmarkopener
---

> **createChromeBookmarkOpener**(`tabsApi`, `launchContextStorage?`): [`BookmarkOpenerPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [infrastructure/chrome/bookmark-opener-adapter.ts:97](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/bookmark-opener-adapter.ts#L97)

Chrome Tabs APIをApplication層のopener portへ変換します。

## Parameters

### tabsApi

[`ChromeTabsApi`](/1.3.2/api/infrastructure/chrome/bookmark-opener-adapter/interfaces/chrometabsapi/)

Chrome Tabs APIです。

### launchContextStorage?

[`LaunchContextStoragePort`](/1.3.2/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

LaunchContext storageです。

## Returns

[`BookmarkOpenerPort`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Bookmark URLを開くportです。
