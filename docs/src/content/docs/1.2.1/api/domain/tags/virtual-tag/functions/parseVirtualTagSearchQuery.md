---
editUrl: false
next: false
prev: false
title: parseVirtualTagSearchQuery
slug: 1.2.1/api/domain/tags/virtual-tag/functions/parsevirtualtagsearchquery
---

> **parseVirtualTagSearchQuery**(`query`): [`VirtualTagSearchQuery`](/1.2.1/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

Defined in: [domain/tags/virtual-tag.ts:227](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/domain/tags/virtual-tag.ts#L227)

仮想タグ検索queryを解析。

## Parameters

### query

`string`

検索query。

## Returns

[`VirtualTagSearchQuery`](/1.2.1/api/domain/tags/virtual-tag/interfaces/virtualtagsearchquery/)

仮想タグ検索query。

## Example

```ts
const result = parseVirtualTagSearchQuery("Stripe #finance #prod");
// { textQuery: "Stripe", tags: ["finance", "prod"] }
```
