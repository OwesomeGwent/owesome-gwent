export default interface CardData {
  artist: string;
  cardType: string;
  categories: Array<string>;
  categoryIds: Array<string>;
  ingameId: string;
  keywords: Array<string>;
  loyalites: Array<string>;
  positions: Array<string>;
  provision: number;
  released: boolean;
  strength: number;
  type: string;
  variations: Variations;
}

interface Variations {
  [varID: string]: Variation;
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
