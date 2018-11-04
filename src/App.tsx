import React, { Component } from 'react';
import styled from 'styled-components';
import { Main, Sidebar } from './containers';
import { ICard } from './types/card';

const AppContainer = styled.div`
  display: flex;
`;
// type Partial<T> = { [K in keyof T]?: T[K] };
let CARDS: any;
class App extends Component {
  state = {
    cardData: [],
    isLoading: true,
  };
  async componentDidMount() {
    // 전체 카드 데이터 어디다 저장할 지 생각해봐야 할듯.
    // 일단 임시
    CARDS = await import('./data/cards.json');
    CARDS = Object.keys(CARDS).map(card => CARDS[card]);
    this.setState({
      cardData: CARDS,
      isLoading: false,
    });
  }
  render() {
    const { cardData, isLoading } = this.state;
    if (isLoading) {
      return <div>Loading cards...</div>;
    }
    return (
      <AppContainer>
        <Sidebar />
        <Main cardData={cardData as ICard[]} />
      </AppContainer>
    );
  }
}

export default App;
