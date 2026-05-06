---
editUrl: false
next: false
prev: false
title: resolveEntryByResultNumber
slug: 1.3.0/api/domain/bookmarks/result-selection/functions/resolveentrybyresultnumber
---

> **resolveEntryByResultNumber**\<`TEntry`>(`resultEntries`, `resultNumberInput`): [`ResultEntryResolution`](/1.3.0/api/domain/bookmarks/result-selection/type-aliases/resultentryresolution/)\<`TEntry`>

Defined in: [domain/bookmarks/result-selection.ts:150](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/bookmarks/result-selection.ts#L150)

直前結果一覧から番号指定されたentryを解決します。

## Type Parameters

### TEntry

`TEntry`

entry型です。

## Parameters

### resultEntries

readonly `TEntry`\[]

直前結果のentry一覧です。

### resultNumberInput

`string`

CLIに入力された1-based result numberです。

## Returns

[`ResultEntryResolution`](/1.3.0/api/domain/bookmarks/result-selection/type-aliases/resultentryresolution/)\<`TEntry`>

entry解決結果です。

## Example

```ts
const result = resolveEntryByResultNumber(["alpha", "beta"], "2");
// { ok: true, entry: "beta" }
```
