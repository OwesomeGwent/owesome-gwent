import { createSelector } from 'reselect';
import { store } from '../App';
import { IRootState } from '../reducers';

class Base64 {
  public alpha =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  public encode = (value: string | number) => {
    let parsed = value;
    if (typeof value !== 'number') {
      parsed = parseInt(value, 10);
    }
    let init = parsed as number;
    let result = '';
    let mod;
    do {
      mod = init % 64;
      result = this.alpha.charAt(mod) + result;
      init = Math.floor(init / 64);
    } while (init > 0);

    return result;
  };
  public decode = (value: string) => {
    let result = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      result *= 64;
      result += this.alpha.indexOf(value[i]);
    }

    return result;
  };
}

const base64 = new Base64();

const getSelectedLeader = (state: IRootState) => state.deck.leader;
const getSelectedCards = (state: IRootState) => state.deck.cards;
const getUrlByCards = createSelector(
  getSelectedLeader,
  getSelectedCards,
  (leader, cards) => {
    if (!leader) {
      return '/';
    }
    const leaderUrl = base64.encode(leader.ingameId);
    const cardsUrl = cards.reduce((acc, curr) => {
      return acc + base64.encode(curr.ingameId);
    }, '');
    return leaderUrl + cardsUrl;
  },
);

export const deckListener = () => {
  const state = store.getState();
  const url = getUrlByCards(state);
  history.pushState({}, url, url);
};

export const getDeckUrl = () => window.location.pathname.slice(1);
export const parseUrl = (url: string): [string | undefined, string[]] => {
  const ids: string[] = [];
  let currIdx = 0;
  const split = 3;
  while (currIdx < url.length - 1) {
    const parsed = base64.decode(url.substr(currIdx, split));
    ids.push(parsed.toString());
    currIdx = currIdx + split;
  }
  const leaderId = ids.shift();
  return [leaderId, ids];
};
