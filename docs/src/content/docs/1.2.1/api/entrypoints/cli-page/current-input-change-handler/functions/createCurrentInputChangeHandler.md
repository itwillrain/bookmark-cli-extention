---
editUrl: false
next: false
prev: false
title: createCurrentInputChangeHandler
slug: 1.2.1/api/entrypoints/cli-page/current-input-change-handler/functions/createcurrentinputchangehandler
---

> **createCurrentInputChangeHandler**(`input`): [`CurrentInputChangeHandler`](/1.2.1/api/entrypoints/cli-page/current-input-change-handler/type-aliases/currentinputchangehandler/)

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/entrypoints/cli-page/current-input-change-handler.ts#L39)

Current input change handlerを作成します。

## Parameters

### input

[`CreateCurrentInputChangeHandlerInput`](/1.2.1/api/entrypoints/cli-page/current-input-change-handler/interfaces/createcurrentinputchangehandlerinput/)

Current input change handler作成入力です。

## Returns

[`CurrentInputChangeHandler`](/1.2.1/api/entrypoints/cli-page/current-input-change-handler/type-aliases/currentinputchangehandler/)

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
