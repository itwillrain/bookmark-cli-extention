---
editUrl: false
next: false
prev: false
title: CommandInputKeyEvent
slug: 1.2.1/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputkeyevent
---

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:33](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-command-form.tsx#L33)

入力欄key eventとして扱う最小shapeです。

## Properties

### ctrlKey

> `readonly` **ctrlKey**: `boolean`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:37](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-command-form.tsx#L37)

Control keyが押されているかです。

***

### currentTarget

> `readonly` **currentTarget**: [`CommandInputElement`](/1.2.1/api/presentation/cli/components/bookmark-cli-command-form/interfaces/commandinputelement/)

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:41](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-command-form.tsx#L41)

入力要素です。

***

### key

> `readonly` **key**: `string`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:45](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-command-form.tsx#L45)

押されたkey名です。

***

### preventDefault

> `readonly` **preventDefault**: () => `void`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:53](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-command-form.tsx#L53)

Browser標準のkey動作を止めます。

#### Returns

`void`

***

### shiftKey

> `readonly` **shiftKey**: `boolean`

Defined in: [presentation/cli/components/bookmark-cli-command-form.tsx:49](https://github.com/itwillrain/bookmark-cli-extention/blob/6a001c3826028a1ea81f27832d68bd7ad34ed817/src/presentation/cli/components/bookmark-cli-command-form.tsx#L49)

Shift keyが押されているかです。
