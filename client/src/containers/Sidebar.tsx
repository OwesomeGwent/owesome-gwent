import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import {
  CardLocaleDataList,
  CategoryLocaleDataList,
} from '../../../shared/ILocaleData';
import * as DeckActions from '../actions/deck';
import * as UserActions from '../actions/user';
import { Button } from '../components/Common';
import {
  CostList,
  DeckList,
  LeaderView,
  StateToggleBox,
} from '../components/Sidebar';
import { getDeckUrl } from '../helpers/urlMaker';
import { IRootState } from '../reducers';
import { ICardState } from '../reducers/card';
import { IDeckState } from '../reducers/deck';
import { getDeckCost, getParsedDeckCards } from '../selectors/deck';
import {
  getCardCategoryByLocale,
  getCardDetailByLocale,
} from '../selectors/locale';
import { getRandomLeader } from '../selectors/random';
import { DeckMakerStatus, IDeckCard, IDeckCost } from '../types/deck';
import { IDeck } from '../types/user';
interface ISidebarProps {
  randomLeader: CardData;
  loggedIn: boolean;
  currentDeck: IDeck;
  deck: IDeckState;
  deckCards: IDeckCard[];
  deckCost: IDeckCost;
  cardData: ICardState;
  detail: CardLocaleDataList;
  category?: CategoryLocaleDataList;
  addDeck: typeof UserActions.addDeck;
  updateDeck: typeof DeckActions.updateDeck;
  resetDeck: typeof DeckActions.resetDeck;
  setDeckMakerStatus: (status: DeckMakerStatus) => void;
  removeCard: (cardId: string) => void;
}
interface ISidebarState {
  deckName: string;
}
const Container = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
  margin-right: 20px;
`;
const Floating = styled.div`
  position: sticky;
  top: 70px;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
`;
const NoLeader = styled.h2`
  color: white;
`;
const DefaultMargin = styled.div`
  margin-top: 20px;
`;
const Label = styled.label`
  color: white;
`;
const DeckName = styled.input`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-sizing: border-box;
  text-align: center;
  color: white;
  min-height: 60px;
  font-size: 20px;
`;
class Sidebar extends Component<ISidebarProps, ISidebarState> {
  public state = {
    deckName: '',
  };
  public componentDidUpdate(prevProps: ISidebarProps) {
    if (prevProps.deck.currentDeck.name !== this.props.deck.currentDeck.name) {
      this.setState({
        deckName: this.props.deck.currentDeck.name,
      });
    }
  }
  public getDeckName = () => {
    const { deckName } = this.state;
    const { deck, detail } = this.props;
    if (!deckName && deck.leader) {
      return `${detail[deck.leader.ingameId].name} Deck`;
    }
    return deckName;
  };
  public handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      deckName: e.target.value,
    });
  };
  public closeDeckBuilder = () => {
    this.setState({
      deckName: '',
    });
    this.props.resetDeck();
  };
  public addOrUpdateDeck = () => {
    const { addDeck, updateDeck, currentDeck, deck } = this.props;
    const baseDeck = {
      name: this.getDeckName(),
      url: getDeckUrl(),
      leaderId: deck.leader!.ingameId,
    };
    if (currentDeck.id) {
      updateDeck({ ...baseDeck, id: currentDeck.id });
    } else {
      addDeck(baseDeck);
    }
  };
  public render() {
    const { deckName } = this.state;
    const {
      randomLeader: { variations },
      loggedIn,
      addDeck,
      deck,
      deckCards,
      deckCost,
      detail,
      setDeckMakerStatus,
      removeCard,
    } = this.props;
    if (detail === undefined) {
      return null;
    }
    if (deck.deckMakerStatus === 'INIT') {
      const randomLeaderImg = variations[Object.keys(variations)[0]].art;
      return (
        <Container>
          <Floating>
            <StateToggleBox
              backgroundLeader={randomLeaderImg}
              onToggle={() => setDeckMakerStatus('DECKMAKE')}
            />
          </Floating>
        </Container>
      );
    }
    return (
      <Container>
        <Floating>
          {deck.leader === undefined ? (
            <NoLeader>Choose Your Leader 👍</NoLeader>
          ) : (
            <LeaderView
              artId={deck.leader.variations[0].art}
              name={detail[deck.leader.ingameId].name}
            />
          )}
          <DefaultMargin>
            <Label htmlFor="deck_name">Deck Name</Label>
            <DeckName
              id="deck_name"
              placeholder={this.getDeckName()}
              value={deckName}
              onChange={this.handleNameChange}
            />
          </DefaultMargin>
          <CostList
            count={deckCards.length}
            craft={deckCost.craft}
            provision={deckCost.provision}
          />
          <DeckList cards={deckCards} detail={detail} removeCard={removeCard} />
          {loggedIn && deck.leader && (
            <Button color="#048bfb" fullWidth onClick={this.addOrUpdateDeck}>
              Save Deck
            </Button>
          )}
          <Button color="#ce2c14" fullWidth onClick={this.closeDeckBuilder}>
            Close Deck builder
          </Button>
        </Floating>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const detail = getCardDetailByLocale(state);
  const category = getCardCategoryByLocale(state);
  return {
    currentDeck: state.deck.currentDeck,
    randomLeader: getRandomLeader(state),
    loggedIn: state.user.loggedIn,
    deck: state.deck,
    deckCards: getParsedDeckCards(state),
    deckCost: getDeckCost(state),
    cardData: state.card,
    detail,
    category,
  };
};

export default connect(
  mapStateToProps,
  { ...DeckActions, ...UserActions },
)(Sidebar);
