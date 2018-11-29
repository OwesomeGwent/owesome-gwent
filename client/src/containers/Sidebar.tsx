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
import {
  DeckList,
  DefaultImageBox,
  StateToggleBox,
} from '../components/Sidebar';
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

interface ISidebarProps {
  randomLeader: CardData;
  loggedIn: boolean;
  deck: IDeckState;
  deckCards: IDeckCard[];
  deckCost: IDeckCost;
  cardData: ICardState;
  detail: CardLocaleDataList;
  category?: CategoryLocaleDataList;
  addDeck: typeof UserActions.addDeck;
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
`;
const Floating = styled.div`
  position: sticky;
  top: 65px;
`;
const NoLeader = styled.div`
  height: 100px;
  background: rgba(0, 0, 0, 0.2);
`;
const LeaderView = styled(DefaultImageBox)`
  height: 100px;
  filter: blur(1px);
  display: flex;
`;
const CostView = styled.div`
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeckName = styled.input`
  width: 100%;
  background-color: inherit;
  border: none;
  text-align: center;
  color: white;
  min-height: 60px;
  font-size: 20px;
`;
const Reset = styled.div`
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
class Sidebar extends Component<ISidebarProps> {
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

  public getDeckUrl = () => window.location.pathname.slice(1);
  public handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      deckName: e.target.value,
    });
  };
  public clear = () => {
    this.setState({
      deckname: '',
    });
    this.props.resetDeck();
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
            <NoLeader>Choose Your Leader</NoLeader>
          ) : (
            <LeaderView backgroundCard={deck.leader.variations[0].art}>
              {detail[deck.leader.ingameId] &&
                detail[deck.leader.ingameId].name}
            </LeaderView>
          )}
          <DeckName
            placeholder={this.getDeckName()}
            value={deckName}
            onChange={this.handleNameChange}
          />
          <CostView>
            <span>craft: {deckCost.craft} </span>
            <span>provision: {deckCost.provision}</span>
          </CostView>
          <DeckList cards={deckCards} detail={detail} removeCard={removeCard} />
          {loggedIn && deck.leader && (
            <button
              onClick={() =>
                addDeck({
                  name: this.getDeckName(),
                  url: this.getDeckUrl(),
                  leaderId: deck.leader!.ingameId,
                })
              }
            >
              Save Deck
            </button>
          )}
          <Reset onClick={this.clear}>Clear</Reset>
        </Floating>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const detail = getCardDetailByLocale(state);
  const category = getCardCategoryByLocale(state);
  return {
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
