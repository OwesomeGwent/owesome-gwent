import React, { Component } from 'react';
import styled from 'styled-components';
import { Main, Sidebar } from './containers';
import { FlipCard } from './components';
import { ICard } from './types/card';

const TEMP_API = '/api/defs';
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
    // 일단 임시
    const [response] = await Promise.all([
      fetch(`${TEMP_API}/card-data`),
      new Promise(res => setTimeout(res, 5000)),
    ]);
    const CARDS: any = (await response.json()).data;
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
        <Main cardData={cardData as ICard[]} />
      </AppContainer>
    );
  }
}

export default App;
