export interface RawCardData {
  [cardId: string]: CardData;
}
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
export interface CardDataList {
  leader: {
    [cardId: string]: CardData;
  };
  normal: {
    [cardId: string]: CardData;
  };
}
interface Variations {
  [key: string]: Variation;
}
interface Variation {
  art: string;
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
