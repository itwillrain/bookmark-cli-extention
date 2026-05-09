---
editUrl: false
next: false
prev: false
title: executeCommandLineEditingKeyboardAction
slug: 1.3.2/api/entrypoints/cli-page/command-line-editing-keyboard/functions/executecommandlineeditingkeyboardaction
---

> **executeCommandLineEditingKeyboardAction**(`action`, `element`, `setInputValue`): `boolean`

Defined in: [entrypoints/cli-page/command-line-editing-keyboard.ts:130](https://github.com/itwillrain/bookmark-cli-extention/blob/3762fcea2bb0c7afa531d8b0e939b361be0a717a/src/entrypoints/cli-page/command-line-editing-keyboard.ts#L130)

Command line編集keyboard actionを実行。

## Parameters

### action

[`BookmarkCliKeyboardAction`](/1.3.2/api/presentation/cli/bookmark-cli-keyboard/type-aliases/bookmarkclikeyboardaction/)

Keyboard action。

### element

[`CommandInputElement`](/1.3.2/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputelement/)

入力要素。

### setInputValue

`InputValueSetter`

入力値setter。

## Returns

`boolean`

処理済みならtrue。
