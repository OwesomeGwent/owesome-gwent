import React from 'react';
import { CardData } from '../../../../shared/ICardData';
import { Status } from '../../types/status';
import { AuthModal, Button } from '../Common';
export interface IDeckButtonsProps {
  addOrUpdateDeck: () => void;
  closeDeckBuilder: () => void;
  copyDeckUrl: () => void;
  status: Status;
  loggedIn: boolean;
  leader: CardData | undefined;
}
const DeckButtons: React.SFC<IDeckButtonsProps> = ({
  addOrUpdateDeck,
  closeDeckBuilder,
  copyDeckUrl,
  status,
  loggedIn,
  leader,
}) => (
  <AuthModal
    render={({ openLogin }) => (
      <>
        <Button color="#05ac7c" fullWidth onClick={copyDeckUrl}>
          Copy Url
        </Button>
        {leader && (
          <Button
            color="#048bfb"
            fullWidth
            onClick={loggedIn ? addOrUpdateDeck : openLogin}
            loading={status === 'FETCHING'}
          >
            Save Deck
          </Button>
        )}
        <Button color="#ce2c14" fullWidth onClick={closeDeckBuilder}>
          Close Deck builder
        </Button>
      </>
    )}
  />
);

export default DeckButtons;
