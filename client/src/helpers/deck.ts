import findIndex from 'lodash/findIndex';
import { CardData } from '../../../shared/ICardData';
import { IDeckCard } from '../types/deck';

// cardCount를 카드 데이터에 넣어주는 helper
export const makeDeckCards = (deckCards: CardData[]) => {
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
};

export const getDeckCost = (deckCards: IDeckCard[]) => {
  let craft = 0;
  let count = 0;
  let provision = 0;
  deckCards.forEach(card => {
    craft = craft + card.variations[0].craft.standard * card.cardCount;
    count = count + card.cardCount;
    provision = provision + card.provision * card.cardCount;
  });
  return { craft, count, provision };
};
