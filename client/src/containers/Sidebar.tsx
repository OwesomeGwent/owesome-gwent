import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import {
  CardLocaleDataList,
  CategoryLocaleDataList,
} from '../../../shared/ILocaleData';
import * as DeckActions from '../actions/deck';
import { FullDeckList, Snapshot } from '../components/Common';
import {
  DeckButtons,
  FloatingBox,
  StateToggleBox,
} from '../components/Sidebar';
import { checkDeckCost } from '../helpers/deck';
import { copyUrl, getDeckUrl } from '../helpers/deckUrl';
import { history } from '../helpers/history';
import { notify } from '../helpers/notify';
import { IRootState } from '../reducers';
import { ICardState } from '../reducers/card';
import { IDeckState } from '../reducers/deck';
import { getDeckCost, getParsedDeckCards } from '../selectors/deck';
import {
  getCardCategoryByLocale,
  getCardDetailByLocale,
} from '../selectors/locale';
import { getRandomLeader } from '../selectors/random';
import {
  DeckMakerStatus,
  IAddDeck,
  IDeck,
  IDeckCard,
  IDeckCost,
} from '../types/deck';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';

interface ISidebarProps {
  addStatus: Status;
  deckUrl: string;
  updateStatus: Status;
  randomLeader: CardData;
  loggedIn: boolean;
  currentDeck: IDeck;
  deck: IDeckState;
  deckCards: IDeckCard[];
  deckCost: IDeckCost;
  cardData: ICardState;
  detail: CardLocaleDataList;
  category?: CategoryLocaleDataList;
  addDeck: (deck: IAddDeck) => void;
  updateDeck: (deck: IDeck) => void;
  resetDeck: () => void;
  selectDeckUrl: (url: string) => void;
  setDeckMakerStatus: (status: DeckMakerStatus) => void;
  removeCard: (cardId: string) => void;
}
interface ISidebarState {
  deckName: string;
}
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
  margin-bottom: 20px;
`;
class Sidebar extends Component<ISidebarProps, ISidebarState> {
  public state = {
    deckName: '',
  };
  public componentDidMount() {
    this.props.resetDeck();
    this.props.selectDeckUrl(this.props.deckUrl || '');
  }
  public componentDidUpdate(prevProps: ISidebarProps) {
    if (prevProps.deckUrl !== this.props.deckUrl) {
      this.props.selectDeckUrl(this.props.deckUrl);
    }
  }
  public getDeckName = () => {
    const { deckName } = this.state;
    const { deck, detail, currentDeck } = this.props;
    if (deckName) {
      return deckName;
    }
    if (currentDeck.name) {
      return currentDeck.name;
    }
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
  public addOrUpdateDeck = async () => {
    // 현재 deck의 id가 있을 경우 update. 아니면 add.
    const { addDeck, updateDeck, currentDeck, deck, deckCost } = this.props;
    const baseDeck = {
      name: this.getDeckName(),
      url: getDeckUrl(),
      leaderId: deck.leader!.ingameId,
      faction: deck.leader!.faction,
      completed: checkDeckCost(deckCost.count, deckCost.provision),
    };
    let hasError = false;
    if (currentDeck.id) {
      await updateDeck({
        ...baseDeck,
        id: currentDeck.id,
      });
      hasError = this.props.updateStatus === 'FAILURE';
    } else {
      await addDeck(baseDeck);
      hasError = this.props.addStatus === 'FAILURE';
    }
    const message = hasError
      ? 'Fail to save deck. Try again'
      : '👌 Deck saved!';
    const type = hasError ? 'error' : 'success';
    notify.notify({ message, type });
  };
  public closeDeckBuilder = () => {
    history.push('/');
  };
  public copyDeckUrl = () => {
    const success = copyUrl();
    const type = success ? 'success' : 'error';
    const message = success ? '🔗 Copied!' : 'Fail to copy link. Try again.';
    notify.notify({
      message,
      type,
    });
  };
  public render() {
    const { deckName } = this.state;
    const {
      addStatus,
      updateStatus,
      randomLeader: { variations },
      currentDeck,
      loggedIn,
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
        <FloatingBox>
          <StateToggleBox
            backgroundLeader={randomLeaderImg}
            onToggle={() => setDeckMakerStatus('DECKMAKE')}
          />
        </FloatingBox>
      );
    }
    return (
      <FloatingBox>
        <Label htmlFor="deck_name">Deck Name</Label>
        <DeckName
          id="deck_name"
          placeholder={this.getDeckName()}
          value={deckName}
          onChange={this.handleNameChange}
        />
        <Snapshot>
          {({ downloadSnapshot, getImage, wrapper }) => (
            <>
              {wrapper(
                <FullDeckList
                  cards={deckCards}
                  cost={deckCost}
                  detail={detail}
                  leader={deck.leader}
                  onCardClick={removeCard}
                />,
              )}
              <DeckButtons
                status={currentDeck.id ? updateStatus : addStatus}
                addOrUpdateDeck={this.addOrUpdateDeck}
                closeDeckBuilder={this.closeDeckBuilder}
                copyDeckUrl={this.copyDeckUrl}
                downloadSnapshot={() => downloadSnapshot(this.getDeckName())}
                getImage={getImage}
                loggedIn={loggedIn}
                leader={deck.leader}
              />
            </>
          )}
        </Snapshot>
      </FloatingBox>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  const detail = getCardDetailByLocale(state);
  const category = getCardCategoryByLocale(state);
  return {
    addStatus: state.deck.add.status,
    updateStatus: state.deck.update.status,
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
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  addDeck: (deck: IAddDeck) => dispatch(DeckActions.addDeck(deck)),
  updateDeck: (deck: IDeck) => dispatch(DeckActions.updateDeck(deck)),
  resetDeck: () => dispatch(DeckActions.resetDeck()),
  setDeckMakerStatus: (status: DeckMakerStatus) =>
    dispatch(DeckActions.setDeckMakerStatus(status)),
  selectDeckUrl: (url: string) => dispatch(DeckActions.selectDeckUrl(url)),
  removeCard: (cardId: string) => dispatch(DeckActions.removeCard(cardId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
