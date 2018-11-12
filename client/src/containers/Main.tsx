import React, { Component } from 'react';
import styled from 'styled-components';
import { CardList } from '../components';
import { CardData } from '../../../shared/ICardData';

const PER_PAGE = 40;
const Container = styled.div`
  flex: 1;
`;
export interface IMainProps {
  cardData: {
    leader: CardData[];
    normal: CardData[];
  };
}
interface IMainState {
  readonly cards: {
    leader: CardData[];
    normal: CardData[];
  };
  readonly page: number;
  readonly isLast: boolean;
}
class Main extends Component<IMainProps, IMainState> {
  state = {
    cards: {
      leader: [],
      normal: [],
    },
    page: 1,
    isLast: false,
  };
  componentDidMount() {
    const { normal } = this.props.cardData;
    const initCard = normal.slice(0, PER_PAGE);
    this.setState((state: IMainState) => ({
      ...state,
      cards: {
        ...state.cards,
        normal: initCard,
      },
    }));
  }
  handleFetchMore = () => {
    // 현재 filter에 맞는 데이터를 더 가져옴.
    const { page } = this.state;
    const { normal } = this.props.cardData;
    const next = Math.min((page + 1) * PER_PAGE, normal.length - 1);
    const cards = normal.slice(0, next);
    this.setState((state: IMainState) => ({
      cards: {
        ...state.cards,
        normal: cards,
      },
      page: page + 1,
      isLast: next >= normal.length - 1, // 임시
    }));
  };
  render() {
    const { cards, isLast } = this.state;
    return (
      <Container>
        {/* Filter */}
        <CardList
          cards={cards.normal}
          fetchMore={this.handleFetchMore}
          isLast={isLast}
        />
      </Container>
    );
  }
}

export default Main;
