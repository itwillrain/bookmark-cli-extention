---
editUrl: false
next: false
prev: false
title: hasVirtualTagFilters
slug: 1.3.0/api/domain/tags/virtual-tag/functions/hasvirtualtagfilters
---

> **hasVirtualTagFilters**(`query`): `boolean`

Defined in: [domain/tags/virtual-tag.ts:246](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/domain/tags/virtual-tag.ts#L246)

仮想タグ検索条件を持つかを判定。

## Parameters

### query

[`VirtualTagSearchQuery`](/1.3.0/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

仮想タグ検索query。

## Returns

`boolean`

仮想タグ条件があればtrue。

## Example

```ts
const result = hasVirtualTagFilters({ textQuery: "Stripe", tags: ["finance"] });
// true
```
