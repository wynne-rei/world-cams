import { getAllCameras } from '@/lib/cameras';
import { HomeView } from '@/components/HomeView';
import { ui } from '@/lib/i18n';
import Link from 'next/link';

export default function Home() {
  const cameras = getAllCameras();

  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-3 px-4 py-5 sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {ui.ja.siteName}
            </h1>
            <p className="mt-0.5 text-xs text-white/60">{ui.ja.siteTagline}</p>
          </div>
          <Link
            href="/about"
            className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white hover:underline"
          >
            {ui.ja.aboutLink}
          </Link>
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
