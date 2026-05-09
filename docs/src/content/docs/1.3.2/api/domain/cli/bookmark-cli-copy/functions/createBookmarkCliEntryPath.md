---
editUrl: false
next: false
prev: false
title: createBookmarkCliEntryPath
slug: 1.3.2/api/domain/cli/bookmark-cli-copy/functions/createbookmarkclientrypath
---

> **createBookmarkCliEntryPath**(`entry`): `string`

Defined in: [domain/cli/bookmark-cli-copy.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/domain/cli/bookmark-cli-copy.ts#L51)

EntryのCLI pathを作ります。

## Parameters

### entry

[`BookmarkCliEntry`](/1.3.2/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)

対象entryです。

## Returns

`string`

CLI pathです。

## Example

```ts
const path = createBookmarkCliEntryPath(entry);
```
