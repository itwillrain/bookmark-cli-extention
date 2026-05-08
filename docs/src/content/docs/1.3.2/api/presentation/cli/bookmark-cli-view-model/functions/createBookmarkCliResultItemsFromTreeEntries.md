---
editUrl: false
next: false
prev: false
title: createBookmarkCliResultItemsFromTreeEntries
slug: 1.3.2/api/presentation/cli/bookmark-cli-view-model/functions/createbookmarkcliresultitemsfromtreeentries
---

> **createBookmarkCliResultItemsFromTreeEntries**(`treeEntries`): readonly [`BookmarkCliResultItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-view-model.ts:178](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-view-model.ts#L178)

Bookmark tree view entry一覧をCLI表示item一覧へ変換します。

## Parameters

### treeEntries

readonly [`BookmarkTreeViewEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree-view/interfaces/bookmarktreeviewentry/)\[]

Bookmark tree view entry一覧です。

## Returns

readonly [`BookmarkCliResultItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

CLI表示item一覧です。
