---
editUrl: false
next: false
prev: false
title: BookmarkCliRemovePendingConfirmation
slug: 1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L20)

Bookmark削除の確認待ち状態です。

## Properties

### entry

> `readonly` **entry**: [`BookmarkEntry`](/1.2.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L24)

確認対象Bookmarkです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:28](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L28)

確認種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:32](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L32)

Folder subtreeを再帰削除する確認かです。
