---
editUrl: false
next: false
prev: false
title: hasVirtualTagFilters
slug: 1.2.0/api/domain/tags/virtual-tag/functions/hasvirtualtagfilters
---

> **hasVirtualTagFilters**(`query`): `boolean`

Defined in: [domain/tags/virtual-tag.ts:246](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/domain/tags/virtual-tag.ts#L246)

仮想タグ検索条件を持つかを判定。

## Parameters

### query

[`VirtualTagSearchQuery`](/1.2.0/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

仮想タグ検索query。

## Returns

`boolean`

仮想タグ条件があればtrue。

## Example

```ts
const result = hasVirtualTagFilters({ textQuery: "Stripe", tags: ["finance"] });
// true
```
