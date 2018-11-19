import intersection from 'lodash/intersection';
import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import { IRootState } from '../reducers';

const getFilter = (state: IRootState) => state.filter.filter;
const getCardsByType = (state: IRootState, type: 'leader' | 'normal') =>
  state.card.cards[type];

const getFilteredCards = createSelector(
  getFilter,
  getCardsByType,
  (filter, cards) => {
    const filterEntry = Object.entries(filter);
    return cards.filter(card => {
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
  },
);

export const makeGetFilteredCards = () => getFilteredCards;
