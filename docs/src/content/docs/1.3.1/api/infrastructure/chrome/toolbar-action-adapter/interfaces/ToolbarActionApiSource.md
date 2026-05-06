---
editUrl: false
next: false
prev: false
title: ToolbarActionApiSource
slug: 1.3.1/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaractionapisource
---

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/toolbar-action-adapter.ts#L17)

Chrome MV3とFirefox MV2のtoolbar action APIを含む最小shapeです。

## Properties

### action?

> `readonly` `optional` **action?**: [`ToolbarAction`](/1.3.1/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaraction/)

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/toolbar-action-adapter.ts#L19)

Chrome MV3またはFirefox MV3のaction APIです。

***

### browserAction?

> `readonly` `optional` **browserAction?**: [`ToolbarAction`](/1.3.1/api/infrastructure/chrome/toolbar-action-adapter/interfaces/toolbaraction/)

Defined in: [infrastructure/chrome/toolbar-action-adapter.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/infrastructure/chrome/toolbar-action-adapter.ts#L21)

Firefox MV2のbrowserAction APIです。
