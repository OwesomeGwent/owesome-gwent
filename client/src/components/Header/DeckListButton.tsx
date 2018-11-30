import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import React, { Component } from 'react';
import { DeckItem } from '.';
import * as DeckActions from '../../actions/deck';
import { Status } from '../../types/status';
import { IDeck } from '../../types/user';
import { Button } from '../Common';

export interface IDeckListProps {
  decks: IDeck[];
  setCurrentDeck: typeof DeckActions.setCurrentDeck;
  selectDeckUrl: typeof DeckActions.selectDeckUrl;
  fetchDecks: () => void;
  status: Status;
}
interface IDeckListState {
  open: boolean;
}
const paperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#222222',
  minWidth: 300,
  maxHeight: '80vh',
  overflowY: 'auto',
};
class DeckListButton extends Component<IDeckListProps, IDeckListState> {
  public state = {
    open: false,
  };
  public handleOpen = () => {
    this.setState({ open: true });
    this.props.fetchDecks();
  };
  public handleClose = () => this.setState({ open: false });
  public handleDeckClick = (deck: IDeck) => () => {
    this.props.selectDeckUrl(deck.url);
    this.props.setCurrentDeck(deck);
    this.handleClose();
  };
  public render() {
    const { open } = this.state;
    const { decks, status } = this.props;
    return (
      <>
        <Button onClick={this.handleOpen}>My Decks</Button>
        <Dialog
          PaperProps={{ style: paperStyle }}
          open={open}
          onClose={this.handleClose}
        >
          {status === 'SUCCESS' ? (
            decks.map(deck => (
              <DeckItem
                key={deck.id}
                handleDeckClick={this.handleDeckClick(deck)}
                {...deck}
              />
            ))
          ) : (
            <CircularProgress color="inherit" />
          )}
        </Dialog>
      </>
    );
  }
}

export default DeckListButton;
