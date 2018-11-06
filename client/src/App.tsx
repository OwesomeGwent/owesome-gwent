import React, { Component } from 'react';
import styled from 'styled-components';
import { Main, Sidebar } from './containers';
import { FlipCard } from './components';
import { ICard } from './types/card';

const AppContainer = styled.div`
  display: flex;
`;
// type Partial<T> = { [K in keyof T]?: T[K] };
class App extends Component {
  state = {
    cardData: [],
    isLoading: true,
  };
  async componentDidMount() {
    // 전체 카드 데이터 어디다 저장할 지 생각해봐야 할듯.
    // 일단 임시
    const [CARDS]: any = await Promise.all([
      import('./data/cards.json'),
      new Promise(res => setTimeout(res, 2000)),
    ]);
    let cardData: ICard[] = Object.keys(CARDS).map(
      card => CARDS[card] as ICard,
    );
    cardData = cardData.slice().sort((a: ICard, b: ICard) => {
      return a.provision - b.provision;
    });
    this.setState({
      cardData,
      isLoading: false,
    });
  }
  render() {
    const { cardData, isLoading } = this.state;
    if (isLoading) {
      return <FlipCard />;
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
