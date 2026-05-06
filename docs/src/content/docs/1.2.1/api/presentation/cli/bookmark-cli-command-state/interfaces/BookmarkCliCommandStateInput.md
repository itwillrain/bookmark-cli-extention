---
editUrl: false
next: false
prev: false
title: BookmarkCliCommandStateInput
slug: 1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstateinput
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:123](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L123)

Bookmark CLI command state作成入力です。

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:127](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L127)

現在ディレクトリです。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.2.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:131](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L131)

永続化対象の拡張状態。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.2.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:135](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L135)

直前結果一覧です。

***

### pendingConfirmation?

> `readonly` `optional` **pendingConfirmation?**: [`BookmarkCliRemovePendingConfirmation`](/1.2.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:139](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L139)

確認待ち操作です。

***

### resultItems

> `readonly` **resultItems**: readonly [`BookmarkCliResultItem`](/1.2.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:143](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L143)

Result listに表示するitem一覧です。

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:147](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/bookmark-cli-command-state.ts#L147)

Status lineに表示するtextです。
