---
editUrl: false
next: false
prev: false
title: CreateCurrentInputChangeHandlerInput
slug: 1.3.0/api/entrypoints/cli-page/current-input-change-handler/interfaces/createcurrentinputchangehandlerinput
---

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-input-change-handler.ts#L22)

Current input change handler作成入力です。

## Properties

### canExpandCommandAbbreviation

> `readonly` **canExpandCommandAbbreviation**: `boolean`

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-input-change-handler.ts#L24)

Command abbreviationを展開できる状態かです。

***

### clearSelectedResultIndex

> `readonly` **clearSelectedResultIndex**: `CursorClearHandler`

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:26](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-input-change-handler.ts#L26)

選択中result cursorを解除するhandlerです。

***

### clearSelectedSuggestionIndex

> `readonly` **clearSelectedSuggestionIndex**: `CursorClearHandler`

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:28](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-input-change-handler.ts#L28)

選択中suggestion cursorを解除するhandlerです。

***

### commandAbbreviations

> `readonly` **commandAbbreviations**: readonly `CurrentInputCommandAbbreviation`\[]

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-input-change-handler.ts#L30)

Command abbreviation一覧です。

***

### setInputValue

> `readonly` **setInputValue**: `InputValueSetter`

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:32](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/current-input-change-handler.ts#L32)

入力値setterです。
