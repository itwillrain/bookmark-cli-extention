---
editUrl: false
next: false
prev: false
title: createOrganizeBookmarkValue
slug: 1.3.0/api/application/bookmarks/bookmark-organization-use-case-helpers/functions/createorganizebookmarkvalue
---

> **createOrganizeBookmarkValue**(`executed`, `entries`): [`OrganizeBookmarkValue`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkvalue/)

Defined in: [application/bookmarks/bookmark-organization-use-case-helpers.ts:217](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/bookmark-organization-use-case-helpers.ts#L217)

Bookmark整理成功値を作成。

## Parameters

### executed

`boolean`

書き込み済みならtrue。

### entries

readonly [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)\[]

表示対象entry一覧。

## Returns

[`OrganizeBookmarkValue`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/organizebookmarkvalue/)

Bookmark整理成功値。

## Example

```ts
const result = createOrganizeBookmarkValue(executed, entries);
```
