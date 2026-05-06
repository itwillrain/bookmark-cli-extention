---
editUrl: false
next: false
prev: false
title: addToolbarActionClickListener
slug: 1.3.1/api/infrastructure/chrome/toolbar-action-adapter/functions/addtoolbaractionclicklistener
---

> **addToolbarActionClickListener**(`apiSource`, `listener`): `boolean`

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/toolbar-action-adapter.ts#L46)

Toolbar action click listenerを登録します。

## Parameters

### apiSource

[`ToolbarActionApiSource`](/1.3.1/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaractionapisource/)

Browser API sourceです。

### listener

[`ToolbarActionClickListener`](/1.3.1/api/infrastructure/chrome/toolbar-action-adapter/type-aliases/toolbaractionclicklistener/)

登録するclick listenerです。

## Returns

`boolean`

listenerを登録できた場合はtrueです。

## See

* https://developer.chrome.com/docs/extensions/reference/api/action
* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction
