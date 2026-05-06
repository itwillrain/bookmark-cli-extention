---
editUrl: false
next: false
prev: false
title: normalizeVirtualTag
slug: 1.3.0/api/domain/tags/virtual-tag/functions/normalizevirtualtag
---

> **normalizeVirtualTag**(`tagInput`): `string`

Defined in: [domain/tags/virtual-tag.ts:54](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/tags/virtual-tag.ts#L54)

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
