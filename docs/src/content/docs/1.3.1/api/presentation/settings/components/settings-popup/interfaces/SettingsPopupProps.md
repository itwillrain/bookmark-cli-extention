---
editUrl: false
next: false
prev: false
title: SettingsPopupProps
slug: 1.3.1/api/presentation/settings/components/settings-popup/interfaces/settingspopupprops
---

Defined in: [presentation/settings/components/settings-popup.tsx:37](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L37)

Settings popup propsです。

## Properties

### aliasStatusText

> `readonly` **aliasStatusText**: `string`

Defined in: [presentation/settings/components/settings-popup.tsx:39](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L39)

Alias保存状態表示です。

***

### commandAliases

> `readonly` **commandAliases**: readonly [`CommandAlias`](/1.3.1/api/domain/cli/command-alias/interfaces/commandalias/)\[]

Defined in: [presentation/settings/components/settings-popup.tsx:41](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L41)

Command alias一覧です。

***

### onAddAlias

> `readonly` **onAddAlias**: () => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:43](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L43)

Alias追加callbackです。

#### Returns

`void`

***

### onChangeAliasCommand

> `readonly` **onChangeAliasCommand**: (`index`, `command`) => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:45](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L45)

Alias command変更callbackです。

#### Parameters

##### index

`number`

##### command

`string`

#### Returns

`void`

***

### onChangeAliasName

> `readonly` **onChangeAliasName**: (`index`, `name`) => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:47](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L47)

Alias name変更callbackです。

#### Parameters

##### index

`number`

##### name

`string`

#### Returns

`void`

***

### onOpenCliPage

> `readonly` **onOpenCliPage**: () => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:49](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L49)

CLI pageを開くcallbackです。

#### Returns

`void`

***

### onOpenShortcutSettings

> `readonly` **onOpenShortcutSettings**: () => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:51](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L51)

Shortcut設定画面を開くcallbackです。

#### Returns

`void`

***

### onRemoveAlias

> `readonly` **onRemoveAlias**: (`index`) => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:53](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L53)

Alias削除callbackです。

#### Parameters

##### index

`number`

#### Returns

`void`

***

### onSaveAliases

> `readonly` **onSaveAliases**: () => `void`

Defined in: [presentation/settings/components/settings-popup.tsx:55](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L55)

Alias保存callbackです。

#### Returns

`void`

***

### shortcutConfigured

> `readonly` **shortcutConfigured**: `boolean`

Defined in: [presentation/settings/components/settings-popup.tsx:57](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L57)

Shortcutが設定済みかです。

***

### shortcutLabel

> `readonly` **shortcutLabel**: `string`

Defined in: [presentation/settings/components/settings-popup.tsx:59](https://github.com/itwillrain/bookmark-cli-extention/blob/eb34478ce004473c3f1997c55497345bb9ddd1c9/src/presentation/settings/components/settings-popup.tsx#L59)

Shortcut表示文字列です。
