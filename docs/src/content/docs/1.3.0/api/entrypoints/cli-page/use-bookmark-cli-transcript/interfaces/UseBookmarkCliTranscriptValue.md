---
editUrl: false
next: false
prev: false
title: UseBookmarkCliTranscriptValue
slug: 1.3.0/api/entrypoints/cli-page/use-bookmark-cli-transcript/interfaces/usebookmarkclitranscriptvalue
---

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:13](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L13)

Bookmark CLI transcript hook戻り値。

## Properties

### appendExecutedCommand

> `readonly` **appendExecutedCommand**: (`inputValue`, `commandState`, `entryId`) => `void`

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:17](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L17)

実行済みcommandをtranscriptへ追加。

#### Parameters

##### inputValue

`string`

##### commandState

[`BookmarkCliCommandState`](/1.3.0/api/presentation/cli/bookmark-cli-command-state/interfaces/bookmarkclicommandstate/)

##### entryId

`string`

#### Returns

`void`

***

### clearExecutedCommands

> `readonly` **clearExecutedCommands**: () => `void`

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:23](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L23)

実行済みcommand transcriptを削除。

#### Returns

`void`

***

### transcriptEntries

> `readonly` **transcriptEntries**: readonly [`BookmarkCliTranscriptEntry`](/1.3.0/api/presentation/cli/bookmark-cli-transcript/interfaces/bookmarkclitranscriptentry/)\[]

Defined in: [entrypoints/cli-page/use-bookmark-cli-transcript.ts:15](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/use-bookmark-cli-transcript.ts#L15)

実行済みcommand transcript。
