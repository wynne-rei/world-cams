'use client';

import { useSearchParams } from 'next/navigation';
import { localeFromValue } from './locale';

export function useLocale() {
  const sp = useSearchParams();
  return localeFromValue(sp.get('lang'));
}
