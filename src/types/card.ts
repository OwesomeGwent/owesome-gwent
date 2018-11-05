export interface ICard {
  cardType: string; // unit, leader, spell, artifact ...
  type: string; // bronze, gold, leader ...
  faction: string; // mon, sco, nor ...
  ingameId: string; // 실제 id
  strength: number; // 방어력?
  mulligans: number; // 교체 횟수
  provision: number; // 코스트
  variations: {
    [key: string]: {
      art: {
        ingameArtId: string; // image 파일 id
      };
      variationId: number;
      rarity: string; // 레어도
    };
  };
}
export interface ICardData {
  [key: string]: ICard;
}
