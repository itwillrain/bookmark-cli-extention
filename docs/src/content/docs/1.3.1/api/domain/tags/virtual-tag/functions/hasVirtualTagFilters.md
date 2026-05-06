---
editUrl: false
next: false
prev: false
title: hasVirtualTagFilters
slug: 1.3.1/api/domain/tags/virtual-tag/functions/hasvirtualtagfilters
---

> **hasVirtualTagFilters**(`query`): `boolean`

Defined in: [domain/tags/virtual-tag.ts:246](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/tags/virtual-tag.ts#L246)

仮想タグ検索条件を持つかを判定。

## Parameters

### query

[`VirtualTagSearchQuery`](/1.3.1/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

仮想タグ検索query。

## Returns

`boolean`

仮想タグ条件があればtrue。

## Example

```ts
const result = hasVirtualTagFilters({ textQuery: "Stripe", tags: ["finance"] });
// true
```
