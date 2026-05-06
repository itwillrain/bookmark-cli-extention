---
editUrl: false
next: false
prev: false
title: parseVirtualTagSearchQuery
slug: 1.3.1/api/domain/tags/virtual-tag/functions/parsevirtualtagsearchquery
---

> **parseVirtualTagSearchQuery**(`query`): [`VirtualTagSearchQuery`](/1.3.1/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

Defined in: [domain/tags/virtual-tag.ts:227](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/tags/virtual-tag.ts#L227)

仮想タグ検索queryを解析。

## Parameters

### query

`string`

検索query。

## Returns

[`VirtualTagSearchQuery`](/1.3.1/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

仮想タグ検索query。

## Example

```ts
const result = parseVirtualTagSearchQuery("Stripe #finance #prod");
// { textQuery: "Stripe", tags: ["finance", "prod"] }
```
