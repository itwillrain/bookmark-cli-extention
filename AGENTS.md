# AGENTS.md

このリポジトリで作業するCodex向けの入口です。

## docsをSSOTにする

Bookmark CLI Extensionでは、`docs/src/content/docs/` を仕様と意思決定のSSOTとして扱います。

コードだけを変更して仕様差分を暗黙にしないでください。

作業前に [ドキュメント方針](docs/src/content/docs/guides/documentation-policy.md) と、変更対象に関係する仕様ページを読んでください。

仕様、振る舞い、UI、データ構造、権限、テスト方針に影響する変更は、同じ変更単位でdocsも更新してください。

docs更新が不要な場合は、作業報告でその理由を短く明示してください。

## 実装スタイル

- 基本的にJSDoc形式でコメントを記載する
- コードは宣言的に、関数型を意識して書く
- 純粋関数にロジックがある場合はテストを追加する
- テストケースは必要なものだけ残し、不要なものは削る
- TDDはKent Beckの進め方を意識する
- FrontendではEric EvansのDDD思想を落とし込み、Domain、Application、Infrastructure、Presentationの境界を保つ

## 実装時の流れ

1. 関連docsを読む
2. docsに仕様がない場合は、先にdocsへ仕様を追加する
3. 必要なテストを追加する
4. 実装する
5. docs、テスト、実装が同じ仕様を指しているか確認する

## 参照する主なdocs

- [仕様トップ](docs/src/content/docs/specs/index.md)
- [疑似CLI仕様](docs/src/content/docs/specs/cli.md)
- [UI実装方針](docs/src/content/docs/specs/ui-implementation.md)
- [アーキテクチャと責務境界](docs/src/content/docs/specs/architecture.md)
- [テスト方針](docs/src/content/docs/specs/testing-policy.md)
- [実装ロードマップ](docs/src/content/docs/specs/implementation-roadmap.md)
