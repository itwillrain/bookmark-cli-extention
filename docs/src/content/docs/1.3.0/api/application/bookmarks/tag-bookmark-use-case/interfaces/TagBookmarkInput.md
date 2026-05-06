---
editUrl: false
next: false
prev: false
title: TagBookmarkInput
slug: 1.3.0/api/application/bookmarks/tag-bookmark-use-case/interfaces/tagbookmarkinput
---

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:18](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L18)

仮想タグ更新入力。

## Properties

### extensionState

> `readonly` **extensionState**: [`ExtensionState`](/1.3.0/api/domain/storage/extension-state/interfaces/extensionstate/)

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:20](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L20)

現在の拡張状態。

***

### lastResultEntries

> `readonly` **lastResultEntries**: readonly [`BookmarkCliEntry`](/1.3.0/api/domain/cli/bookmark-cli-entry/type-aliases/bookmarkclientry/)\[]

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:22](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L22)

直前結果一覧。

***

### remove

> `readonly` **remove**: `boolean`

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:24](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L24)

削除操作ならtrue。

***

### tagInputs

> `readonly` **tagInputs**: readonly `string`\[]

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:26](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L26)

仮想タグ入力一覧。

***

### targetInput

> `readonly` **targetInput**: `string`

Defined in: [application/bookmarks/tag-bookmark-use-case.ts:28](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/bookmarks/tag-bookmark-use-case.ts#L28)

直前結果番号入力。
