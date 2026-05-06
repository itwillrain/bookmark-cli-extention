---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItemsFromTreeEntries
slug: 1.2.1/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitemsfromtreeentries
---

> **createBookmarkCliResultItemsFromTreeEntries**(`treeEntries`): readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:178](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-view-model.ts#L178)

Bookmark tree view entry一覧をCLI表示item一覧へ変換します。

## Parameters

### treeEntries

readonly [`BookmarkTreeViewEntry`](/1.2.1/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Bookmark tree view entry一覧です。

## Returns

readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
