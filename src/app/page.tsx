import { getAllCameras } from '@/lib/cameras';
import { HomeView } from '@/components/HomeView';
import { LangToggle } from '@/components/LangToggle';
import { ui } from '@/lib/i18n';
import { localeFromValue } from '@/lib/locale';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const cameras = getAllCameras();
  const sp = await searchParams;
  const locale = localeFromValue(sp.lang);
  const t = ui[locale];
  const aboutHref = locale === 'ja' ? '/about' : '/about?lang=en';

  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-3 px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {t.siteName}
            </h1>
            <p className="mt-0.5 text-xs text-white/60">{t.siteTagline}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={aboutHref}
              className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white hover:underline"
            >
              {t.aboutLink}
            </Link>
            <LangToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <HomeView cameras={cameras} />
      </main>
      <footer className="mt-10 border-t border-white/10 px-4 py-6 text-center text-xs text-white/40 sm:px-6">
        © UNCHAIN Inc.
      </footer>
    </div>
  );
}
