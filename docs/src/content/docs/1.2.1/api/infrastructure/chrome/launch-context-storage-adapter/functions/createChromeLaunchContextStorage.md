---
editUrl: false
next: false
prev: false
title: createChromeLaunchContextStorage
slug: 1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/functions/createchromelaunchcontextstorage
---

> **createChromeLaunchContextStorage**(`storageArea`): [`LaunchContextStoragePort`](/1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/infrastructure/chrome/launch-context-storage-adapter.ts#L65)

Chrome storage.sessionをLaunchContextStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageSessionArea`](/1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/chromestoragesessionarea/)

Chrome storage.session API。

## Returns

[`LaunchContextStoragePort`](/1.2.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Launch context storage port。
