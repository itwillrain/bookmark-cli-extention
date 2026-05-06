---
editUrl: false
next: false
prev: false
title: UseBookmarkCliTranscriptValue
slug: 1.3.1/api/entrypoints/cli-page/use-bookmark-cli-transcript/interfaces/usebookmarkclitranscriptvalue
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L13)

Bookmark CLI transcript hook戻り値。

## Properties

### appendExecutedCommand

> `readonly` **appendExecutedCommand**: (`inputValue`, `commandState`, `entryId`) => `void`

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L17)

実行済みcommandをtranscriptへ追加。

#### Parameters

##### inputValue

`string`

##### commandState

[`BookmarkCliCommandState`](/1.3.1/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

##### entryId

`string`

#### Returns

`void`

***

### clearExecutedCommands

> `readonly` **clearExecutedCommands**: () => `void`

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L23)

実行済みcommand transcriptを削除。

#### Returns

`void`

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.3.1/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L15)

実行済みcommand transcript。
