---
editUrl: false
next: false
prev: false
title: canSuggestBookmarkDirectoryPaths
slug: 1.2.1/api/application/commands/bookmark-directory-suggestion/functions/cansuggestbookmarkdirectorypaths
---

> **canSuggestBookmarkDirectoryPaths**(`inputValue`): `boolean`

Defined in: [application/commands/bookmark-directory-suggestion.ts:595](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-directory-suggestion.ts#L595)

Directory path suggestion対象入力かを判定。

## Parameters

### inputValue

`string`

CLI入力値。

## Returns

`boolean`

Directory path suggestion対象ならtrue。

## Example

```ts
const result = canSuggestBookmarkDirectoryPaths(inputValue);
```
