---
editUrl: false
next: false
prev: false
title: createChromeExtensionStateStorage
slug: 1.2.0/api/infrastructure/chrome/extension-state-storage-adapter/functions/createchromeextensionstatestorage
---

> **createChromeExtensionStateStorage**(`storageArea`): [`ExtensionStateStoragePort`](/1.2.0/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

Defined in: [infrastructure/chrome/extension-state-storage-adapter.ts:110](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/extension-state-storage-adapter.ts#L110)

Chrome storage.localをExtensionStateStoragePortへ変換。

## Parameters

### storageArea

[`ChromeStorageLocalArea`](/1.2.0/api/infrastructure/chrome/extension-state-storage-adapter/interfaces/chromestoragelocalarea/)

Chrome storage.local API。

## Returns

[`ExtensionStateStoragePort`](/1.2.0/api/application/storage/extension-state-ports/interfaces/extensionstatestorageport/)

拡張状態storage port。
