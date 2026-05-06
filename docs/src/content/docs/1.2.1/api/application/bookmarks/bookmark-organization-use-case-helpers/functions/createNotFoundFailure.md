---
editUrl: false
next: false
prev: false
title: createNotFoundFailure
slug: 1.2.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createnotfoundfailure
---

> **createNotFoundFailure**(`targetInput`): [`BookmarkCommandFailure`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:84](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L84)

対象未検出の失敗結果を作成。

## Parameters

### targetInput

`string`

対象入力。

## Returns

[`BookmarkCommandFailure`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

対象未検出の失敗結果。

## Example

```ts
const result = createNotFoundFailure(targetInput);
```
