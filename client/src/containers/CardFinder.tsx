import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardData } from '../../../shared/ICardData';
import { CardList } from '../components/CardFinder';
import { IRootState } from '../reducers';
import { makeGetFilteredCards } from '../selectors/card';
import { IFilter } from '../types/filter';

// TODO: Debounce 줄까말까..

const PER_PAGE = 40;
export interface ICardListProps {
  filter?: IFilter;
  normalFilteredCards?: CardData[];
  leaderFilteredCards?: CardData[];
}
interface ICardListState {
  currentCards: CardData[];
  page: number;
  isLast: boolean;
}
class CardFinder extends Component<ICardListProps, ICardListState> {
  public state = {
    currentCards: [],
    page: 0,
    isLast: false,
  };
  public componentDidMount() {
    this.getNextPage(this.state.page);
  }
  public componentDidUpdate(prevProps: ICardListProps) {
    if (!isEqual(prevProps.filter, this.props.filter)) {
      this.getNextPage(0);
    }
  }
  public handleScroll = (e: React.UIEvent) => {
    const target = e.currentTarget;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 300) {
      this.getNextPage(this.state.page);
    }
  };
  public getNextPage = (page: number) => {
    const { normalFilteredCards } = this.props;
    if (normalFilteredCards) {
      const next = Math.min(
        (page + 1) * PER_PAGE,
        normalFilteredCards.length - 1,
      );
      const cards = normalFilteredCards.slice(0, next);
      this.setState((state: ICardListState) => ({
        currentCards: cards,
        isLast: next >= normalFilteredCards.length - 1,
        page: page + 1,
      }));
    }
  };
  public render() {
    const { isLast, currentCards } = this.state;
    const { leaderFilteredCards } = this.props;
    return (
      <div
        style={{ overflowY: 'auto', maxHeight: '100vh' }}
        onScroll={isLast ? () => null : this.handleScroll}
      >
        <CardList title="Leaders" cards={leaderFilteredCards} />
        <CardList title="Cards" cards={currentCards} />
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getNormalFilteredCards = makeGetFilteredCards();
  const getLeaderFilteredCards = makeGetFilteredCards();
  const mapState = (state: IRootState, props: ICardListProps) => ({
    filter: state.filter.filter,
    leaderFilteredCards: getLeaderFilteredCards(state, 'leader'),
    normalFilteredCards: getNormalFilteredCards(state, 'normal'),
  });
  return mapState;
};
export default connect(makeMapStateToProps)(CardFinder);
