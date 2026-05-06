---
editUrl: false
next: false
prev: false
title: createOrganizeBookmarkValue
slug: 1.2.1/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createorganizebookmarkvalue
---

> **createOrganizeBookmarkValue**(`executed`, `entries`): [`OrganizeBookmarkValue`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkvalue/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:217](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L217)

Bookmark整理成功値を作成。

## Parameters

### executed

`boolean`

書き込み済みならtrue。

### entries

readonly [`BookmarkEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

表示対象entry一覧。

## Returns

[`OrganizeBookmarkValue`](/1.2.1/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkvalue/)

Bookmark整理成功値。

## Example

```ts
const result = createOrganizeBookmarkValue(executed, entries);
```
