import { CardData } from '../../../shared/ICardData';
import { Deck, IDeckCost } from '../../../shared/IDeck';

export type DeckMakerStatus = 'INIT' | 'DECKMAKE';
export interface IDeckCard extends CardData {
  cardCount: number;
}
export type IDeckCost = IDeckCost;

export type IAddDeck = Pick<Deck, 'name' | 'url' | 'leaderId' | 'faction'>;
export type IDeck = Pick<Deck, 'id' | 'leaderId' | 'name' | 'url' | 'faction'> &
  Partial<Deck>;
