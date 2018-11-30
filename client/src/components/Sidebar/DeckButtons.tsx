import React from 'react';
import { CardData } from '../../../../shared/ICardData';
import { Status } from '../../types/status';
import { Button } from '../Common';

export interface IDeckButtonsProps {
  addOrUpdateDeck: () => void;
  closeDeckBuilder: () => void;
  status: Status;
  loggedIn: boolean;
  leader: CardData | undefined;
}
const DeckButtons: React.SFC<IDeckButtonsProps> = ({
  addOrUpdateDeck,
  closeDeckBuilder,
  status,
  loggedIn,
  leader,
}) => (
  <>
    {loggedIn && leader && (
      <Button
        color="#048bfb"
        fullWidth
        onClick={addOrUpdateDeck}
        loading={status === 'FETCHING'}
      >
        Save Deck
      </Button>
    )}
    <Button color="#ce2c14" fullWidth onClick={closeDeckBuilder}>
      Close Deck builder
    </Button>
  </>
);

export default DeckButtons;
