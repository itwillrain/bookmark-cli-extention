---
editUrl: false
next: false
prev: false
title: isResultNumberInput
slug: 1.3.0/api/domain/bookmarks/result-selection/functions/isresultnumberinput
---

> **isResultNumberInput**(`input`): `boolean`

Defined in: [domain/bookmarks/result-selection.ts:94](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/bookmarks/result-selection.ts#L94)

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
