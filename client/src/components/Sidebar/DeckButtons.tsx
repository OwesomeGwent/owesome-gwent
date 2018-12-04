import React from 'react';
import { CardData } from '../../../../shared/ICardData';
import { Status } from '../../types/status';
import { Button } from '../Common';
export interface IDeckButtonsProps {
  addOrUpdateDeck: () => void;
  closeDeckBuilder: () => void;
  copyDeckUrl: () => void;
  starDeck: () => void;
  status: Status;
  star?: number;
  isCurrentUserDeck: boolean;
  loggedIn: boolean;
  leader: CardData | undefined;
}
const DeckButtons: React.SFC<IDeckButtonsProps> = ({
  addOrUpdateDeck,
  closeDeckBuilder,
  copyDeckUrl,
  star,
  starDeck,
  status,
  isCurrentUserDeck,
  loggedIn,
  leader,
}) => (
  <>
    <Button color="#05ac7c" fullWidth onClick={copyDeckUrl}>
      Copy Url
    </Button>
    {loggedIn && !isCurrentUserDeck && (
      <Button onClick={starDeck}>{star} 🌟 Give a star!</Button>
    )}
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
