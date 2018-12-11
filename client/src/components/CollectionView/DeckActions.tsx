import React from 'react';
import { Status } from '../../types/status';
import { IUser } from '../../types/user';
import { AuthModal, Button } from '../Common';
export interface IDeckActionsProps {
  addDeck: () => void;
  deleteDeck: () => void;
  starDeck: () => void;
  copyUrl: () => void;
  downloadSnapshot: () => void;
  startDeckBuilding: () => void;
  getImage: () => Promise<React.ReactNode>;
  user?: IUser;
  addStatus: Status;
  starStatus: Status;
  deleteStatus: Status;
  loggedIn: boolean;
  isCurrentUserDeck: boolean;
}
const DeckActions: React.SFC<IDeckActionsProps> = ({
  addDeck,
  deleteDeck,
  starDeck,
  copyUrl,
  downloadSnapshot,
  getImage,
  startDeckBuilding,
  addStatus,
  deleteStatus,
  starStatus,
  user,
  loggedIn,
  isCurrentUserDeck,
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
            Show 📸
          </Button>
          <Button color="#e48a3a" onClick={downloadSnapshot}>
            Download 📸
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
          {isCurrentUserDeck && (
            <Button
              color="#fa081f"
              onClick={deleteDeck}
              loading={deleteStatus === 'FETCHING'}
            >
              DELETE DECK
            </Button>
          )}
        </>
      )}
    />
  );
};

export default DeckActions;
