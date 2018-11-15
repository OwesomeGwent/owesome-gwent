import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import { IRootState } from '../reducers';

interface IBaseProps {
  cards: CardData[];
}
const getFilter = (state: IRootState) => state.filter.filter;
const getCards = (state: IRootState, props: IBaseProps) => props.cards;

const getFilteredCards = createSelector(
  getFilter,
  getCards,
  (filter, cards) => {
    const filterEntry = Object.entries(filter);
    return cards.filter(card => {
      const isMatched = filterEntry.every(([field, value]) => {
        if (field === 'rarity') {
          return card.variations[0].rarity === value;
        }
        return card[field] === value;
      });
      return isMatched;
    });
  },
);

export const makeGetFilteredCards = () => getFilteredCards;
