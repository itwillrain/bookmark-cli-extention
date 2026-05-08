---
editUrl: false
next: false
prev: false
title: findBookmarkCliHelpTopic
slug: 1.3.2/api/application/commands/bookmark-help/functions/findbookmarkclihelptopic
---

> **findBookmarkCliHelpTopic**(`topicInput`): `false` | [`BookmarkCliHelpTopic`](/1.3.2/api/application/commands/bookmark-help/interfaces/bookmarkclihelptopic/)

Defined in: [application/commands/bookmark-help.ts:218](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/application/commands/bookmark-help.ts#L218)

Command名に対応するhelp topicを探す。

## Parameters

### topicInput

`string`

Help topic入力。

## Returns

`false` | [`BookmarkCliHelpTopic`](/1.3.2/api/application/commands/bookmark-help/interfaces/bookmarkclihelptopic/)

Help topic。未検出ならfalse。

## Example

```ts
const result = findBookmarkCliHelpTopic(topicInput);
```
