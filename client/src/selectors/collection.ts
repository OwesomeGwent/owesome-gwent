import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import { CardLocaleData } from '../../../shared/ILocaleData';
import { parseUrl } from '../helpers/deckUrl';
import { IRootState } from '../reducers';
import { makeGetCardDetailByLocale } from './locale';

const getRawCards = (state: IRootState) => state.card.rawCards.cards;
const getLeaders = (state: IRootState) => state.card.cards.leader;
const getFaction = (state: IRootState, faction: string) => faction;
const getUrl = (state: IRootState, url: string) => url;
const getCardDetailByLocale = makeGetCardDetailByLocale();

export interface IDetails {
  craft: number;
  count: number;
  faction: string;
  provision: number;
}
export const getFactions = createSelector(
  getLeaders,
  leaders => {
    return leaders.reduce(
      (acc, leader) => {
        if (!acc.includes(leader.faction)) {
          return [...acc, leader.faction];
        }
        return acc;
      },
      [] as string[],
    );
  },
);
export const getLeadersWithLocaleName = createSelector(
  getLeaders,
  getCardDetailByLocale,
  (leaders, details) => {
    if (!details) {
      return [];
    }
    return leaders.reduce(
      (acc, leader) => {
        return [...acc, { ...leader, ...details[leader.ingameId] }];
      },
      [] as Array<CardData & CardLocaleData>,
    );
  },
);
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
