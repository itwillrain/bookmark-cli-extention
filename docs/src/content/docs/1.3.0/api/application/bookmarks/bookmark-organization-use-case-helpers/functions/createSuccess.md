---
editUrl: false
next: false
prev: false
title: createSuccess
slug: 1.3.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createsuccess
---

> **createSuccess**\<`TValue`>(`value`): [`BookmarkCommandSuccess`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandsuccess/)\<`TValue`>

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L39)

成功結果を作成。

## Type Parameters

### TValue

`TValue`

## Parameters

### value

`TValue`

成功値。

## Returns

[`BookmarkCommandSuccess`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandsuccess/)\<`TValue`>

成功結果。

## Example

```ts
const result = createSuccess(value);
```
