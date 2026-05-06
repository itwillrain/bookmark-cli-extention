---
editUrl: false
next: false
prev: false
title: hasVirtualTagFilters
slug: 1.2.1/api/domain/tags/virtual-tag/functions/hasvirtualtagfilters
---

> **hasVirtualTagFilters**(`query`): `boolean`

Defined in: [domain/tags/virtual-tag.ts:246](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/tags/virtual-tag.ts#L246)

仮想タグ検索条件を持つかを判定。

## Parameters

### query

[`VirtualTagSearchQuery`](/1.2.1/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

仮想タグ検索query。

## Returns

`boolean`

仮想タグ条件があればtrue。

## Example

```ts
const result = hasVirtualTagFilters({ textQuery: "Stripe", tags: ["finance"] });
// true
```
