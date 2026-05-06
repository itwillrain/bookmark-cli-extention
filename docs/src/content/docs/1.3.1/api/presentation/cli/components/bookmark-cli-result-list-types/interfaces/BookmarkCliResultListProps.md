---
editUrl: false
next: false
prev: false
title: BookmarkCliResultListProps
slug: 1.3.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultlistprops
---

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:35](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L35)

Bookmark CLI result listのpropsです。

## Properties

### preferNerdFont

> `readonly` **preferNerdFont**: `boolean`

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:39](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L39)

Nerd Font iconを優先するかです。v1の結果一覧はtofu防止のためASCII labelを使います。

***

### resultItems

> `readonly` **resultItems**: readonly [`BookmarkCliResultItem`](/1.3.1/api/presentation/cli/components/bookmark-cli-result-list-types/interfaces/bookmarkcliresultitem/)\[]

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:41](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L41)

CLI result一覧です。

***

### selectedResultIndex

> `readonly` **selectedResultIndex**: [`ResultCursorIndex`](/1.3.1/api/domain/bookmarks/result-cursor/type-aliases/resultcursorindex/)

Defined in: [presentation/cli/components/bookmark-cli-result-list-types.ts:43](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-result-list-types.ts#L43)

選択中result indexです。
