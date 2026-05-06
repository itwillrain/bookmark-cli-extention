---
editUrl: false
next: false
prev: false
title: executeCommandLineEditingKeyboardAction
slug: 1.3.1/api/entrypoints/cli-page/command-line-editing-keyboard/functions/executecommandlineeditingkeyboardaction
---

> **executeCommandLineEditingKeyboardAction**(`action`, `element`, `setInputValue`): `boolean`

Defined in: [entrypoints/cli-page/command-line-editing-keyboard.ts:130](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/entrypoints/cli-page/command-line-editing-keyboard.ts#L130)

Command line編集keyboard actionを実行。

## Parameters

### action

[`BookmarkCliKeyboardAction`](/1.3.1/api/presentation/cli/bookmark-cli-keyboard/type-aliases/bookmarkclikeyboardaction/)

Keyboard action。

### element

[`CommandInputElement`](/1.3.1/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputelement/)

入力要素。

### setInputValue

`InputValueSetter`

入力値setter。

## Returns

`boolean`

処理済みならtrue。
