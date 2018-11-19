import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Main, Sidebar } from '.';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { Locale } from '../../../shared/ILocaleData';
import * as cardActions from '../actions/card';
import * as localeActions from '../actions/locale';
import { FlipCard } from '../components/Common';
import localeMapper from '../helpers/localeMapper';
import { IRootState } from '../reducers';
import { ThunkFunc } from '../types/thunk';

const HomeContainer = styled.div`
  display: flex;
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
  setCards: (leader: CardData[], normal: CardData[]) => void;
  setLocale: (locale: Locale) => void;
}
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
    setLocale(locale);
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
  }

  public render() {
    const { cardData, locale, setLocale } = this.props;
    // flag 설정 필요?
    if (cardData.normal.length <= 0) {
      return (
        <>
          <h2 style={{ textAlign: 'center' }}>Fetching Card Data...</h2>
          <FlipCard />
        </>
      );
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
  locale: state.locale.locale,
  cardData: state.card.cards,
  fetchStatus: state.card.rawCards.status,
  rawCardData: state.card.rawCards.cards,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  fetchCards: () => dispatch(cardActions.fetchCards()),
  setCards: (leader: CardData[], normal: CardData[]) =>
    dispatch(cardActions.setCards(leader, normal)),
  setLocale: (locale: Locale) => dispatch(localeActions.setLocale(locale)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
