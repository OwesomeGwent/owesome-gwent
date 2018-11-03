export interface ICard {
  faction: string;
  strength: number;
  variations: {
    [key: string]: {
      art: {
        ingameArtId: string;
      };
      variationId: number;
      rarity: string;
    };
  };
}
export interface ICardData {
  [key: string]: ICard;
}
