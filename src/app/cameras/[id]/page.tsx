import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCameras, getCameraById } from '@/lib/cameras';
import { EmbedPlayer } from '@/components/EmbedPlayer';
import {
  categoryColor,
  categoryLabel,
  licenseLabel,
  ui,
} from '@/lib/i18n';

export function generateStaticParams() {
  return getAllCameras().map((c) => ({ id: c.id }));
}

export default async function CameraDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const camera = getCameraById(id);
  if (!camera) notFound();

  const color = categoryColor[camera.category];

  return (
    <div className="min-h-dvh bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-xs font-medium text-white/60 hover:text-white"
          >
            ← {ui.ja.backToList}
          </Link>
          <span className="text-xs text-white/40">{ui.ja.siteName}</span>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6">
        <EmbedPlayer camera={camera} />

        <div className="flex flex-col gap-3">
          <span
            className="self-start rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white"
            style={{ backgroundColor: color }}
          >
            {categoryLabel[camera.category].ja}
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {camera.name}
          </h1>
          <p className="text-sm text-white/60">{camera.name_en}</p>
        </div>

        <dl className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">
              {ui.ja.sourceLabel}
            </dt>
            <dd className="mt-1 font-medium">{camera.sourceLabel}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">
              地域
            </dt>
            <dd className="mt-1 font-medium">
              {camera.region} ({camera.country})
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">
              {ui.ja.licenseLabel}
            </dt>
            <dd className="mt-1 font-medium">
              {licenseLabel[camera.license].ja}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-white/40">
              {ui.ja.addedAtLabel}
            </dt>
            <dd className="mt-1 font-medium">{camera.addedAt}</dd>
          </div>
        </dl>

        <a
          href={camera.sourceUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:border-white/40 hover:bg-white/10"
        >
          配信元の公式ページを開く ↗
        </a>
      </main>

      <footer className="mt-10 border-t border-white/10 px-4 py-6 text-center text-xs text-white/40 sm:px-6">
        © UNCHAIN Inc.
      </footer>
    </div>
  );
}
