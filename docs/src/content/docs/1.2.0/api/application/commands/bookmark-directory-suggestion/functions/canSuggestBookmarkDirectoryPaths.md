---
editUrl: false
next: false
prev: false
title: canSuggestBookmarkDirectoryPaths
slug: 1.2.0/api/application/commands/bookmark-directory-suggestion/functions/cansuggestbookmarkdirectorypaths
---

> **canSuggestBookmarkDirectoryPaths**(`inputValue`): `boolean`

Defined in: [application/commands/bookmark-directory-suggestion.ts:201](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/application/commands/bookmark-directory-suggestion.ts#L201)

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
