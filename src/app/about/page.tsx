import Link from 'next/link';
import type { Metadata } from 'next';
import { ui } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'このサイトについて | UNCHAIN Camera Project',
  description:
    '世界中の掲載OKなライブカメラを集約するキュレーションサイト。掲載基準と禁止事項、運営方針について。',
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-xs font-medium text-white/60 hover:text-white"
          >
            ← {ui.ja.backToList}
          </Link>
          <span className="text-xs text-white/40">{ui.ja.siteName}</span>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">
            このサイトについて
          </h1>
          <p className="text-sm leading-relaxed text-white/75">
            UNCHAIN Camera Project は、世界中の{' '}
            <strong className="text-white">掲載OKなライブカメラ</strong>{' '}
            だけを集めたキュレーションサイトです。気象・防災から動物園・観光ランドマーク・海外の絶景まで、いつでもひと目で巡れる「世界の窓」を目指しています。
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            UNCHAIN Inc. の AI 実証実験プロジェクトとして、データ収集・実装・運用のすべてを Claude Code を中心に進めています。
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">掲載基準（厳守）</h2>
          <p className="text-sm text-white/70">
            掲載するライブカメラは、以下のいずれかを満たすものに限定しています。
          </p>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              ① 設置者が公衆向け公開を明示している（公式ライブカメラページに掲載）
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              ② YouTube Live / Twitch などプラットフォーム経由で公式に配信されている
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              ③ 政府機関・自治体・公共団体が公開している
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">禁止事項（絶対NG）</h2>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li className="rounded-lg border border-rose-400/20 bg-rose-500/5 px-4 py-3">
              Shodan 等を使った無認証カメラの収集
            </li>
            <li className="rounded-lg border border-rose-400/20 bg-rose-500/5 px-4 py-3">
              設置者の意図が不明なカメラの掲載
            </li>
            <li className="rounded-lg border border-rose-400/20 bg-rose-500/5 px-4 py-3">
              個人宅・私有地のカメラ
            </li>
            <li className="rounded-lg border border-rose-400/20 bg-rose-500/5 px-4 py-3">
              スクレイピングで埋め込みコードを取得した非公式埋め込み
            </li>
            <li className="rounded-lg border border-rose-400/20 bg-rose-500/5 px-4 py-3">
              架空のURLや存在しないカメラの登録
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">運用方針</h2>
          <ul className="flex flex-col gap-2 text-sm text-white/75">
            <li>・カメラリストの追加・更新は GitHub の PR 経由で人手レビュー</li>
            <li>・週1回、全カメラの URL 生存確認を自動実行</li>
            <li>・配信停止が確認されたカメラは自動でフラグ立てして非表示化</li>
            <li>
              ・掲載基準に反するカメラを見つけた場合は、リポジトリの Issue でご連絡ください
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">関連リンク</h2>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://github.com/wynne-rei/world-cams"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition hover:border-white/30 hover:bg-white/10"
            >
              GitHub リポジトリ ↗
            </a>
            <a
              href="https://www.unchain.tokyo/"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition hover:border-white/30 hover:bg-white/10"
            >
              UNCHAIN Inc. ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-white/10 px-4 py-6 text-center text-xs text-white/40 sm:px-6">
        © UNCHAIN Inc.
      </footer>
    </div>
  );
}
