import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Main, Sidebar } from '.';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { Locale } from '../../../shared/ILocaleData';
import * as cardActions from '../actions/card';
import * as DeckActions from '../actions/deck';
import * as localeActions from '../actions/locale';
import { Loading } from '../components/Common';
import localeMapper from '../helpers/localeMapper';
import { parseUrl } from '../helpers/urlMaker';
import { IRootState } from '../reducers';
import { ThunkFunc } from '../types/thunk';

const HomeContainer = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
`;
export interface IHomeProps {
  cardData: {
    leader: CardData[];
    normal: CardData[];
  };
  locale: Locale;
  rawCardData: CardDataList;
  fetchStatus: string;
  fetchCards: () => void;
  setDeckMaker: () => void;
  selectCard: typeof DeckActions.selectCard;
  selectLeader: (leader: CardData) => void;
  setCards: (leader: CardData[], normal: CardData[]) => void;
  setLocale: (locale: Locale) => void;
}
// Ownable 검사. 덱에 못넣는 카드들.
const checkOwnable = (card: CardData) => {
  return card.variations[0].availability !== 'NonOwnable';
};
const sortByFaction = (a: CardData, b: CardData) => {
  if (a.faction && b.faction) {
    return a.faction.localeCompare(b.faction);
  }
  return 0;
};
const sortByProvision = (a: CardData, b: CardData) => {
  if (a.mulligans && b.mulligans) {
    return b.mulligans - a.mulligans;
  }
  return b.provision - a.provision;
};
const getCurrentLocale = () => {
  const navigator: any = window.navigator;
  if (navigator.languages) {
    return localeMapper(navigator.languages[0]);
  } else {
    return localeMapper();
  }
};
class Home extends Component<IHomeProps> {
  public async componentDidMount() {
    let Cards: any;
    const locale = getCurrentLocale();
    const { fetchCards, setCards, setLocale } = this.props;
    await Promise.all([fetchCards(), setLocale(locale)]);
    // 카드 스피너를 위한 delay 살짝~
    const { fetchStatus, rawCardData } = this.props;
    Cards =
      fetchStatus === 'ERROR'
        ? await import('../data/cards.json')
        : rawCardData;
    const { leader, normal } = Object.entries(Cards).reduce(
      (acc, [type, cards]) => {
        const sortedCards = Object.values(cards)
          .map(card => card)
          .filter(checkOwnable)
          .slice()
          .sort(sortByProvision)
          .sort(sortByFaction);
        return {
          ...acc,
          [type]: sortedCards,
        };
      },
      { leader: [], normal: [] },
    );
    setCards(leader, normal);
    // Deck url 체크.
    const shortUrl = window.location.pathname.slice(1);
    if (shortUrl) {
      const [leaderId, cardIds] = parseUrl(shortUrl);
      const selectedLeader = (leader as CardData[]).find(
        card => card.ingameId === leaderId,
      );
      const selectedCard = (normal as CardData[]).filter(card =>
        cardIds.includes(card.ingameId),
      );
      this.props.setDeckMaker();
      this.props.selectLeader(selectedLeader as CardData);
      this.props.selectCard(selectedCard as CardData[]);
    }
  }

  public render() {
    const { cardData, locale, setLocale } = this.props;
    // flag 설정 필요?
    if (cardData.normal.length <= 0) {
      return <Loading message="Fetching card data..." />;
    }
    return (
      <>
        <Header locale={locale} setLocale={setLocale} />
        <HomeContainer>
          <Sidebar />
          <Main />
        </HomeContainer>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  locale: state.locale,
  cardData: state.card.cards,
  fetchStatus: state.card.rawCards.status,
  rawCardData: state.card.rawCards.cards,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  fetchCards: () => dispatch(cardActions.fetchCards()),
  setDeckMaker: () => dispatch(DeckActions.setDeckMakerStatus('DECKMAKE')),
  selectCard: (card: CardData | CardData[]) =>
    dispatch(DeckActions.selectCard(card)),
  selectLeader: (leader: CardData) =>
    dispatch(DeckActions.selectLeader(leader)),
  setCards: (leader: CardData[], normal: CardData[]) =>
    dispatch(cardActions.setCards(leader, normal)),
  setLocale: (locale: Locale) => dispatch(localeActions.setLocale(locale)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
