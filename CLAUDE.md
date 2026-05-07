@AGENTS.md

# UNCHAIN Camera Project（仮称）

世界中の「掲載OKなライブカメラ」を集約するキュレーションサイト。
UNCHAIN Inc.のAI実証実験プロジェクトとして、Claude Codeのみで開発・運用する。

## 検証KPI

- MVP工数：20時間以内
- 月間運用工数：5時間以内
- 6ヶ月後 AdSense月額：5,000円以上
- 12ヶ月後 月間PV：10,000以上

## 掲載基準（厳守）

掲載するライブカメラは以下のいずれかを満たすもののみ：

1. 設置者が公衆向け公開を明示している（公式ライブカメラページに掲載されている）
2. YouTube Live / Twitch等のプラットフォーム経由で公式に配信されている
3. 政府機関・自治体・公共団体が公開しているもの

## 禁止事項（絶対NG）

- Shodan等を使った無認証カメラの収集
- 設置者の意図が不明なカメラの掲載
- 個人宅・私有地のカメラ
- スクレイピングで埋め込みコードを取得した非公式埋め込み
- 架空のURLや存在しないカメラの登録（必ずWeb検索で実在確認すること）

## 技術スタック

- フロント：Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- DB：Supabase (Postgres) — MVP後フェーズで導入
- 地図：Leaflet
- ホスティング：Vercel
- データ更新：GitHub Actions で定期実行
- 開発：Claude Code

## サイト構造（MVP）

- トップページ：地図ビュー（Leaflet）+ グリッドビュー切替
- カテゴリ：weather / traffic / tourism / nature / animal / overseas
- カメラ詳細ページ：埋込再生 or 公式サイトリンク
- Aboutページ：プロジェクト趣旨 + 掲載基準
- レスポンシブ：スマホ優先

## データ構造

一次ソースは `data/cameras.json`。スキーマ：

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | string | 一意ID（kebab-case、例: `jma-sakurajima`） |
| `name` | string | 日本語名 |
| `name_en` | string | 英語名 |
| `category` | enum | `weather` / `traffic` / `tourism` / `nature` / `animal` / `overseas` |
| `country` | string | ISO 3166-1 alpha-2（例: `JP`） |
| `region` | string | 都道府県名 or 地方名 |
| `lat` | number | 緯度 |
| `lng` | number | 経度 |
| `embedType` | enum | `youtube` / `iframe` / `link` |
| `embedUrl` | string | YouTube videoId or iframe URL |
| `sourceUrl` | string | 実在URL必須・配信元への直リンク |
| `sourceLabel` | string | 運営者名（例: 気象庁、ANN） |
| `license` | enum | `public_official` / `youtube_live` / `twitch_live` / `tourism_official` |
| `addedAt` | string | 追加日（ISO 8601 date） |

## コーディング規約

- コンポーネントは関数型、Server Componentsを優先
- 画像最適化は Next.js Image を使用
- i18n：日本語ベース、英語化は構造のみ用意（実装は後フェーズ）
- ESLint + Prettier 必須
- Server Actions / Route Handlers は `app/` 内に配置

## 運用方針

- カメラリストの追加・更新は PR 経由（人手レビュー必須）
- 死活監視：週1で全カメラURLの生存確認を GitHub Actions で実行
- 死亡カメラは自動でフラグ立てて非表示化

## ブランディング

- 仮称：UNCHAIN Camera Project
- 正式名はリリース直前に決定（保留中）
- UNCHAIN Inc.のサブブランド扱い

## 関連リソース

- リポジトリ: https://github.com/wynne-rei/world-cams
- 旧プロトタイプ（参考）: `legacy/world-watch-room` ブランチ
