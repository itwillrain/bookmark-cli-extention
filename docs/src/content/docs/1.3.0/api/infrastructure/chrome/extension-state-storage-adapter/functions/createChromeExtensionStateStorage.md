---
editUrl: false
next: false
prev: false
title: createChromeExtensionStateStorage
slug: 1.3.0/api/infrastructure/chrome/extension-state-storage-adapter/functions/createchromeextensionstatestorage
---

> **createChromeExtensionStateStorage**(`storageArea`): [`ExtensionStateStoragePort`](/1.3.0/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/infrastructure/chrome/extension-state-storage-adapter.ts#L153)

Chrome storage.localをExtensionStateStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageLocalArea`](/1.3.0/api/infrastructure/chrome/extension-state-storage-adapter/interfaces/chromestoragelocalarea/)

Chrome storage.local API。

## Returns

[`ExtensionStateStoragePort`](/1.3.0/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

拡張状態storage port。
