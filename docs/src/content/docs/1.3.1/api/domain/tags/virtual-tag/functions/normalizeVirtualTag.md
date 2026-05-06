---
editUrl: false
next: false
prev: false
title: normalizeVirtualTag
slug: 1.3.1/api/domain/tags/virtual-tag/functions/normalizevirtualtag
---

> **normalizeVirtualTag**(`tagInput`): `string`

Defined in: [domain/tags/virtual-tag.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/tags/virtual-tag.ts#L54)

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
