---
editUrl: false
next: false
prev: false
title: executeCommandLineEditingKeyboardAction
slug: 1.3.0/api/entrypoints/cli-page/command-line-editing-keyboard/functions/executecommandlineeditingkeyboardaction
---

> **executeCommandLineEditingKeyboardAction**(`action`, `element`, `setInputValue`): `boolean`

Defined in: [entrypoints/cli-page/command-line-editing-keyboard.ts:130](https://github.com/itwillrain/bookmark-cli-extention/blob/e75af1576b65f6fe9199cf19b21a180e7f60454e/src/entrypoints/cli-page/command-line-editing-keyboard.ts#L130)

Command line編集keyboard actionを実行。

## Parameters

### action

[`BookmarkCliKeyboardAction`](/1.3.0/api/presentation/cli/bookmark-cli-keyboard/type-aliases/bookmarkclikeyboardaction/)

Keyboard action。

### element

[`CommandInputElement`](/1.3.0/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputelement/)

入力要素。

### setInputValue

`InputValueSetter`

入力値setter。

## Returns

`boolean`

処理済みならtrue。
