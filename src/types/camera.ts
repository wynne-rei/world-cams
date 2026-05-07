export const CATEGORIES = [
  'weather',
  'traffic',
  'tourism',
  'nature',
  'animal',
  'overseas',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const LICENSES = [
  'public_official',
  'youtube_live',
  'twitch_live',
  'tourism_official',
] as const;
export type License = (typeof LICENSES)[number];

export const EMBED_TYPES = ['youtube', 'iframe', 'link'] as const;
export type EmbedType = (typeof EMBED_TYPES)[number];

export type Camera = {
  id: string;
  name: string;
  name_en: string;
  category: Category;
  country: string;
  region: string;
  lat: number;
  lng: number;
  embedType: EmbedType;
  embedUrl: string;
  sourceUrl: string;
  sourceLabel: string;
  license: License;
  addedAt: string;
};
