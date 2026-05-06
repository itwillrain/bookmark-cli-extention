---
editUrl: false
next: false
prev: false
title: BookmarkCliRemovePendingConfirmation
slug: 1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:30](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L30)

Bookmark削除の確認待ち状態です。

## Properties

### entry

> `readonly` **entry**: [`BookmarkEntry`](/1.3.0/api/domain/bookmarks/bookmark-tree/interfaces/bookmarkentry/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:34](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L34)

確認対象Bookmarkです。

***

### kind

> `readonly` **kind**: `"rm"`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:38](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L38)

確認種別です。

***

### recursive

> `readonly` **recursive**: `boolean`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:42](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L42)

Folder subtreeを再帰削除する確認かです。
