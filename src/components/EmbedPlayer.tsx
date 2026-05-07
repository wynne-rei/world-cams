import type { Camera } from '@/types/camera';
import { getYouTubeThumbnail, localizeName, ui, type Locale } from '@/lib/i18n';

type Props = {
  camera: Camera;
  locale: Locale;
};

export function EmbedPlayer({ camera, locale }: Props) {
  const title = localizeName(camera, locale);

  if (camera.embedType === 'youtube') {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${camera.embedUrl}?autoplay=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (camera.embedType === 'iframe') {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          src={camera.embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // link type — embedUrl is the actual viewing URL when set, otherwise
  // fall back to sourceUrl. We extract a YouTube ID from either to render
  // a tinted thumbnail in the fallback panel.
  const watchUrl = camera.embedUrl || camera.sourceUrl;
  const youtubeId =
    watchUrl.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1] ??
    camera.sourceUrl.match(/(?:v=|youtu\.be\/)([\w-]{11})/)?.[1];
  const thumb = youtubeId ? getYouTubeThumbnail(youtubeId) : null;
  const t = ui[locale];

  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-6 text-center">
      {thumb && (
        <img
          src={thumb}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <p className="text-sm text-white/70">{t.externalCameraNotice}</p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-zinc-900 transition hover:bg-white/90"
        >
          {t.watchLive} ↗
        </a>
      </div>
    </div>
  );
}
