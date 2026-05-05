---
editUrl: false
next: false
prev: false
title: normalizeVirtualTags
slug: 1.2.0/api/domain/tags/virtual-tag/functions/normalizevirtualtags
---

> **normalizeVirtualTags**(`tagInputs`): readonly `string`\[]

Defined in: [domain/tags/virtual-tag.ts:83](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/tags/virtual-tag.ts#L83)

仮想タグ入力一覧を正規化。

## Parameters

### tagInputs

readonly `string`\[]

入力された仮想タグ一覧。

## Returns

readonly `string`\[]

正規化済み仮想タグ一覧。

## Example

```ts
const result = normalizeVirtualTags(["#Prod", "prod", " finance "]);
// ["prod", "finance"]
```
