---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItemsFromTreeEntries
slug: 1.3.1/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitemsfromtreeentries
---

> **createBookmarkCliResultItemsFromTreeEntries**(`treeEntries`): readonly [`BookmarkCliResultItem`](/1.3.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:178](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-view-model.ts#L178)

Bookmark tree view entry一覧をCLI表示item一覧へ変換します。

## Parameters

### treeEntries

readonly [`BookmarkTreeViewEntry`](/1.3.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Bookmark tree view entry一覧です。

## Returns

readonly [`BookmarkCliResultItem`](/1.3.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
