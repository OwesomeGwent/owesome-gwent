export interface ICard {
  cardType: string;
  faction: string;
  ingameId: string;
  strength: number;
  mulligans: number;
  provision: number;
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
