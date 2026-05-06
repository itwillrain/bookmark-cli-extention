---
editUrl: false
next: false
prev: false
title: createFailure
slug: 1.3.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createfailure
---

> **createFailure**(`errorCode`, `message`): [`BookmarkCommandFailure`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L54)

失敗結果を作成。

## Parameters

### errorCode

[`BookmarkCommandErrorCode`](/1.3.0/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommanderrorcode/)

エラーcode。

### message

`string`

表示message。

## Returns

[`BookmarkCommandFailure`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

失敗結果。

## Example

```ts
const result = createFailure(errorCode, message);
```
