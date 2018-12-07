import React from 'react';
import { Status } from '../../types/status';
import { AuthModal, Button } from '../Common';

export interface IDeckActionsProps {
  addDeck: () => void;
  starDeck: () => void;
  copyUrl: () => void;
  downloadSnapshot: () => void;
  startDeckBuilding: () => void;
  getImage: () => Promise<React.ReactNode>;
  addStatus: Status;
  starStatus: Status;
  loggedIn: boolean;
}
const DeckActions: React.SFC<IDeckActionsProps> = ({
  addDeck,
  starDeck,
  copyUrl,
  downloadSnapshot,
  getImage,
  startDeckBuilding,
  addStatus,
  starStatus,
  loggedIn,
}) => {
  return (
    <AuthModal
      render={({ openLogin, openModal }) => (
        <>
          <Button
            color="#f6ad0d"
            loading={starStatus === 'FETCHING'}
            onClick={loggedIn ? starDeck : openLogin}
          >
            🌟 Star
          </Button>
          <Button
            color="#e48a3a"
            onClick={async () => openModal(await getImage())}
          >
            📸 Show Image Snapshot
          </Button>
          <Button color="#e48a3a" onClick={downloadSnapshot}>
            📸 Download Image Snapshot
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
