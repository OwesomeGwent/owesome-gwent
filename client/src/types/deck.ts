import { CardData } from '../../../shared/ICardData';

export type DeckMakerStatus = 'INIT' | 'DECKMAKE';
export interface IDeckCard extends CardData {
  cardCount: number;
}
export interface IDeckCost {
  craft: number;
  provision: number;
}
