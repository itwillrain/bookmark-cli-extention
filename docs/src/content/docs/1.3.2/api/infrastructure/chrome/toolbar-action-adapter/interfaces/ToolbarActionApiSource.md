---
editUrl: false
next: false
prev: false
title: ToolbarActionApiSource
slug: 1.3.2/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaractionapisource
---

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/toolbar-action-adapter.ts#L17)

Chrome MV3とFirefox MV2のtoolbar action APIを含む最小shapeです。

## Properties

### action?

> `readonly` `optional` **action?**: [`ToolbarAction`](/1.3.2/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaraction/)

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/toolbar-action-adapter.ts#L19)

Chrome MV3またはFirefox MV3のaction APIです。

***

### browserAction?

> `readonly` `optional` **browserAction?**: [`ToolbarAction`](/1.3.2/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaraction/)

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/infrastructure/chrome/toolbar-action-adapter.ts#L21)

Firefox MV2のbrowserAction APIです。
