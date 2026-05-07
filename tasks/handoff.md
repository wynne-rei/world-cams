# UNCHAIN Camera Project — セッション引き継ぎメモ

最終更新：2026-05-07

## 次セッションの最初の一歩

> 「@tasks/handoff.md を読んで、ステップ②から再開して」

これだけ言えばOK。

---

## プロジェクト概要

世界中の「掲載OKなライブカメラ」を集約するキュレーションサイト。
UNCHAIN Inc. のAI実証実験プロジェクト。詳細仕様は `CLAUDE.md` 参照。

仮称：**UNCHAIN Camera Project**（正式名はリリース直前決定）

---

## 確定済みの設計判断

| 項目 | 決定 |
|---|---|
| フロント | Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 |
| ホスティング | Vercel |
| DB | Supabase（後フェーズで導入、MVPは `data/cameras.json`） |
| 地図ライブラリ | Leaflet |
| リポジトリ | `wynne-rei/world-cams`（main上書き済み） |
| 旧版退避先 | `legacy/world-watch-room` ブランチ |
| サイト名 | UNCHAIN Camera Project（仮） |

---

## 完了済み（ステップ①：初期セットアップ）

- 旧プロトタイプ（HTML/CSS/JS版・33カメラ）を `legacy/world-watch-room` に退避
- main を Next.js 16 + TS + Tailwind v4 で再初期化
- ESLint + Prettier + prettier-plugin-tailwindcss
- GitHub Actions CI（format check / lint / build）
- `CLAUDE.md`（プロジェクト概要・掲載基準・スキーマ・運用方針）作成済み
- `AGENTS.md`（Next.js 16 ブレーキングチェンジ注意書き）
- `npm run build` 通過確認済み
- 初期コミット push 済み（commit `c07b3f8`）

---

## 次にやること

### ステップ②：データ構造の TypeScript 型定義

- `src/types/camera.ts` に `Camera` 型定義
- スキーマは `CLAUDE.md` の表参照
- カテゴリ・licenseは const assertion または zod 推奨

### ステップ③：初期データ収集（最重要・一番重い）

- `data/cameras.json` に **最低30本**（日本20＋海外10）
- 全エントリ **実在URL確認必須**（Web検索で）
- カテゴリ：`weather / traffic / tourism / nature / animal / overseas`
- License：`public_official / youtube_live / twitch_live / tourism_official`
- **サブエージェント並列で大幅短縮可能**

候補ソース：
- **日本**：気象庁火山ライブ、国交省「川の防災情報」、NEXCO高速道路、自治体観光、動物園・水族館（YT公式）
- **海外**：NASA Live (ISS)、各国観光局、海外動物園公式

### ステップ④：UI実装

- トップ：Leaflet地図ビュー + グリッドビュー切替
- カテゴリフィルタ
- カメラ詳細ページ（埋込再生 or 公式リンク）
- レスポンシブ（スマホ優先）
- i18n下地（構造のみ、実装は後回し）

### ステップ⑤：Aboutページ

- プロジェクト趣旨
- 掲載基準（`CLAUDE.md` から転記）
- UNCHAIN Inc.リンク

---

## 厳守事項（再掲）

- ❌ 架空URL・存在しないカメラ登録 → 必ずWeb検索で実在確認
- ❌ Shodan系・無認証カメラ
- ❌ 個人宅・私有地カメラ
- ❌ スクレイピング・非公式埋込
- ⭕ 公式 / 公共 / YouTube・Twitch公式 のみ

---

## マネタイズ方針（後フェーズ用メモ）

優先順位：
1. **観光予約アフィリエイト**（楽天トラベル、Booking.com、HIS等）— 本命
2. Google AdSense（基礎収入）
3. 自治体・観光協会の有料枠（中長期の柱）
4. AI生成タイムラプス販売
5. B2B API販売

KPI（仕様書）：
- MVP工数 20h以内
- 6ヶ月後 AdSense月額 ¥5,000以上
- 12ヶ月後 月間PV 10,000以上

---

## リソース

- **リポジトリ**: https://github.com/wynne-rei/world-cams
- **本番ブランチ**: `main`（Next.js版）
- **旧版ブランチ**: `legacy/world-watch-room`（参考用、削除しない）
- **ローカル**: `/Users/rei/Desktop/クロードで色々作ってみる/world-cams/`
- **旧版URL**（参考）: https://wynne-rei.github.io/world-cams/

---

## 開発ルール

- 逐次コミット & push（仕様書要件）
- 不明点は随時レイに確認OK
- 実装前にTODO提示してレイチェック取る
