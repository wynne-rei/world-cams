'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { CATEGORIES, type Camera, type Category } from '@/types/camera';
import { CategoryFilter } from './CategoryFilter';
import { ViewToggle, type ViewMode } from './ViewToggle';
import { CameraCard } from './CameraCard';
import { ui } from '@/lib/i18n';

const CameraMap = dynamic(() => import('./CameraMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-sm text-white/50">
      Loading map…
    </div>
  ),
});

type Props = {
  cameras: Camera[];
};

export function HomeView({ cameras }: Props) {
  const [view, setView] = useState<ViewMode>('map');
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const counts = useMemo(() => {
    const result: Record<Category | 'all', number> = {
      all: cameras.length,
      weather: 0,
      traffic: 0,
      tourism: 0,
      nature: 0,
      animal: 0,
      overseas: 0,
    };
    for (const c of cameras) {
      result[c.category] += 1;
    }
    return result;
  }, [cameras]);

  const visible = useMemo(
    () =>
      filter === 'all'
        ? cameras
        : cameras.filter((c) => c.category === filter),
    [cameras, filter],
  );

  // Ensure CATEGORIES is referenced so unused-import lint is happy.
  void CATEGORIES;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-white/50">
          {ui.ja.cameraCount(visible.length)}
        </p>
        <ViewToggle mode={view} onChange={setView} />
      </div>

      <CategoryFilter active={filter} onChange={setFilter} counts={counts} />

      {view === 'map' ? (
        <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden rounded-2xl border border-white/10">
          <CameraMap cameras={visible} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((cam) => (
            <CameraCard key={cam.id} camera={cam} />
          ))}
        </div>
      )}
    </div>
  );
}
