---
editUrl: false
next: false
prev: false
title: normalizeVirtualTag
slug: 1.3.2/api/domain/tags/virtual-tag/functions/normalizevirtualtag
---

> **normalizeVirtualTag**(`tagInput`): `string`

Defined in: [domain/tags/virtual-tag.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/tags/virtual-tag.ts#L54)

仮想タグ名を正規化。

## Parameters

### tagInput

`string`

入力された仮想タグ名。

## Returns

`string`

正規化済み仮想タグ名。

## Example

```ts
const result = normalizeVirtualTag("#Prod");
// "prod"
```
