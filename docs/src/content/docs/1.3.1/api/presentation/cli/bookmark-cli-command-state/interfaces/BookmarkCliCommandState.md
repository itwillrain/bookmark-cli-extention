---
editUrl: false
next: false
prev: false
title: BookmarkCliCommandState
slug: 1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:107](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L107)

Bookmark CLI画面に反映する状態です。

## Properties

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:111](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L111)

現在ディレクトリです。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.3.1/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:115](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L115)

永続化対象の拡張状態。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.1/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:119](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L119)

直前結果一覧です。

***

### pendingConfirmation?

> `readonly` `optional` **pendingConfirmation?**: [`BookmarkCliRemovePendingConfirmation`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:123](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L123)

確認待ち操作です。

***

### resultItems

> `readonly` **resultItems**: readonly [`BookmarkCliResultItem`](/1.3.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:127](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L127)

Result listに表示するitem一覧です。

***

### statusText

> `readonly` **statusText**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:131](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/bookmark-cli-command-state.ts#L131)

Status lineに表示するtextです。
