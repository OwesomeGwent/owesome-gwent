import { createSelector } from 'reselect';
import * as DeckHelper from '../helpers/deck';
import { IRootState } from '../reducers';
const getDeckCards = (state: IRootState) => state.deck.cards;
// 중복되는 카드 같은거 계산하기 귀찮으니 그냥 타입을 따로 넣는 방식으로 했음. CardData 타입에 cardCount 추가
export const getParsedDeckCards = createSelector(
  getDeckCards,
  deckCards => {
    const parsed = DeckHelper.makeDeckCards(deckCards);
    return parsed;
  },
);

export const getDeckCost = createSelector(
  getParsedDeckCards,
  deckCards => {
    return DeckHelper.getDeckCost(deckCards);
  },
);
