---
editUrl: false
next: false
prev: false
title: createChromeLaunchContextStorage
slug: 1.2.0/api/infrastructure/chrome/launch-context-storage-adapter/functions/createchromelaunchcontextstorage
---

> **createChromeLaunchContextStorage**(`storageArea`): [`LaunchContextStoragePort`](/1.2.0/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/launch-context-storage-adapter.ts#L65)

Chrome storage.sessionをLaunchContextStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageSessionArea`](/1.2.0/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/chromestoragesessionarea/)

Chrome storage.session API。

## Returns

[`LaunchContextStoragePort`](/1.2.0/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Launch context storage port。
