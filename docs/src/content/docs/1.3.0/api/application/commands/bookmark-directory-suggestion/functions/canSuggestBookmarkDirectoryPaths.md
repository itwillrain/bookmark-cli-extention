---
editUrl: false
next: false
prev: false
title: canSuggestBookmarkDirectoryPaths
slug: 1.3.0/api/application/commands/bookmark-directory-suggestion/functions/cansuggestbookmarkdirectorypaths
---

> **canSuggestBookmarkDirectoryPaths**(`inputValue`): `boolean`

Defined in: [application/commands/bookmark-directory-suggestion.ts:595](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-directory-suggestion.ts#L595)

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
