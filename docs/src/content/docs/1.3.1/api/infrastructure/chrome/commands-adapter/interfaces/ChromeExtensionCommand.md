---
editUrl: false
next: false
prev: false
title: ChromeExtensionCommand
slug: 1.3.1/api/infrastructure/chrome/commands-adapter/interfaces/chromeextensioncommand
---

Defined in: [infrastructure/chrome/commands-adapter.ts:5](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/commands-adapter.ts#L5)

Chrome commands APIが返すcommandの最小shapeです。

## See

https://developer.chrome.com/docs/extensions/reference/api/commands#type-Command

## Properties

### description?

> `readonly` `optional` **description?**: `string`

Defined in: [infrastructure/chrome/commands-adapter.ts:7](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/commands-adapter.ts#L7)

Command説明です。

***

### name?

> `readonly` `optional` **name?**: `string`

Defined in: [infrastructure/chrome/commands-adapter.ts:9](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/commands-adapter.ts#L9)

Command名です。

***

### shortcut?

> `readonly` `optional` **shortcut?**: `string`

Defined in: [infrastructure/chrome/commands-adapter.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/commands-adapter.ts#L11)

有効なshortcutです。
