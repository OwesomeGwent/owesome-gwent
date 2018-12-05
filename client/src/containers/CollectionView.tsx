import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { CardLocaleDataList } from '../../../shared/ILocaleData';
import * as DeckActions from '../actions/deck';
import { DeckDetail, DeckList, DeckTitle } from '../components/CollectionView';
import { sortByProvision } from '../helpers/card';
import { getDeckCost, makeDeckCards } from '../helpers/deck';
import { parseUrl } from '../helpers/deckUrl';
import { IRootState } from '../reducers';
import { getCardDetailByLocale } from '../selectors/locale';
import { IDeck, IDeckCard, IDeckCost } from '../types/deck';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;
const Header = styled.h2`
  color: #fefefe;
  text-align: center;
`;
const List = styled.div`
  flex-basis: 400px;
`;
const Detail = styled.div`
  flex: 1;
`;
interface ICollectionViewState {
  parsed: boolean;
  leader: CardData | undefined;
  cards: IDeckCard[];
  cost: IDeckCost;
}
export interface ICollectionView extends RouteComponentProps {
  rawCards: CardDataList;
  deck: IDeck | undefined;
  detail: CardLocaleDataList;
  status: Status;
  error: string;
  fetchDeck: (deckId: string) => void;
}
class CollectionView extends React.Component<
  ICollectionView,
  ICollectionViewState
> {
  public state: ICollectionViewState = {
    parsed: false,
    leader: undefined,
    cards: [],
    cost: {
      provision: 0,
      count: 0,
      craft: 0,
    },
  };
  public async componentDidMount() {
    const { params } = this.props.match;
    if (params) {
      const { deckId } = params as { deckId: string };
      await this.props.fetchDeck(deckId);
      const { deck, status, rawCards } = this.props;
      if (deck && status === 'SUCCESS') {
        const [leaderId, cardIds] = parseUrl(deck.url);
        const leader = rawCards.leader[leaderId!];
        const cards = cardIds
          .map(cardId => rawCards.normal[cardId])
          .slice()
          .sort(sortByProvision);
        // count 있음
        const deckCards = makeDeckCards(cards);
        const cost = getDeckCost(deckCards);
        this.setState({
          parsed: true,
          leader,
          cards: deckCards,
          cost,
        });
      }
    }
  }
  public render() {
    const { parsed, leader, cards, cost } = this.state;
    const { deck, detail } = this.props;
    if (!parsed) {
      return null;
    }
    if (!leader || !deck) {
      return null;
    }
    return (
      <Container>
        <DeckTitle leader={leader} {...deck} />
        <List>
          <Header>List</Header>
          <DeckList cards={cards} detail={detail} />
        </List>
        <Detail>
          <Header>Detail</Header>
          <DeckDetail cards={cards} cost={cost} />
        </Detail>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  rawCards: state.card.rawCards.cards,
  deck: state.deck.fetch.deck,
  detail: getCardDetailByLocale(state),
  status: state.deck.fetch.status,
  error: state.deck.fetch.error,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  fetchDeck: (deckId: string) => dispatch(DeckActions.fetchDeck(deckId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
