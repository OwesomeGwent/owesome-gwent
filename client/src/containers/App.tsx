import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Main, Sidebar } from '.';
import { FlipCard } from '../components';
import { CardData, RawCardData } from '../../../shared/ICardData';
import { IRootState } from '../reducers';
import * as cardActions from '../actions/card';
import { ThunkFunc } from '../types/thunk';
import delay from '../helpers/delay';

const AppContainer = styled.div`
  display: flex;
`;
export interface IAppProps {
  cardData: CardData[];
  rawCardData: RawCardData;
  fetchStatus: string;
  fetchCards: () => void;
  setCards: (cards: CardData[]) => void;
}
function sortByProvision(a: CardData, b: CardData) {
  return a.provision - b.provision;
}
class App extends Component<IAppProps> {
  async componentDidMount() {
    let Cards: any;
    const { fetchCards, setCards } = this.props;
    await fetchCards();
    // 카드 스피너를 위한 delay 살짝~
    const { fetchStatus, rawCardData } = this.props;
    if (fetchStatus === 'ERROR') {
      Cards = await import('../data/cards.json');
    } else {
      Cards = rawCardData;
    }
    let cardData: CardData[] = Object.keys(Cards).map(card => Cards[card]);
    cardData = cardData.slice().sort(sortByProvision);
    setCards(cardData);
  }

  render() {
    const { cardData } = this.props;
    // flag 설정 필요?
    if (cardData.length <= 0) {
      return (
        <>
          <h2 style={{ textAlign: 'center' }}>Fetching Card Data...</h2>
          <FlipCard />
        </>
      );
    }
    return (
      <AppContainer>
        <Sidebar />
        <Main cardData={cardData} />
      </AppContainer>
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
  setCards: (cards: CardData[]) => dispatch(cardActions.setCards(cards)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
