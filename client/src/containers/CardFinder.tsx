import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardData } from '../../../shared/ICardData';
import * as DeckActions from '../actions/deck';
import { CardList } from '../components/CardFinder';
import { IRootState } from '../reducers';
import {
  makeGetFilteredCards,
  makeGetSearchFilteredCards,
} from '../selectors/card';
import { DeckMakerStatus } from '../types/deck';
import { IFilter } from '../types/filter';

// TODO: Debounce 줄까말까..

const PER_PAGE = 40;
export interface ICardListProps {
  filter: IFilter;
  search: string;
  normalFilteredCards: CardData[];
  leaderFilteredCards: CardData[];
  // deck
  deckMakerStatus: DeckMakerStatus;
  selectCard: (card: CardData) => void;
  selectLeader: (card: CardData) => void;
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
    document.addEventListener('scroll', this.handleScroll);
    this.getNextPage(this.state.page);
  }
  public componentDidUpdate(prevProps: ICardListProps) {
    if (
      !isEqual(prevProps.filter, this.props.filter) ||
      prevProps.search !== this.props.search
    ) {
      this.getNextPage(0);
    }
  }

  // 덱 빌딩 상태일때 카드를 추가하는 용도로 사용
  public onClickCard = (card: CardData) => (e: React.MouseEvent) => {
    const { deckMakerStatus, selectLeader } = this.props;
    if (deckMakerStatus === 'DECKMAKE') {
      selectLeader(card);
    }
  };

  public handleScroll = () => {
    const { documentElement } = document;
    if (documentElement) {
      const { scrollTop, clientHeight, scrollHeight } = documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        this.getNextPage(this.state.page);
      }
    }
  };

  public getNextPage = (page: number) => {
    const { normalFilteredCards } = this.props;
    if (normalFilteredCards) {
      const next = Math.min((page + 1) * PER_PAGE, normalFilteredCards.length);
      const cards = normalFilteredCards.slice(0, next);
      this.setState((state: ICardListState) => ({
        currentCards: cards,
        isLast: next >= normalFilteredCards.length - 1,
        page: page + 1,
      }));
    }
  };

  public render() {
    const { currentCards } = this.state;
    const { leaderFilteredCards, deckMakerStatus } = this.props;
    // 덱 빌딩 상태일때
    if (deckMakerStatus === 'DECKMAKE') {
      return (
        <CardList
          title="Leaders"
          cards={leaderFilteredCards}
          onClickCard={this.onClickCard}
        />
      );
    }
    // 조회 상태일때
    return (
      <div>
        <CardList
          title="Leaders"
          cards={leaderFilteredCards}
          onClickCard={this.onClickCard}
        />
        <CardList
          title="Cards"
          cards={currentCards}
          onClickCard={this.onClickCard}
        />
      </div>
    );
  }
}

interface IMapState {
  deckMakerStatus: DeckMakerStatus;
  filter: IFilter;
  search: string;
  leaderFilteredCards: CardData[];
  normalFilteredCards: CardData[];
}
const makeMapStateToProps = () => {
  const getNormalFilteredCards = makeGetFilteredCards();
  const getLeaderFilteredCards = makeGetFilteredCards();
  const getNormalSearchedCards = makeGetSearchFilteredCards();
  const getLeaderSearchedCards = makeGetSearchFilteredCards();
  const mapState = (state: IRootState) => {
    return {
      deckMakerStatus: state.deck.deckMakerStatus,
      filter: state.filter.filter,
      search: state.filter.search,
      leaderFilteredCards: getLeaderSearchedCards(
        state,
        getLeaderFilteredCards(state, 'leader'),
      ),
      normalFilteredCards: getNormalSearchedCards(
        state,
        getNormalFilteredCards(state, 'normal'),
      ),
    };
  };
  return mapState;
};
export default connect(
  makeMapStateToProps,
  { ...DeckActions },
)(CardFinder);
