---
editUrl: false
next: false
prev: false
title: createCurrentInputChangeHandler
slug: 1.3.1/api/entrypoints/cli-page/current-input-change-handler/functions/createcurrentinputchangehandler
---

> **createCurrentInputChangeHandler**(`input`): [`CurrentInputChangeHandler`](/1.3.1/api/entrypoints/cli-page/current-input-change-handler/type-aliases/currentinputchangehandler/)

Defined in: [entrypoints/cli-page/current-input-change-handler.ts:71](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/current-input-change-handler.ts#L71)

Current input change handlerを作成します。

## Parameters

### input

[`CreateCurrentInputChangeHandlerInput`](/1.3.1/api/entrypoints/cli-page/current-input-change-handler/interfaces/createcurrentinputchangehandlerinput/)

Current input change handler作成入力です。

## Returns

[`CurrentInputChangeHandler`](/1.3.1/api/entrypoints/cli-page/current-input-change-handler/type-aliases/currentinputchangehandler/)

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
