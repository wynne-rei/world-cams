'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';
import { localeFromValue } from '@/lib/locale';

export function LangToggle() {
  const pathname = usePathname();
  const sp = useSearchParams();
  const current = localeFromValue(sp.get('lang'));

  const buildHref = (locale: Locale) => {
    const params = new URLSearchParams(sp.toString());
    if (locale === 'ja') {
      params.delete('lang');
    } else {
      params.set('lang', locale);
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-0.5 text-[11px] font-bold">
      {LOCALES.map((locale) => {
        const isActive = locale === current;
        return (
          <Link
            key={locale}
            href={buildHref(locale)}
            scroll={false}
            className={`rounded-full px-2.5 py-1 transition ${
              isActive ? 'bg-white text-zinc-900' : 'text-white/60 hover:text-white'
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
