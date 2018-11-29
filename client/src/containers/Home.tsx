import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Main, Sidebar } from '.';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { Locale } from '../../../shared/ILocaleData';
import * as cardActions from '../actions/card';
import * as DeckActions from '../actions/deck';
import * as localeActions from '../actions/locale';
import * as UserActions from '../actions/user';
import { Loading } from '../components/Common';
import { checkOwnable, sortByFaction, sortByProvision } from '../helpers/card';
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
  verify: () => void;
  fetchStatus: string;
  fetchCards: () => void;
  setDeckMaker: () => void;
  selectDeckUrl: (url: string) => void;
  selectCard: typeof DeckActions.selectCard;
  selectLeader: (leader: CardData) => void;
  setCards: (leader: CardData[], normal: CardData[]) => void;
  setLocale: (locale: Locale) => void;
}
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
    const { fetchCards, setCards, setLocale, verify } = this.props;
    await Promise.all([fetchCards(), setLocale(locale), verify()]);
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
      this.props.selectDeckUrl(shortUrl);
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
  verify: () => dispatch(UserActions.verify()),
  fetchCards: () => dispatch(cardActions.fetchCards()),
  setDeckMaker: () => dispatch(DeckActions.setDeckMakerStatus('DECKMAKE')),
  selectDeckUrl: (url: string) => dispatch(DeckActions.selectDeckUrl(url)),
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
