'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSearchParams } from 'next/navigation';
import type { Camera } from '@/types/camera';
import { categoryColor, categoryLabel, localizeName, ui } from '@/lib/i18n';
import { useLocale } from '@/lib/use-locale';
import Link from 'next/link';

type Props = {
  cameras: Camera[];
};

const DEFAULT_CENTER: [number, number] = [36, 138];
const DEFAULT_ZOOM = 4;

function FitBounds({ cameras }: { cameras: Camera[] }) {
  const map = useMap();

  useEffect(() => {
    const apply = () => {
      map.invalidateSize();
      if (cameras.length === 0) return;
      if (cameras.length === 1) {
        map.setView([cameras[0].lat, cameras[0].lng], 8);
        return;
      }
      const lats = cameras.map((c) => c.lat);
      const lngs = cameras.map((c) => c.lng);
      map.fitBounds(
        [
          [Math.min(...lats), Math.min(...lngs)],
          [Math.max(...lats), Math.max(...lngs)],
        ],
        { padding: [40, 40], maxZoom: 6 },
      );
    };

    // Leaflet caches the map size at construction time. Inside a Tailwind
    // flex/grid wrapper the container width can read as 0 on the first tick,
    // so we run apply() after browser layout AND keep observing for resizes.
    const raf = requestAnimationFrame(apply);
    const t1 = setTimeout(apply, 80);
    const t2 = setTimeout(apply, 250);
    const container = map.getContainer();
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(container);
    // Some preview/HMR contexts mount the map with a stale size cache and
    // never fire a resize. Force one synthetic resize after layout settles.
    const t3 = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 350);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ro.disconnect();
    };
  }, [cameras, map]);

  return null;
}

export default function CameraMap({ cameras }: Props) {
  const locale = useLocale();
  const sp = useSearchParams();
  const qs = sp.toString();
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      worldCopyJump
      className="h-full w-full"
      style={{ background: '#0b0d12' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <FitBounds cameras={cameras} />
      {cameras.map((cam) => {
        const detailHref = qs
          ? `/cameras/${cam.id}?${qs}`
          : `/cameras/${cam.id}`;
        return (
          <CircleMarker
            key={cam.id}
            center={[cam.lat, cam.lng]}
            radius={7}
            pathOptions={{
              color: categoryColor[cam.category],
              fillColor: categoryColor[cam.category],
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
                  {categoryLabel[cam.category][locale]}
                </p>
                <p className="text-sm font-bold">{localizeName(cam, locale)}</p>
                <p className="text-xs opacity-70">
                  {cam.region} · {cam.sourceLabel}
                </p>
                <Link
                  href={detailHref}
                  className="mt-1 inline-block text-xs font-bold text-blue-600 underline"
                >
                  {ui[locale].watchLive} →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
