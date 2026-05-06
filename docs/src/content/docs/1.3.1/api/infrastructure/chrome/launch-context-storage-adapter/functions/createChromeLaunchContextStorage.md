---
editUrl: false
next: false
prev: false
title: createChromeLaunchContextStorage
slug: 1.3.1/api/infrastructure/chrome/launch-context-storage-adapter/functions/createchromelaunchcontextstorage
---

> **createChromeLaunchContextStorage**(`storageArea`): [`LaunchContextStoragePort`](/1.3.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Defined in: [infrastructure/chrome/launch-context-storage-adapter.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/launch-context-storage-adapter.ts#L65)

Chrome storage.sessionをLaunchContextStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageSessionArea`](/1.3.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/chromestoragesessionarea/)

Chrome storage.session API。

## Returns

[`LaunchContextStoragePort`](/1.3.1/api/infrastructure/chrome/launch-context-storage-adapter/interfaces/launchcontextstorageport/)

Launch context storage port。
