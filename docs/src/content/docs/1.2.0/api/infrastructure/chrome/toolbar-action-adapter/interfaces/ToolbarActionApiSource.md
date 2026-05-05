---
editUrl: false
next: false
prev: false
title: ToolbarActionApiSource
slug: 1.2.0/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaractionapisource
---

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/toolbar-action-adapter.ts#L17)

Chrome MV3とFirefox MV2のtoolbar action APIを含む最小shapeです。

## Properties

### action?

> `readonly` `optional` **action?**: [`ToolbarAction`](/1.2.0/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaraction/)

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/toolbar-action-adapter.ts#L19)

Chrome MV3またはFirefox MV3のaction APIです。

***

### browserAction?

> `readonly` `optional` **browserAction?**: [`ToolbarAction`](/1.2.0/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaraction/)

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/infrastructure/chrome/toolbar-action-adapter.ts#L21)

Firefox MV2のbrowserAction APIです。
