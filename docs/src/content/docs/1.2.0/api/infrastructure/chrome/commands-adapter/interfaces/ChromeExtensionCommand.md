---
editUrl: false
next: false
prev: false
title: ChromeExtensionCommand
slug: 1.2.0/api/infrastructure/chrome/commands-adapter/interfaces/chromeextensioncommand
---

Defined in: [infrastructure/chrome/commands-adapter.ts:5](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/commands-adapter.ts#L5)

Chrome commands APIが返すcommandの最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/commands#type-Command

## Properties

### description?

> `readonly` `optional` **description?**: `string`

Defined in: [infrastructure/chrome/commands-adapter.ts:7](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/commands-adapter.ts#L7)

Command説明です。

***

### name?

> `readonly` `optional` **name?**: `string`

Defined in: [infrastructure/chrome/commands-adapter.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/commands-adapter.ts#L9)

Command名です。

***

### shortcut?

> `readonly` `optional` **shortcut?**: `string`

Defined in: [infrastructure/chrome/commands-adapter.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/commands-adapter.ts#L11)

有効なshortcutです。
