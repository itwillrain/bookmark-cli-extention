---
editUrl: false
next: false
prev: false
title: createBookmarkCliEntryPath
slug: 1.3.1/api/domain/cli/bookmark-cli-copy/functions/createbookmarkclientrypath
---

> **createBookmarkCliEntryPath**(`entry`): `string`

Defined in: [domain/cli/bookmark-cli-copy.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/domain/cli/bookmark-cli-copy.ts#L51)

EntryのCLI pathを作ります。

## Parameters

### entry

[`BookmarkCliEntry`](/1.3.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)

対象entryです。

## Returns

`string`

CLI pathです。

## Example

```ts
const path = createBookmarkCliEntryPath(entry);
```
