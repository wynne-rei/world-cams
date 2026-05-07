import type { Category, License, EmbedType } from '@/types/camera';

export const LOCALES = ['ja', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'ja';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export const categoryLabel: Record<Category, Record<Locale, string>> = {
  weather: { ja: '気象・防災', en: 'Weather' },
  traffic: { ja: '道路・交通', en: 'Traffic' },
  tourism: { ja: '観光・ランドマーク', en: 'Tourism' },
  nature: { ja: '自然・河川', en: 'Nature' },
  animal: { ja: '動物・水族館', en: 'Animals' },
  overseas: { ja: '海外', en: 'Overseas' },
};

export const licenseLabel: Record<License, Record<Locale, string>> = {
  public_official: { ja: '公的機関', en: 'Public Official' },
  youtube_live: { ja: 'YouTube公式', en: 'YouTube Live' },
  twitch_live: { ja: 'Twitch公式', en: 'Twitch Live' },
  tourism_official: { ja: '観光公式', en: 'Tourism Official' },
};

export const embedTypeLabel: Record<EmbedType, Record<Locale, string>> = {
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

type Strings = {
  siteName: string;
  siteTagline: string;
  viewMap: string;
  viewGrid: string;
  filterAll: string;
  cameraCount: (n: number) => string;
  watchLive: string;
  watchLiveExternal: string;
  externalCameraNotice: string;
  backToList: string;
  sourceLabel: string;
  regionLabel: string;
  licenseLabel: string;
  addedAtLabel: string;
  aboutLink: string;
  openOfficialPage: string;
  loadingMap: string;
  // About page
  aboutTitle: string;
  aboutLead1Pre: string;
  aboutLead1Bold: string;
  aboutLead1Post: string;
  aboutLead2: string;
  inclusionTitle: string;
  inclusionIntro: string;
  inclusionItems: string[];
  prohibitionTitle: string;
  prohibitionItems: string[];
  operationTitle: string;
  operationItems: string[];
  linksTitle: string;
  linkRepo: string;
  linkUnchain: string;
};

export const ui: Record<Locale, Strings> = {
  ja: {
    siteName: 'UNCHAIN Camera Project',
    siteTagline: '世界中のライブカメラを、ひとつの地図に。',
    viewMap: 'マップ',
    viewGrid: 'グリッド',
    filterAll: 'すべて',
    cameraCount: (n) => `${n}件`,
    watchLive: 'ライブを見る',
    watchLiveExternal: 'ライブを見る',
    externalCameraNotice: 'このカメラは外部サイトで配信されています',
    backToList: '一覧に戻る',
    sourceLabel: '配信元',
    regionLabel: '地域',
    licenseLabel: '掲載区分',
    addedAtLabel: '追加日',
    aboutLink: 'このサイトについて',
    openOfficialPage: '配信元の公式ページを開く',
    loadingMap: 'Loading map…',
    aboutTitle: 'このサイトについて',
    aboutLead1Pre: 'UNCHAIN Camera Project は、世界中の',
    aboutLead1Bold: '掲載OKなライブカメラ',
    aboutLead1Post:
      'だけを集めたキュレーションサイトです。気象・防災から動物園・観光ランドマーク・海外の絶景まで、いつでもひと目で巡れる「世界の窓」を目指しています。',
    aboutLead2:
      'UNCHAIN Inc. の AI 実証実験プロジェクトとして、データ収集・実装・運用のすべてを Claude Code を中心に進めています。',
    inclusionTitle: '掲載基準（厳守）',
    inclusionIntro: '掲載するライブカメラは、以下のいずれかを満たすものに限定しています。',
    inclusionItems: [
      '① 設置者が公衆向け公開を明示している（公式ライブカメラページに掲載）',
      '② YouTube Live / Twitch などプラットフォーム経由で公式に配信されている',
      '③ 政府機関・自治体・公共団体が公開している',
    ],
    prohibitionTitle: '禁止事項（絶対NG）',
    prohibitionItems: [
      'Shodan 等を使った無認証カメラの収集',
      '設置者の意図が不明なカメラの掲載',
      '個人宅・私有地のカメラ',
      'スクレイピングで埋め込みコードを取得した非公式埋め込み',
      '架空のURLや存在しないカメラの登録',
    ],
    operationTitle: '運用方針',
    operationItems: [
      '・カメラリストの追加・更新は GitHub の PR 経由で人手レビュー',
      '・週1回、全カメラの URL 生存確認を自動実行',
      '・配信停止が確認されたカメラは自動でフラグ立てして非表示化',
      '・掲載基準に反するカメラを見つけた場合は、リポジトリの Issue でご連絡ください',
    ],
    linksTitle: '関連リンク',
    linkRepo: 'GitHub リポジトリ',
    linkUnchain: 'UNCHAIN Inc.',
  },
  en: {
    siteName: 'UNCHAIN Camera Project',
    siteTagline: 'Live cameras around the world, on a single map.',
    viewMap: 'Map',
    viewGrid: 'Grid',
    filterAll: 'All',
    cameraCount: (n) => `${n} cameras`,
    watchLive: 'Watch live',
    watchLiveExternal: 'Watch on source site',
    externalCameraNotice: 'This camera streams on an external site',
    backToList: 'Back to list',
    sourceLabel: 'Source',
    regionLabel: 'Region',
    licenseLabel: 'License',
    addedAtLabel: 'Added',
    aboutLink: 'About this site',
    openOfficialPage: 'Open official source page',
    loadingMap: 'Loading map…',
    aboutTitle: 'About this site',
    aboutLead1Pre: 'UNCHAIN Camera Project curates ',
    aboutLead1Bold: 'live cameras that are explicitly OK to embed',
    aboutLead1Post:
      ' from around the world — weather and disaster, tourism and landmarks, animals and overseas vistas, all on one map. A window onto the world, one click away.',
    aboutLead2:
      'It is an AI proof-of-concept by UNCHAIN Inc.: data collection, implementation, and operations are driven entirely through Claude Code.',
    inclusionTitle: 'Inclusion criteria (strict)',
    inclusionIntro: 'Cameras are listed only if they meet at least one of these conditions:',
    inclusionItems: [
      '① The operator explicitly publishes the camera for public viewing (on an official live-camera page).',
      '② The stream is delivered via an official channel on YouTube Live / Twitch / etc.',
      '③ It is published by a government, municipal, or public-sector body.',
    ],
    prohibitionTitle: 'Prohibited (never allowed)',
    prohibitionItems: [
      'Harvesting unauthenticated cameras via Shodan or similar tools',
      'Cameras whose operator intent is unclear',
      'Private homes or private property',
      'Unofficial embeds derived from scraped embed codes',
      'Fictitious URLs or non-existent cameras',
    ],
    operationTitle: 'Operations',
    operationItems: [
      '・Additions and updates go through pull requests with human review.',
      '・A weekly job verifies that every camera URL is still alive.',
      '・Cameras confirmed offline are auto-flagged and hidden.',
      '・If you find a camera that violates the inclusion criteria, please open an issue.',
    ],
    linksTitle: 'Related links',
    linkRepo: 'GitHub repository',
    linkUnchain: 'UNCHAIN Inc.',
  },
};

export function localizeName(camera: { name: string; name_en: string }, locale: Locale) {
  return locale === 'en' ? camera.name_en : camera.name;
}
