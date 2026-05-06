---
editUrl: false
next: false
prev: false
title: findBookmarkCliHelpTopic
slug: 1.2.1/api/application/commands/bookmark-help/functions/findbookmarkclihelptopic
---

> **findBookmarkCliHelpTopic**(`topicInput`): `false` | [`BookmarkCliHelpTopic`](/1.2.1/api/application/commands/bookmark-help/interfaces/bookmarkclihelptopic/)

Defined in: [application/commands/bookmark-help.ts:195](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/application/commands/bookmark-help.ts#L195)

Command名に対応するhelp topicを探す。

## Parameters

### topicInput

`string`

Help topic入力。

## Returns

`false` | [`BookmarkCliHelpTopic`](/1.2.1/api/application/commands/bookmark-help/interfaces/bookmarkclihelptopic/)

Help topic。未検出ならfalse。

## Example

```ts
const result = findBookmarkCliHelpTopic(topicInput);
```
