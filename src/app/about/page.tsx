import Link from 'next/link';
import type { Metadata } from 'next';
import { ui } from '@/lib/i18n';
import { localeFromValue } from '@/lib/locale';
import { LangToggle } from '@/components/LangToggle';

export const metadata: Metadata = {
  title: 'このサイトについて | UNCHAIN Camera Project',
  description:
    '世界中の掲載OKなライブカメラを集約するキュレーションサイト。掲載基準と禁止事項、運営方針について。',
};

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const sp = await searchParams;
  const locale = localeFromValue(sp.lang);
  const t = ui[locale];
  const homeHref = locale === 'ja' ? '/' : '/?lang=en';

  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link
            href={homeHref}
            className="text-xs font-medium text-white/60 hover:text-white"
          >
            ← {t.backToList}
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40">{t.siteName}</span>
            <LangToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{t.aboutTitle}</h1>
          <p className="text-sm leading-relaxed text-white/75">
            {t.aboutLead1Pre}
            <strong className="text-white">{t.aboutLead1Bold}</strong>
            {t.aboutLead1Post}
          </p>
          <p className="text-sm leading-relaxed text-white/75">{t.aboutLead2}</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t.inclusionTitle}</h2>
          <p className="text-sm text-white/70">{t.inclusionIntro}</p>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {t.inclusionItems.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t.prohibitionTitle}</h2>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {t.prohibitionItems.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-rose-400/20 bg-rose-500/5 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t.operationTitle}</h2>
          <ul className="flex flex-col gap-2 text-sm text-white/75">
            {t.operationItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t.linksTitle}</h2>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://github.com/wynne-rei/world-cams"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition hover:border-white/30 hover:bg-white/10"
            >
              {t.linkRepo} ↗
            </a>
            <a
              href="https://www.unchain.tokyo/"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 transition hover:border-white/30 hover:bg-white/10"
            >
              {t.linkUnchain} ↗
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
