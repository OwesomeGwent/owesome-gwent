import { createSelector } from 'reselect';
import { parseUrl } from '../helpers/deckUrl';
import { IRootState } from '../reducers';

const getRawCards = (state: IRootState) => state.card.rawCards.cards;
const getUrl = (state: IRootState, url: string) => url;

export interface IDetails {
  craft: number;
  count: number;
  faction: string;
  provision: number;
}
export const makeGetDetails = () =>
  createSelector(
    getRawCards,
    getUrl,
    ({ leader, normal }, url) => {
      let craft = 0;
      let count = 0;
      let faction = '';
      let provision = 0;
      const [leaderId, cardIds] = parseUrl(url);
      if (!leaderId) {
        return { faction, craft, count, provision };
      }
      faction = leader[leaderId].faction;
      cardIds.forEach(cardId => {
        const card = normal[cardId];
        if (card) {
          craft = craft + card.variations[0].craft.standard;
          count = count + 1;
          provision = provision + card.provision;
        }
      });
      return { faction, craft, count, provision };
    },
  );
