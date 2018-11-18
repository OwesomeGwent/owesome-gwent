import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import randomPicker from '../helpers/randomPicker';
import { IRootState } from '../reducers';
const getLeaders = (state: IRootState) => state.card.cards.leader;

export const getRandomLeader = createSelector(
  getLeaders,
  (leaders: CardData[]) => {
    const a = randomPicker(leaders);
    return a;
  },
);
