export interface CardData {
  artist: string;
  cardType: string;
  categories: Array<string>;
  categoryIds: Array<string>;
  faction: string;
  ingameId: string;
  keywords: Array<string>;
  loyalites?: Array<string>;
  positions: Array<string>;
  provision: number;
  released: boolean;
  strength: number;
  type: string;
  variations: Variations;
  mulligans?: number;
  [attrKey: string]: any;
}

export interface AllCardData extends CardData {
  flavor?: DefaultLocaleSet;
  info?: DefaultLocaleSet;
  infoRaw?: DefaultLocaleSet;
  name?: DefaultLocaleSet;
}

interface Variations {
  [key: string]: Variation;
}

interface Variation {
  art: {
    high: string;
    ingameArtId: string;
    low: string;
    medium: string;
    original: string;
    thumbnail: string;
  };
  availability: string;
  collectible: boolean;
  craft: {
    premium: number;
    standard: number;
    upgrade: number;
  };
  mill: {
    premium: number;
    standard: number;
    upgrade: number;
  };
  rarity: string;
  variationId: string;
}

export interface DefaultLocaleSet {
  'de-DE': string;
  'en-US': string;
  'es-ES': string;
  'es-MX': string;
  'fr-FR': string;
  'it-IT': string;
  'ja-JP': string;
  'ko-KR': string;
  'pl-PL': string;
  'pt-BR': string;
  'ru-RU': string;
  'zh-CN': string;
  'zh-TW': string;
}
