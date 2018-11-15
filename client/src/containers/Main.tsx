import React, { Component } from 'react';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import { CardList, Filter } from '../components/Main';

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
  public state = {
    cards: {
      leader: [],
      normal: [],
    },
    isLast: false,
    page: 1,
  };
  public componentDidMount() {
    const { normal, leader } = this.props.cardData;
    const initCard = normal.slice(0, PER_PAGE);
    this.setState((state: IMainState) => ({
      ...state,
      cards: {
        leader,
        normal: initCard,
      },
    }));
  }
  public handleFetchMore = () => {
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
      isLast: next >= normal.length - 1, // 임시
      page: page + 1,
    }));
  };
  public render() {
    const { cards, isLast } = this.state;
    return (
      <Container>
        <Filter />
        <CardList cards={cards.leader} type="leader" />
        <CardList
          cards={cards.normal}
          type="normal"
          fetchMore={this.handleFetchMore}
          isLast={isLast}
        />
      </Container>
    );
  }
}

export default Main;
