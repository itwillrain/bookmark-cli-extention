---
title: 概要
description: Bookmark CLI Extension の目的と初期スコープです。
---

# 概要

Bookmark CLI Extension は、ブラウザの Bookmark を CLI から管理するためのブラウザ拡張です。

## 目的

- Bookmark を検索、追加、更新、削除しやすくする
- Bookmark の構造を CLI で扱える形式に近づける
- 将来的な同期、エクスポート、インポートの土台を作る

## 初期スコープ

- ブラウザ拡張として Bookmark API へアクセスする
- CLI から扱うための操作単位を整理する
- ドメインモデルとユースケースをドキュメント化する

## 設計メモ

Bookmark は単なる URL 一覧ではなく、日々の調査や作業文脈を保持する知識資産として扱います。
実装では、Bookmark の取得や変換などの純粋関数を分離し、テストしやすい形に保ちます。
