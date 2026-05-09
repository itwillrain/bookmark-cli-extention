---
editUrl: false
next: false
prev: false
title: BookmarkCliCommandStateInput
slug: 1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstateinput
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:137](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L137)

Bookmark CLI command state作成入力です。

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:141](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L141)

現在ディレクトリです。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.3.2/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:145](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L145)

永続化対象の拡張状態。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.2/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:149](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L149)

直前結果一覧です。

***

### pendingConfirmation?

> `readonly` `optional` **pendingConfirmation?**: [`BookmarkCliRemovePendingConfirmation`](/1.3.2/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:153](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L153)

確認待ち操作です。

***

### resultItems

> `readonly` **resultItems**: readonly [`BookmarkCliResultItem`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:157](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L157)

Result listに表示するitem一覧です。

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:161](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/bookmark-cli-command-state.ts#L161)

Status lineに表示するtextです。
