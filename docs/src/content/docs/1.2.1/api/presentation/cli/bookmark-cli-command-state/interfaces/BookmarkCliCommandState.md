---
editUrl: false
next: false
prev: false
title: BookmarkCliCommandState
slug: 1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L93)

Bookmark CLI画面に反映する状態です。

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:97](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L97)

現在ディレクトリです。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:101](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L101)

永続化対象の拡張状態。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.2.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:105](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L105)

直前結果一覧です。

***

### pendingConfirmation?

> `readonly` `optional` **pendingConfirmation?**: [`BookmarkCliRemovePendingConfirmation`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:109](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L109)

確認待ち操作です。

***

### resultItems

> `readonly` **resultItems**: readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:113](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L113)

Result listに表示するitem一覧です。

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:117](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L117)

Status lineに表示するtextです。
