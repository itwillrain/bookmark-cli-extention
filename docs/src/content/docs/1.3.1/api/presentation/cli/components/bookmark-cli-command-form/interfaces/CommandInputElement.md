---
editUrl: false
next: false
prev: false
title: CommandInputElement
slug: 1.3.1/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputelement
---

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:59](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-command-form.tsx#L59)

入力欄DOM elementとして使う最小shapeです。

## Properties

### selectionEnd

> `readonly` **selectionEnd**: `number` | `null`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:63](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-command-form.tsx#L63)

選択範囲の終端indexです。

***

### selectionStart

> `readonly` **selectionStart**: `number` | `null`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:67](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-command-form.tsx#L67)

選択範囲の開始indexです。

***

### setSelectionRange

> `readonly` **setSelectionRange**: (`selectionStart`, `selectionEnd`) => `void`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:71](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-command-form.tsx#L71)

選択範囲を更新します。

#### Parameters

##### selectionStart

`number`

##### selectionEnd

`number`

#### Returns

`void`

***

### value

> `readonly` **value**: `string`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:75](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/cli/components/bookmark-cli-command-form.tsx#L75)

入力値です。
