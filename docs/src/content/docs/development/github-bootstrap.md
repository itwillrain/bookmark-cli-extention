---
title: GitHub初期設定
description: 新しいリポジトリを作成した直後にGitHub側設定を揃えるbootstrap手順です。
---

# GitHub初期設定

このページでは、新しいリポジトリを作成した直後に実行するGitHub側設定のbootstrap手順を定義します。

GitHub側の設定には、gitで管理できるものと、GitHub APIで反映するものがあります。

## gitで管理するもの

次のファイルはrepository templateに含めます。

- `.github/dependabot.yml`
- `.github/workflows/*`
- `.github/ISSUE_TEMPLATE/*`
- `SECURITY.md`
- `LICENSE`
- `README.md`
- docs配下の運用ページ

## GitHub APIで設定するもの

次の設定は `gh` コマンドで反映します。

- Dependabot alerts
- Dependabot security updates
- Secret scanning
- Secret scanning push protection
- merge設定
- 標準label
- `main` branch ruleset

## 実行方法

対象repositoryを指定して実行します。

```sh
pnpm github:bootstrap itwillrain/bookmark-cli-extention
```

実際に変更せずに確認する場合は `--dry-run` を使います。

```sh
pnpm github:bootstrap --dry-run itwillrain/bookmark-cli-extention
```

## 管理ファイル

標準labelは `scripts/github/labels.tsv` で管理します。

`main` branch rulesetは `scripts/github/rulesets/protect-main.json` で管理します。

別projectでrequired status check名が違う場合は、ruleset JSONの `required_status_checks` を調整してから実行します。

## bootstrap後の確認

Dependabot alertsが有効か確認します。

```sh
gh api -i repos/itwillrain/bookmark-cli-extention/vulnerability-alerts
```

`204 No Content` が返れば有効です。

Security設定を確認します。

```sh
gh api repos/itwillrain/bookmark-cli-extention --jq '.security_and_analysis'
```

Rulesetを確認します。

```sh
gh api repos/itwillrain/bookmark-cli-extention/rulesets --jq '.[] | {id, name, target, enforcement}'
```

## 運用方針

新しいrepositoryを作る場合は、repository templateから作成したあと、最初のPRを作る前にbootstrapを実行します。

bootstrap scriptはidempotentに実行できる前提で管理します。

設定値を変える場合は、GitHub UIだけで変更せず、script、ruleset JSON、docsを同じPRで更新します。

## 参考

- [Repositories REST API](https://docs.github.com/en/rest/repos/repos)
- [Enable vulnerability alerts](https://docs.github.com/en/rest/repos/repos#enable-vulnerability-alerts)
- [Repository rules REST API](https://docs.github.com/en/rest/repos/rules)
- [Managing labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
