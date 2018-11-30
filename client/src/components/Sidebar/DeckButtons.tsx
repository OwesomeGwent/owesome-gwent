import React from 'react';
import { CardData } from '../../../../shared/ICardData';
import { Button } from '../Common';

export interface IDeckButtonsProps {
  addOrUpdateDeck: () => void;
  closeDeckBuilder: () => void;
  loggedIn: boolean;
  leader: CardData | undefined;
}
const DeckButtons: React.SFC<IDeckButtonsProps> = ({
  addOrUpdateDeck,
  closeDeckBuilder,
  loggedIn,
  leader,
}) => (
  <>
    {loggedIn && leader && (
      <Button color="#048bfb" fullWidth onClick={addOrUpdateDeck}>
        Save Deck
      </Button>
    )}
    <Button color="#ce2c14" fullWidth onClick={closeDeckBuilder}>
      Close Deck builder
    </Button>
  </>
);

export default DeckButtons;
