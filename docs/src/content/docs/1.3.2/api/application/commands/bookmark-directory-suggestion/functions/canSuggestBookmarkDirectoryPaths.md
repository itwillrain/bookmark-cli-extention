---
editUrl: false
next: false
prev: false
title: canSuggestBookmarkDirectoryPaths
slug: 1.3.2/api/application/commands/bookmark-directory-suggestion/functions/cansuggestbookmarkdirectorypaths
---

> **canSuggestBookmarkDirectoryPaths**(`inputValue`): `boolean`

Defined in: [application/commands/bookmark-directory-suggestion.ts:596](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-directory-suggestion.ts#L596)

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
