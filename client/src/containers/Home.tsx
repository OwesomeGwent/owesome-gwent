import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Main, Sidebar, Header } from '.';
import { FlipCard } from '../components';
import { CardData, CardDataList } from '../../../shared/ICardData';
import {
  CardLocaleData,
  CardLocaleDataList,
  Locale,
} from '../../../shared/ILocaleData';
import { IRootState } from '../reducers';
import * as cardActions from '../actions/card';
import * as localeActions from '../actions/locale';
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
function sortByProvision(a: CardData, b: CardData) {
  return a.provision - b.provision;
}
const getCurrentLocale = () => {
  const navigator: any = window.navigator;
  if (navigator.languages) {
    return navigator.languages[0];
  } else {
    return Locale['KR'];
  }
};
class Home extends Component<IHomeProps> {
  async componentDidMount() {
    let Cards: any;
    const locale = getCurrentLocale();
    const { fetchCards, fetchDetails, setCards, setLocale } = this.props;
    console.log(locale);
    await fetchCards();
    // 카드 스피너를 위한 delay 살짝~
    const { fetchStatus, rawCardData } = this.props;
    if (fetchStatus === 'ERROR') {
      Cards = await import('../data/cards.json');
    } else {
      Cards = rawCardData;
    }
    let [leader, normal] = Object.values(Cards).map(cards => {
      return Object.values(cards)
        .map(card => card)
        .slice()
        .sort(sortByProvision);
    });
    // let cardData: CardData[] = Object.keys(Cards).map(card => Cards[card]);
    // cardData = cardData.slice().sort(sortByProvision);
    setCards(leader, normal);
  }

  render() {
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
  rawCardData: state.card.rawCards.cards,
  fetchStatus: state.card.rawCards.status,
  cardData: state.card.cards,
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
