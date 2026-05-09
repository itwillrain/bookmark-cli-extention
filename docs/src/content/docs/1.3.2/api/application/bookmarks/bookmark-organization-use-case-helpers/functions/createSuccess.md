---
editUrl: false
next: false
prev: false
title: createSuccess
slug: 1.3.2/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createsuccess
---

> **createSuccess**\<`TValue`>(`value`): [`BookmarkCommandSuccess`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandsuccess/)\<`TValue`>

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L39)

成功結果を作成。

## Type Parameters

### TValue

`TValue`

## Parameters

### value

`TValue`

成功値。

## Returns

[`BookmarkCommandSuccess`](/1.3.2/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandsuccess/)\<`TValue`>

成功結果。

## Example

```ts
const result = createSuccess(value);
```
