import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { CardData, CardDataList } from '../../../shared/ICardData';
import { CardLocaleDataList } from '../../../shared/ILocaleData';
import * as DeckAction from '../actions/deck';
import {
  DeckActions,
  DeckDetail,
  DeckInfo,
  DeckTitle,
} from '../components/CollectionView';
import { FullDeckList, Snapshot } from '../components/Common';
import { sortByProvision } from '../helpers/card';
import { getDeckCost, makeDeckCards } from '../helpers/deck';
import { copyUrl, parseUrl } from '../helpers/deckUrl';
import { history } from '../helpers/history';
import { notify } from '../helpers/notify';
import { IRootState } from '../reducers';
import { getCardDetailByLocale } from '../selectors/locale';
import { IAddDeck, IDeck, IDeckCard, IDeckCost } from '../types/deck';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';
import { IUser } from '../types/user';

const Container = styled.div`
  width: 100%;
`;
const NoDeck = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1rem;
  color: #fefefe;
  font-size: 24px;
  font-weight: 600;
`;
const Header = styled.div`
  width: 100%;
`;
const Action = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;
const MainHeader = styled.h2`
  color: #fefefe;
  text-align: center;
`;
const List = styled.div`
  flex-basis: 300px;
  margin-right: 20px;
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
  addStatus: Status;
  deleteStatus: Status;
  starStatus: Status;
  loggedIn: boolean;
  rawCards: CardDataList;
  user: IUser | undefined;
  deck: IDeck | undefined;
  detail: CardLocaleDataList;
  status: Status;
  starError: string;
  error: string;
  addDeck: (deck: IAddDeck) => void;
  deleteDeck: (deckId: string) => void;
  starDeck: (deckId: string) => void;
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
  public addDeck = async () => {
    const { cost, leader } = this.state;
    const { addDeck, deck, loggedIn } = this.props;
    if (!deck || !leader || !loggedIn) {
      return;
    }
    const { name, faction, leaderId, url } = deck;
    const deckToAdd = {
      name,
      faction,
      leaderId,
      url,
      cost,
    };
    await addDeck(deckToAdd);
    const hasError = this.props.addStatus !== 'SUCCESS';
    const message = hasError
      ? 'Fail to save deck. Try again'
      : '👌 Deck saved!';
    const type = hasError ? 'error' : 'success';
    notify.notify({ message, type });
  };
  public deleteDeck = async () => {
    const { deck, deleteDeck } = this.props;
    if (!deck) {
      return;
    }
    await deleteDeck(deck.id);
    const hasError = this.props.deleteStatus !== 'SUCCESS';
    const message = hasError
      ? 'Fail to delete deck. Try again'
      : '👌 Deck deleted!';
    const type = hasError ? 'error' : 'success';
    notify.notify({ message, type });
    if (!hasError) {
      history.goBack();
    }
  };
  public starDeck = async () => {
    const { deck, starDeck } = this.props;
    if (!deck) {
      return;
    }
    const { id } = deck;
    await starDeck(id);
    const hasError = this.props.starStatus !== 'SUCCESS';
    const message = hasError ? this.props.starError : '🌟 Starred!';
    const type = hasError ? 'error' : 'success';
    notify.notify({ message, type });
  };
  public copyUrl = () => {
    const success = copyUrl();
    const type = success ? 'success' : 'error';
    const message = success ? '🔗 Copied!' : 'Fail to copy link. Try again.';
    notify.notify({
      message,
      type,
    });
  };
  public startDeckBuilding = () => {
    const { deck } = this.props;
    if (!deck) {
      return;
    }
    history.push(`/${deck.url}`);
  };
  public render() {
    const { parsed, leader, cards, cost } = this.state;
    const {
      addStatus,
      starStatus,
      deleteStatus,
      user,
      deck,
      detail,
      loggedIn,
    } = this.props;
    if (!parsed) {
      return null;
    }
    if (!leader || !deck) {
      return (
        <NoDeck>
          <h2>Can not find this deck.</h2>
        </NoDeck>
      );
    }
    const isCurrentUserDeck = !!user && user.id === deck.userId;
    return (
      <Snapshot>
        {({ downloadSnapshot, getImage, wrapper }) => (
          <Container>
            <Header>
              <Action>
                <DeckActions
                  addStatus={addStatus}
                  starStatus={starStatus}
                  addDeck={this.addDeck}
                  starDeck={this.starDeck}
                  copyUrl={this.copyUrl}
                  deleteDeck={this.deleteDeck}
                  deleteStatus={deleteStatus}
                  downloadSnapshot={() => downloadSnapshot(deck.name)}
                  getImage={getImage}
                  startDeckBuilding={this.startDeckBuilding}
                  loggedIn={loggedIn}
                  user={user}
                  isCurrentUserDeck={isCurrentUserDeck}
                />
              </Action>
              <DeckTitle leader={leader} {...deck} />
              <DeckInfo {...deck} />
            </Header>
            <Main>
              <List>
                <MainHeader>List</MainHeader>
                {wrapper(
                  <FullDeckList
                    cards={cards}
                    detail={detail}
                    leader={leader}
                    cost={cost}
                  />,
                )}
              </List>
              <Detail>
                <MainHeader>Detail</MainHeader>
                <DeckDetail {...leader} cards={cards} cost={cost} />
              </Detail>
            </Main>
          </Container>
        )}
      </Snapshot>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  addStatus: state.deck.add.status,
  starStatus: state.deck.star.status,
  deleteStatus: state.deck.delete.status,
  starError: state.deck.star.error,
  loggedIn: state.user.loggedIn,
  rawCards: state.card.rawCards.cards,
  user: state.user.user,
  deck: state.deck.fetch.deck,
  detail: getCardDetailByLocale(state),
  status: state.deck.fetch.status,
  error: state.deck.fetch.error,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  addDeck: (deck: IAddDeck) => dispatch(DeckAction.addDeck(deck)),
  deleteDeck: (deckId: string) => dispatch(DeckAction.deleteDeck(deckId)),
  starDeck: (deckId: string) => dispatch(DeckAction.starDeck(deckId)),
  fetchDeck: (deckId: string) => dispatch(DeckAction.fetchDeck(deckId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
