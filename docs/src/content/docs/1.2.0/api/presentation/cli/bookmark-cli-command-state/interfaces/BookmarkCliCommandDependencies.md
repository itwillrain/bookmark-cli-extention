---
editUrl: false
next: false
prev: false
title: BookmarkCliCommandDependencies
slug: 1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L43)

Bookmark CLI command実行に必要な依存です。

## Properties

### creator

> `readonly` **creator**: [`BookmarkCreatorPort`](/1.2.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:75](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L75)

Bookmark作成port。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:47](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L47)

現在ディレクトリです。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.2.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:51](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L51)

永続化対象の拡張状態。

***

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:63](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L63)

Chrome履歴取得port。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.2.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:55](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L55)

直前結果一覧です。

***

### launchContext?

> `readonly` `optional` **launchContext?**: [`LaunchContext`](/1.2.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:67](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L67)

CLI起動元タブcontext。

***

### now?

> `readonly` `optional` **now?**: () => `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:71](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L71)

現在日時を返すport。

#### Returns

`string`

***

### opener

> `readonly` **opener**: [`BookmarkOpenerPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:87](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L87)

Bookmark URLを開くportです。

***

### organizer?

> `readonly` `optional` **organizer?**: [`BookmarkOrganizerPort`](/1.2.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:79](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L79)

Bookmark整理port。

***

### pendingConfirmation?

> `readonly` `optional` **pendingConfirmation?**: [`BookmarkCliRemovePendingConfirmation`](/1.2.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:59](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L59)

確認待ち操作です。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.2.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:83](https://github.com/itwillrain/bookmark-cli-extention/blob/0d414df9117fa466c941851ee64c2b9060cc0990/src/presentation/cli/bookmark-cli-command-state.ts#L83)

Bookmark Tree取得portです。
