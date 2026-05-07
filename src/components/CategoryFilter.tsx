'use client';

import { CATEGORIES, type Category } from '@/types/camera';
import { categoryColor, categoryLabel, ui } from '@/lib/i18n';

type Props = {
  active: Category | 'all';
  onChange: (next: Category | 'all') => void;
  counts: Record<Category | 'all', number>;
};

export function CategoryFilter({ active, onChange, counts }: Props) {
  const items: Array<{ key: Category | 'all'; label: string; color?: string }> = [
    { key: 'all', label: ui.ja.filterAll },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: categoryLabel[c].ja,
      color: categoryColor[c],
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? 'border-white bg-white text-zinc-900'
                : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10'
            }`}
          >
            {item.color && (
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{item.label}</span>
            <span className={isActive ? 'text-zinc-500' : 'text-white/40'}>
              {counts[item.key] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
