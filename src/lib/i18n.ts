import type { Category, License, EmbedType } from '@/types/camera';

export const categoryLabel: Record<Category, { ja: string; en: string }> = {
  weather: { ja: '気象・防災', en: 'Weather' },
  traffic: { ja: '道路・交通', en: 'Traffic' },
  tourism: { ja: '観光・ランドマーク', en: 'Tourism' },
  nature: { ja: '自然・河川', en: 'Nature' },
  animal: { ja: '動物・水族館', en: 'Animals' },
  overseas: { ja: '海外', en: 'Overseas' },
};

export const licenseLabel: Record<License, { ja: string; en: string }> = {
  public_official: { ja: '公的機関', en: 'Public Official' },
  youtube_live: { ja: 'YouTube公式', en: 'YouTube Live' },
  twitch_live: { ja: 'Twitch公式', en: 'Twitch Live' },
  tourism_official: { ja: '観光公式', en: 'Tourism Official' },
};

export const embedTypeLabel: Record<EmbedType, { ja: string; en: string }> = {
  youtube: { ja: 'YouTube埋込', en: 'YouTube Embed' },
  iframe: { ja: 'iframe埋込', en: 'Iframe Embed' },
  link: { ja: '公式サイト', en: 'External Link' },
};

export const categoryColor: Record<Category, string> = {
  weather: '#3b82f6',
  traffic: '#f59e0b',
  tourism: '#ef4444',
  nature: '#10b981',
  animal: '#a855f7',
  overseas: '#ec4899',
};

export function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export const ui = {
  ja: {
    siteName: 'UNCHAIN Camera Project',
    siteTagline: '世界中のライブカメラを、ひとつの地図に。',
    viewMap: 'マップ',
    viewGrid: 'グリッド',
    filterAll: 'すべて',
    cameraCount: (n: number) => `${n}件`,
    watchLive: 'ライブを見る',
    watchOnOfficialSite: '公式サイトで見る',
    backToList: '一覧に戻る',
    sourceLabel: '配信元',
    licenseLabel: '掲載区分',
    addedAtLabel: '追加日',
    notFoundTitle: 'カメラが見つかりません',
    aboutLink: 'このサイトについて',
  },
};
