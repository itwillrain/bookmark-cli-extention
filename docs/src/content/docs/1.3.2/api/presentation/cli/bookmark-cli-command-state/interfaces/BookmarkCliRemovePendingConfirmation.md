---
editUrl: false
next: false
prev: false
title: BookmarkCliRemovePendingConfirmation
slug: 1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L30)

Bookmark削除の確認待ち状態です。

## Properties

### entry

> `readonly` **entry**: [`BookmarkEntry`](/1.3.2/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L34)

確認対象Bookmarkです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L38)

確認種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L42)

Folder subtreeを再帰削除する確認かです。
