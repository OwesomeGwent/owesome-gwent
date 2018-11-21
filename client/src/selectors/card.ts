import intersection from 'lodash/intersection';
import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import useCache from '../helpers/cache';
import { IRootState } from '../reducers';
import { getCardDetailByLocale } from './locale';

type CardType = 'leader' | 'normal';

const getCards = (_: IRootState, cards: CardData[]) => cards;
const getFilter = (state: IRootState) => state.filter.filter;
const getSearchFilter = (state: IRootState) => state.filter.search;
const getType = (_: IRootState, type: CardType) => type;
const getCardsByType = (state: IRootState, type: CardType) =>
  state.card.cards[type];

const getCachedCards = useCache(
  (filterEntry: Array<[string, {}]>, cards: CardData[]) => {
    const matchCards = cards.filter(card => {
      const isMatched = filterEntry.every(([field, value]) => {
        if (!value) {
          return true;
        }
        if (Array.isArray(value)) {
          return value.length > 0
            ? !!intersection(card[field], value).length
            : true;
        }
        if (field === 'rarity') {
          return card.variations[0].rarity === value;
        } else if (field === 'provision') {
          const numVal = parseInt(value as string, 10);
          if (numVal === 4) {
            return card.provision <= numVal;
          } else if (numVal === 11) {
            return card.provision >= numVal;
          }
          return card.provision === numVal;
        }
        return card[field] === value;
      });
      return isMatched;
    });
    return matchCards;
  },
);

// 후.. 이거  셀렉터 함수를 변수로 만들어서 쓰면 공유되어서 make로 만드는 의미가 없다.
export const makeGetFilteredCards = () => {
  return createSelector(
    getFilter,
    getType,
    getCardsByType,
    (filter, type, cards): CardData[] => {
      const filterEntry = Object.entries(filter);
      const keys = filterEntry.reduce(
        (acc, [_, value]) => {
          if (!value) {
            return acc;
          }
          if (Array.isArray(value)) {
            return [...acc, ...value];
          }
          return [...acc, value];
        },
        [] as string[],
      );
      const key = `${type}/${keys.sort((a, b) => a.localeCompare(b))}`;
      return getCachedCards(filterEntry, cards, key);
    },
  );
};
export const makeGetSearchFilteredCards = () => {
  return createSelector(
    getSearchFilter,
    getCardDetailByLocale,
    getCards,
    (search, details, cards): CardData[] => {
      const searchReg = new RegExp(search);
      if (details) {
        const results = cards.filter(card => {
          return details[card.ingameId].name.match(searchReg);
        });
        return results;
      }
      return [];
    },
  );
};
