---
editUrl: false
next: false
prev: false
title: createNotFoundFailure
slug: 1.3.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createnotfoundfailure
---

> **createNotFoundFailure**(`targetInput`): [`BookmarkCommandFailure`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:84](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L84)

対象未検出の失敗結果を作成。

## Parameters

### targetInput

`string`

対象入力。

## Returns

[`BookmarkCommandFailure`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

対象未検出の失敗結果。

## Example

```ts
const result = createNotFoundFailure(targetInput);
```
