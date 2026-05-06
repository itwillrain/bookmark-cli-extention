---
editUrl: false
next: false
prev: false
title: isResultNumberInput
slug: 1.2.1/api/domain/bookmarks/result-selection/functions/isresultnumberinput
---

> **isResultNumberInput**(`input`): `boolean`

Defined in: [domain/bookmarks/result-selection.ts:94](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/bookmarks/result-selection.ts#L94)

入力が直前結果の番号指定かを判定します。

## Parameters

### input

`string`

CLI path-or-index入力です。

## Returns

`boolean`

数字だけの入力ならtrueです。

## Example

```ts
const result = isResultNumberInput("12");
// true
```
