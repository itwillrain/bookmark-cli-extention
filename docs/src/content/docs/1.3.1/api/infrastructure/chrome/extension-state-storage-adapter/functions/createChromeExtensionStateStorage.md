---
editUrl: false
next: false
prev: false
title: createChromeExtensionStateStorage
slug: 1.3.1/api/infrastructure/chrome/extension-state-storage-adapter/functions/createchromeextensionstatestorage
---

> **createChromeExtensionStateStorage**(`storageArea`): [`ExtensionStateStoragePort`](/1.3.1/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/extension-state-storage-adapter.ts#L153)

Chrome storage.localをExtensionStateStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageLocalArea`](/1.3.1/api/infrastructure/chrome/extension-state-storage-adapter/interfaces/chromestoragelocalarea/)

Chrome storage.local API。

## Returns

[`ExtensionStateStoragePort`](/1.3.1/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

拡張状態storage port。
