import React from 'react';
import { Status } from '../../types/status';
import { AuthModal, Button } from '../Common';

export interface IDeckActionsProps {
  addDeck: () => void;
  starDeck: () => void;
  copyUrl: () => void;
  startDeckBuilding: () => void;
  addStatus: Status;
  starStatus: Status;
  loggedIn: boolean;
}
const DeckActions: React.SFC<IDeckActionsProps> = ({
  addDeck,
  starDeck,
  copyUrl,
  startDeckBuilding,
  addStatus,
  starStatus,
  loggedIn,
}) => {
  return (
    <AuthModal
      render={({ openLogin }) => (
        <>
          <Button
            color="#f6ad0d"
            loading={starStatus === 'FETCHING'}
            onClick={loggedIn ? starDeck : openLogin}
          >
            🌟 Star
          </Button>
          <Button color="#05ac7c" onClick={copyUrl}>
            Copy link
          </Button>
          <Button
            color="#048bfb"
            onClick={loggedIn ? addDeck : openLogin}
            loading={addStatus === 'FETCHING'}
          >
            Save Deck
          </Button>
          <Button onClick={startDeckBuilding}>Start deck building</Button>
        </>
      )}
    />
  );
};

export default DeckActions;
