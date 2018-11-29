import isEqual from 'lodash/isEqual';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardData } from '../../../shared/ICardData';
import * as DeckActions from '../actions/deck';
import * as FilterActions from '../actions/filter';
import { CardList } from '../components/CardFinder';
import { hasSpace } from '../helpers/card';
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
  deckLeader: CardData | undefined;
  deckMakerStatus: DeckMakerStatus;
  deckCards: CardData[];
  selectCard: (card: CardData) => void;
  setFilter: typeof FilterActions.setFilter;
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
  private observer: IntersectionObserver | undefined;
  private target = React.createRef<HTMLDivElement>();
  private prevTop: number = 0;
  public componentDidMount() {
    // ItersectionObserver 등록
    if (this.target.current) {
      const option = {
        root: null, // body scroll
        threshold: 0.1,
      };
      this.observer = new IntersectionObserver(this.handleObserver, option);
      this.observer.observe(this.target.current);
    }
    this.getNextPage(this.state.page);
  }
  public componentDidUpdate(prevProps: ICardListProps) {
    if (
      !isEqual(prevProps.filter, this.props.filter) ||
      prevProps.search !== this.props.search
    ) {
      this.getNextPage(0);
      // filter 변경시 scroll To Top
      window.scrollTo(0, 0);
    }
  }
  // 덱 빌딩 상태일때 카드를 추가하는 용도로 사용
  public onClickCard = (card: CardData) => (e: React.MouseEvent) => {
    const { deckCards, deckMakerStatus, selectCard, selectLeader } = this.props;
    if (deckMakerStatus === 'DECKMAKE') {
      if (card.cardType === 'Leader') {
        selectLeader(card);
        return;
      } else if (hasSpace(card, deckCards)) {
        // gold는 1개 bronze는 2개
        selectCard(card);
      }
    }
  };
  public handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const { top } = entry.boundingClientRect;
      // prevTop - 이전 scroll trigger position
      // top - 현재 scroll trigger position
      if (this.prevTop > top) {
        this.getNextPage(this.state.page);
      }
      this.prevTop = top;
    });
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
  public isAvailable = (card: CardData) => {
    return hasSpace(card, this.props.deckCards);
  };
  public render() {
    const { currentCards } = this.state;
    const { leaderFilteredCards, deckMakerStatus, deckLeader } = this.props;
    // 덱 빌딩 상태일때
    if (deckMakerStatus === 'DECKMAKE') {
      return (
        <div>
          <CardList
            title="Leaders"
            cards={leaderFilteredCards}
            isAvailable={this.isAvailable}
            onClickCard={this.onClickCard}
          />
          {deckLeader && (
            <CardList
              title="Cards"
              cards={currentCards}
              isAvailable={this.isAvailable}
              onClickCard={this.onClickCard}
            />
          )}
          <div ref={this.target} style={{ height: 100 }} />
        </div>
      );
    }
    // 조회 상태일때
    return (
      <div>
        <CardList
          title="Leaders"
          cards={leaderFilteredCards}
          isAvailable={this.isAvailable}
          onClickCard={this.onClickCard}
        />
        <CardList
          title="Cards"
          cards={currentCards}
          isAvailable={this.isAvailable}
          onClickCard={this.onClickCard}
        />
        <div ref={this.target} style={{ height: 100 }} />
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const getNormalFilteredCards = makeGetFilteredCards();
  const getLeaderFilteredCards = makeGetFilteredCards();
  const getNormalSearchedCards = makeGetSearchFilteredCards();
  const getLeaderSearchedCards = makeGetSearchFilteredCards();
  const mapState = (state: IRootState) => {
    return {
      deckLeader: state.deck.leader,
      deckCards: state.deck.cards,
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
  { ...DeckActions, ...FilterActions },
)(CardFinder);
