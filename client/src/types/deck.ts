import { CardData } from '../../../shared/ICardData';
import { Deck, IDeckCost } from '../../../shared/IDeck';

export type DeckMakerStatus = 'INIT' | 'DECKMAKE';
export interface IDeckCard extends CardData {
  cardCount: number;
}
export type IDeckCost = IDeckCost;

// deck 추가시
export type IAddDeck = Pick<Deck, 'name' | 'url' | 'leaderId' | 'faction'>;
// 일반적인 deck 타입
export type IDeck = Pick<
  Deck,
  'id' | 'leaderId' | 'name' | 'url' | 'faction' | 'completed'
> &
  Partial<Deck>;
