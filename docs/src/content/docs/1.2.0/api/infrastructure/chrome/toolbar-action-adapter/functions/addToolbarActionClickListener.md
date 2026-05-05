---
editUrl: false
next: false
prev: false
title: addToolbarActionClickListener
slug: 1.2.0/api/infrastructure/chrome/toolbar-action-adapter/functions/addtoolbaractionclicklistener
---

> **addToolbarActionClickListener**(`apiSource`, `listener`): `boolean`

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/toolbar-action-adapter.ts#L46)

Toolbar action click listenerを登録します。

## Parameters

### apiSource

[`ToolbarActionApiSource`](/1.2.0/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaractionapisource/)

Browser API sourceです。

### listener

[`ToolbarActionClickListener`](/1.2.0/api/infrastructure/chrome/toolbar-action-adapter/type-aliases/toolbaractionclicklistener/)

登録するclick listenerです。

## Returns

`boolean`

listenerを登録できた場合はtrueです。

## See

* https://developer.chrome.com/docs/extensions/reference/api/action
* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction
