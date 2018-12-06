import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import { store } from '../App';
import { history } from '../helpers/history';
import { IRootState } from '../reducers';
// Deck url 관련 helper들

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

export const base64 = new Base64();

export const pushCardToUrl = (type: 'ADD' | 'REMOVE', card: CardData) => {
  const deckUrl = getDeckUrl();
  if (!deckUrl) {
    return false;
  }
  if (type === 'REMOVE') {
    let currIdx = 0;
    const split = 3;
    while (currIdx < deckUrl.length - 1) {
      const parsed = base64.decode(deckUrl.substr(currIdx, split));
      if (parsed.toString() === card.ingameId) {
        const newUrl =
          deckUrl.slice(0, currIdx) +
          deckUrl.slice(currIdx + split, deckUrl.length);
        history.push(newUrl);
        break;
      }
      currIdx = currIdx + split;
    }
    return true;
  } else {
    history.push(`/${deckUrl}/${base64.encode(card.ingameId)}`);
  }
};
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
// store을 subscribe하면서 deck에 변화가 생길 때 마다 url을 바꿔줌.
export const deckListener = () => {
  const state = store.getState();
  const url = getUrlByCards(state);
  // history.push(url);
  // history.replaceState({}, url, url);
};
// 기본적인 deck url 가져오기
export const getDeckUrl = () => history.location.pathname.slice(1);
// deck url 파싱
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

export const copyUrl = () => {
  const textArea = document.createElement('textarea');
  textArea.value = window.location.href;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.right = '0';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  let success;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    success = false;
  }
  document.body.removeChild(textArea);
  return success;
};
