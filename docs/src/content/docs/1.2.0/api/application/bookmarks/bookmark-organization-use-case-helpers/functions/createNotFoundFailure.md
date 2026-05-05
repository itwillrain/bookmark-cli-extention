---
editUrl: false
next: false
prev: false
title: createNotFoundFailure
slug: 1.2.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createnotfoundfailure
---

> **createNotFoundFailure**(`targetInput`): [`BookmarkCommandFailure`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:84](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L84)

対象未検出の失敗結果を作成。

## Parameters

### targetInput

`string`

対象入力。

## Returns

[`BookmarkCommandFailure`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

対象未検出の失敗結果。

## Example

```ts
const result = createNotFoundFailure(targetInput);
```
