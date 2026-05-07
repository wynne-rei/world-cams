'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Camera } from '@/types/camera';
import {
  categoryColor,
  categoryLabel,
  getYouTubeThumbnail,
  localizeName,
  ui,
} from '@/lib/i18n';
import { useLocale } from '@/lib/use-locale';

type Props = {
  camera: Camera;
};

export function CameraCard({ camera }: Props) {
  const locale = useLocale();
  const sp = useSearchParams();
  const qs = sp.toString();
  const href = qs
    ? `/cameras/${camera.id}?${qs}`
    : `/cameras/${camera.id}`;
  const thumb =
    camera.embedType === 'youtube' ? getYouTubeThumbnail(camera.embedUrl) : null;
  const color = categoryColor[camera.category];

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/30 hover:bg-white/10"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {thumb ? (
          <img
            src={thumb}
            alt={localizeName(camera, locale)}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}05)`,
            }}
          >
            <span className="text-xs uppercase tracking-widest text-white/60">
              {ui[locale].watchLiveExternal}
            </span>
          </div>
        )}
        <span
          className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          {categoryLabel[camera.category][locale]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-bold text-white">
          {localizeName(camera, locale)}
        </h3>
        <p className="text-xs text-white/60">
          {camera.region} · {camera.sourceLabel}
        </p>
      </div>
    </Link>
  );
}
