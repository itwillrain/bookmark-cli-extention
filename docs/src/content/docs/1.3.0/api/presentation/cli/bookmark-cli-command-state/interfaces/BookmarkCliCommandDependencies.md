---
editUrl: false
next: false
prev: false
title: BookmarkCliCommandDependencies
slug: 1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommanddependencies
---

Defined in: [presentation/cli/bookmark-cli-command-state.ts:53](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L53)

Bookmark CLI command実行に必要な依存です。

## Properties

### clipboard?

> `readonly` `optional` **clipboard?**: [`ClipboardWriterPort`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/clipboardwriterport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:85](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L85)

Clipboard書き込みportです。

***

### creator

> `readonly` **creator**: [`BookmarkCreatorPort`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/bookmarkcreatorport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:89](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L89)

Bookmark作成port。

***

### currentDirectory

> `readonly` **currentDirectory**: `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:57](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L57)

現在ディレクトリです。

***

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:61](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L61)

永続化対象の拡張状態。

***

### historyRepository?

> `readonly` `optional` **historyRepository?**: [`BrowserHistoryRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/browserhistoryrepositoryport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:73](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L73)

Chrome履歴取得port。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [presentation/cli/bookmark-cli-command-state.ts:65](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L65)

直前結果一覧です。

***

### launchContext?

> `readonly` `optional` **launchContext?**: [`LaunchContext`](/1.3.0/api/application/bookmarks/mark-bookmark-use-case/interfaces/launchcontext/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:77](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L77)

CLI起動元タブcontext。

***

### now?

> `readonly` `optional` **now?**: () => `string`

Defined in: [presentation/cli/bookmark-cli-command-state.ts:81](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L81)

現在日時を返すport。

#### Returns

`string`

***

### opener

> `readonly` **opener**: [`BookmarkOpenerPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkopenerport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:101](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L101)

Bookmark URLを開くportです。

***

### organizer?

> `readonly` `optional` **organizer?**: [`BookmarkOrganizerPort`](/1.3.0/api/application/bookmarks/bookmark-organization-use-case-types/interfaces/bookmarkorganizerport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:93](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L93)

Bookmark整理port。

***

### pendingConfirmation?

> `readonly` `optional` **pendingConfirmation?**: [`BookmarkCliRemovePendingConfirmation`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkcliremovependingconfirmation/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:69](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L69)

確認待ち操作です。

***

### repository

> `readonly` **repository**: [`BookmarkRepositoryPort`](/1.3.0/api/application/bookmarks/bookmark-use-cases/interfaces/bookmarkrepositoryport/)

Defined in: [presentation/cli/bookmark-cli-command-state.ts:97](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/presentation/cli/bookmark-cli-command-state.ts#L97)

Bookmark Tree取得portです。
