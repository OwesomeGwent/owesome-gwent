import findIndex from 'lodash/findIndex';
import { createSelector } from 'reselect';
import { IRootState } from '../reducers';
import { IDeckCard } from '../types/deck';
import { getCardDetailByLocale } from './locale';

const getDeckCards = (state: IRootState) => state.deck.cards;
const getLeaderId = (state: IRootState, leaderId: string) => leaderId;
// 중복되는 카드 같은거 계산하기 귀찮으니 그냥 타입을 따로 넣는 방식으로 했음. CardData 타입에 cardCount 추가
export const getParsedDeckCards = createSelector(
  getDeckCards,
  deckCards => {
    const parsed: IDeckCard[] = deckCards.reduce(
      (acc, curr) => {
        const index = findIndex(acc, card => card.ingameId === curr.ingameId);
        if (index >= 0) {
          acc[index] = {
            ...curr,
            cardCount: acc[index].cardCount + 1,
          };
          return acc;
        }
        return [...acc, { ...curr, cardCount: 1 }];
      },
      [] as IDeckCard[],
    );
    return parsed;
  },
);

export const getDeckCost = createSelector(
  getParsedDeckCards,
  deckCards => {
    let craft = 0;
    let provision = 0;
    deckCards.forEach(card => {
      craft = craft + card.variations[0].craft.standard * card.cardCount;
      provision = provision + card.provision * card.cardCount;
    });
    return { craft, provision };
  },
);

export const makeGetLeaderName = () =>
  createSelector(
    getCardDetailByLocale,
    getLeaderId,
    (details, leaderId) => {
      if (details[leaderId]) {
        return details[leaderId].name;
      }
      return '';
    },
  );
