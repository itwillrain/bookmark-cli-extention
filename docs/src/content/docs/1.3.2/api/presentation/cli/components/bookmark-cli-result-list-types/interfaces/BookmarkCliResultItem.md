---
editUrl: false
next: false
prev: false
title: BookmarkCliResultItem
slug: 1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem
---

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:11](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L11)

CLI resultとして表示するitemです。

## Properties

### depth?

> `readonly` `optional` **depth?**: `number`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L13)

Tree表示時の階層です。

***

### description?

> `readonly` `optional` **description?**: `string`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L23)

補足説明です。

***

### details?

> `readonly` `optional` **details?**: readonly `string`\[]

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:25](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L25)

詳細表示token一覧です。

***

### folderPath

> `readonly` **folderPath**: `string`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:21](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L21)

Folder pathです。

***

### kind

> `readonly` **kind**: [`BookmarkCliResultKind`](/1.3.2/api/presentation/cli/components/bookmark-cli-result-list-types/type-aliases/bookmarkcliresultkind/)

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L17)

Bookmarkまたはfolderを表す種別です。

***

### score?

> `readonly` `optional` **score?**: `number`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:29](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L29)

検索scoreです。

***

### title

> `readonly` **title**: `string`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:19](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L19)

表示名です。

***

### treePrefix?

> `readonly` `optional` **treePrefix?**: `string`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L15)

Tree表示時にtitle前へ出すguideです。

***

### url?

> `readonly` `optional` **url?**: `string`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:27](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L27)

Bookmark URLです。
