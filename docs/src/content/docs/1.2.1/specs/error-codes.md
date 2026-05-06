---
title: エラーコード一覧
description: Bookmark CLI Extension v1 の CommandResult で扱うエラーコードと表示方針です。
slug: 1.2.1/specs/error-codes
---

# エラーコード一覧

このページでは、疑似CLIが返すエラーコードを定義します。

Application層はDomain errorとInfrastructure errorを、ここで定義するエラーコードへ変換します。

Presentation層はエラーコードの意味を再解釈せず、CommandResultを表示へ変換します。

## 基本方針

エラーコードは安定したmachine-readableな値として扱います。

表示文言はユーザー向けに変更できます。

JSON出力では `ok: false` と `error.code` を返します。

`error.message` は表示用の短い説明です。

`error.details` はdebug用の補足情報です。

```json
{
  "ok": false,
  "command": "cd 99",
  "error": {
    "code": "not_found",
    "message": "対象が見つかりません。",
    "details": {
      "input": "99"
    }
  }
}
```

## 一覧

| code                      | 意味                                      | 主なコマンド                                    |
| ------------------------- | ----------------------------------------- | ----------------------------------------------- |
| `not_found`               | 指定した対象が見つからない                | `go`, `find`, `cd`, `mv`, `rm`, `rename`, `tag` |
| `folder_not_found`        | 指定したfolder pathが見つからない         | `ls`, `cd`, `tree`, `mark`, `mkdir`, `mv`       |
| `already_marked`          | 保存先に同じURLのBookmarkが存在する       | `mark`                                          |
| `already_exists`          | 同じ親folderに同名のfolderが存在する      | `mkdir`                                         |
| `unsupported_tab`         | CLI起動元タブをBookmarkとして保存できない | `mark`, `tag current`                           |
| `invalid_argument`        | 引数の形や組み合わせが不正                | 全コマンド                                      |
| `permission_denied`       | Chrome APIの権限が不足している            | 書き込み系                                      |
| `chrome_bookmarks_failed` | Chrome Bookmarks APIの呼び出しに失敗した  | Bookmark操作全般                                |
| `storage_failed`          | `chrome.storage` の読み書きに失敗した     | 状態保存、仮想タグ、利用統計                    |

## `not_found`

指定した対象が見つからない場合に返します。

番号指定が直前の結果一覧に存在しない場合も、このコードを返します。

番号がfolderを期待する場面でBookmarkを指している場合も、このコードを返します。

代表例は次のとおりです。

```bash
go unknown-keyword
cd 99
rm -f 99
```

## `folder_not_found`

指定したfolder pathが見つからない場合に返します。

path入力を受け取るコマンドで使います。

代表例は次のとおりです。

```bash
cd Work/Missing
ls Work/Missing
mark --to Work/Missing
```

## `already_marked`

保存先folderに同じURLのBookmarkが存在する場合に返します。

`mark --allow-duplicate` が指定された場合は、このエラーを返さず保存します。

別folderに同じURLが存在する場合は候補一覧を表示し、保存を止めます。

この場合は、保存先での重複ではないため `already_marked` にはしません。

## `already_exists`

同じ親folderに同名のfolderが存在する場合に返します。

v1では `mkdir` で使います。

```bash
mkdir Tools
mkdir Admin --to Work
```

## `unsupported_tab`

CLI起動元タブのURLまたはtitleを取得できない場合に返します。

Chrome内部ページ、拡張機能ページ、権限不足のtabなどが対象です。

`mark` と `tag current` で使います。

```bash
mark
tag current urgent
```

## `invalid_argument`

引数の形や組み合わせが不正な場合に返します。

例は、必須引数の不足、不正な数値、同時に指定できないoptionの組み合わせです。

```bash
tree --depth abc
tag 3 --remove
rename 3
```

`invalid_argument` はparse済みのCommand ASTをuse caseへ渡す前に検出できる場合もあります。

その場合も、Presentation層では同じCommandResultとして表示します。

## `permission_denied`

Chrome APIの権限が不足している場合に返します。

manifestの権限不足、runtime permissionの拒否、Chrome側の制約が該当します。

`Other Bookmarks` などのbrowser管理folderを削除しようとした場合も、このコードを返します。

v1では `bookmarks`、`storage`、`activeTab` を必須権限とします。

## `chrome_bookmarks_failed`

Chrome Bookmarks APIの呼び出しが失敗した場合に返します。

Bookmark Tree取得、Bookmark追加、移動、更新、削除の失敗が対象です。

Infrastructure層でChrome API由来の例外や `runtime.lastError` を変換します。

## `storage_failed`

`chrome.storage` の読み書きが失敗した場合に返します。

保存データの読み込み、保存、migration、掃除処理が対象です。

保存に失敗した場合でも、Chrome Bookmark Manager側の書き込みと整合性が崩れないようにします。

## 表示方針

人間向け表示では、エラーコードと短い説明を表示します。

```text
error: folder_not_found
message: folder path was not found: Work/Missing
```

JSON出力では、`error.code` を安定した値として返します。

`error.details` は実装都合で追加できます。

ただし、`error.details` のshapeを外部仕様として固定しません。

## テスト方針

Domain層の純粋関数が返すエラーにはテストを書きます。

対象はpath解決、番号解決、tag正規化、結果選択です。

Application層はPortの失敗をエラーコードへ変換するテストを書きます。

Presentation層はエラー表示のview model変換をテストします。
