'use client';

import { ui } from '@/lib/i18n';
import { useLocale } from '@/lib/use-locale';

export type ViewMode = 'map' | 'grid';

type Props = {
  mode: ViewMode;
  onChange: (next: ViewMode) => void;
};

export function ViewToggle({ mode, onChange }: Props) {
  const locale = useLocale();
  const t = ui[locale];

  return (
    <div
      role="tablist"
      className="inline-flex rounded-full border border-white/15 bg-white/5 p-1"
    >
      {(['map', 'grid'] as const).map((value) => {
        const isActive = mode === value;
        const label = value === 'map' ? t.viewMap : t.viewGrid;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              isActive
                ? 'bg-white text-zinc-900'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
