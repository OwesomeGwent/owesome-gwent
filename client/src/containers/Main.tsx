import React, { Component } from 'react';
import styled from 'styled-components';
import { CardList } from '../components';
import { CardData } from '../../../shared/ICardData';

const PER_PAGE = 40;
const Container = styled.div`
  flex: 1;
`;
export interface IMainProps {
  cardData: CardData[];
}
interface IMainState {
  readonly cards: CardData[];
  readonly page: number;
  readonly isLast: boolean;
}
class Main extends Component<IMainProps, IMainState> {
  state = {
    cards: [],
    page: 1,
    isLast: false,
  };
  componentDidMount() {
    const initCard = this.props.cardData.slice(0, PER_PAGE);
    this.setState({
      cards: initCard,
    });
  }
  handleFetchMore = () => {
    // 현재 filter에 맞는 데이터를 더 가져옴.
    const { page } = this.state;
    const { cardData } = this.props;
    const next = Math.min((page + 1) * PER_PAGE, cardData.length - 1);
    const cards = cardData.slice(0, next);
    this.setState({
      cards,
      page: page + 1,
      isLast: next >= cardData.length - 1, // 임시
    });
  };
  render() {
    const { cards, isLast } = this.state;
    return (
      <Container>
        {/* Filter */}
        <CardList
          cards={cards}
          fetchMore={this.handleFetchMore}
          isLast={isLast}
        />
      </Container>
    );
  }
}

export default Main;
