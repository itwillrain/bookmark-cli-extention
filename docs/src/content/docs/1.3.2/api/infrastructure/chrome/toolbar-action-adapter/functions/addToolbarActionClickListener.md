---
editUrl: false
next: false
prev: false
title: addToolbarActionClickListener
slug: 1.3.2/api/infrastructure/chrome/toolbar-action-adapter/functions/addtoolbaractionclicklistener
---

> **addToolbarActionClickListener**(`apiSource`, `listener`): `boolean`

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:46](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/toolbar-action-adapter.ts#L46)

Toolbar action click listenerを登録します。

## Parameters

### apiSource

[`ToolbarActionApiSource`](/1.3.2/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaractionapisource/)

Browser API sourceです。

### listener

[`ToolbarActionClickListener`](/1.3.2/api/infrastructure/chrome/toolbar-action-adapter/type-aliases/toolbaractionclicklistener/)

登録するclick listenerです。

## Returns

`boolean`

listenerを登録できた場合はtrueです。

## See

* https://developer.chrome.com/docs/extensions/reference/api/action
* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction
