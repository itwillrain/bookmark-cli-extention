---
editUrl: false
next: false
prev: false
title: createCurrentInputChangeHandler
slug: 1.2.0/api/entrypoints/cli-page/current-input-change-handler/functions/createcurrentinputchangehandler
---

> **createCurrentInputChangeHandler**(`input`): [`CurrentInputChangeHandler`](/1.2.0/api/entrypoints/cli-page/current-input-change-handler/type-aliases/currentinputchangehandler/)

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/entrypoints/cli-page/current-input-change-handler.ts#L39)

Current input change handlerを作成します。

## Parameters

### input

[`CreateCurrentInputChangeHandlerInput`](/1.2.0/api/entrypoints/cli-page/current-input-change-handler/interfaces/createcurrentinputchangehandlerinput/)

Current input change handler作成入力です。

## Returns

[`CurrentInputChangeHandler`](/1.2.0/api/entrypoints/cli-page/current-input-change-handler/type-aliases/currentinputchangehandler/)

Current input change handlerです。

## Example

```ts
const handleInputChange = createCurrentInputChangeHandler({
  clearSelectedResultIndex,
  clearSelectedSuggestionIndex,
  setInputValue,
});

handleInputChange("mkdir /project");
```
