---
editUrl: false
next: false
prev: false
title: createFailure
slug: 1.2.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createfailure
---

> **createFailure**(`errorCode`, `message`): [`BookmarkCommandFailure`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L54)

失敗結果を作成。

## Parameters

### errorCode

[`BookmarkCommandErrorCode`](/1.2.1/api/application/bookmarks/bookmark-use-cases/type-aliases/bookmarkcommanderrorcode/)

エラーcode。

### message

`string`

表示message。

## Returns

[`BookmarkCommandFailure`](/1.2.1/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkcommandfailure/)

失敗結果。

## Example

```ts
const result = createFailure(errorCode, message);
```
