---
editUrl: false
next: false
prev: false
title: findBookmarkCliHelpTopic
slug: 1.3.0/api/application/commands/bookmark-help/functions/findbookmarkclihelptopic
---

> **findBookmarkCliHelpTopic**(`topicInput`): `false` | [`BookmarkCliHelpTopic`](/1.3.0/api/application/commands/bookmark-help/interfaces/bookmarkclihelptopic/)

Defined in: [application/commands/bookmark-help.ts:213](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/application/commands/bookmark-help.ts#L213)

Command名に対応するhelp topicを探す。

## Parameters

### topicInput

`string`

Help topic入力。

## Returns

`false` | [`BookmarkCliHelpTopic`](/1.3.0/api/application/commands/bookmark-help/interfaces/bookmarkclihelptopic/)

Help topic。未検出ならfalse。

## Example

```ts
const result = findBookmarkCliHelpTopic(topicInput);
```
