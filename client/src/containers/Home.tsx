import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Header, Main, Sidebar } from '.';
import { CardData, CardDataList } from '../../../shared/ICardData';
import {
  CardLocaleData,
  CardLocaleDataList,
  Locale,
} from '../../../shared/ILocaleData';
import * as cardActions from '../actions/card';
import * as localeActions from '../actions/locale';
import { FlipCard } from '../components';
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
  rawCardData: CardDataList;
  fetchStatus: string;
  fetchCards: () => void;
  fetchDetails: (locale: Locale) => void;
  setCards: (leader: CardData[], normal: CardData[]) => void;
  setLocale: (locale: Locale) => void;
}
const sortByFaction = (a: CardData, b: CardData) => {
  return a.faction.localeCompare(b.faction);
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
    return navigator.languages[0];
  } else {
    return Locale.KR;
  }
};
class Home extends Component<IHomeProps> {
  public async componentDidMount() {
    let Cards: any;
    const locale = getCurrentLocale();
    const { fetchCards, fetchDetails, setCards, setLocale } = this.props;
    await Promise.all([fetchCards(), fetchDetails(Locale.KR)]);
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
    const { cardData } = this.props;
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
        <Header />
        <HomeContainer>
          <Sidebar />
          <Main cardData={cardData} />
        </HomeContainer>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  cardData: state.card.cards,
  fetchStatus: state.card.rawCards.status,
  rawCardData: state.card.rawCards.cards,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  fetchCards: () => dispatch(cardActions.fetchCards()),
  fetchDetails: (locale: Locale) => dispatch(cardActions.fetchDetails(locale)),
  setCards: (leader: CardData[], normal: CardData[]) =>
    dispatch(cardActions.setCards(leader, normal)),
  setLocale: (locale: Locale) => dispatch(localeActions.setLocale(locale)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
