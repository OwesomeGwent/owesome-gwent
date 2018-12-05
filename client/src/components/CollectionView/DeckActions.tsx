import React from 'react';
import { Status } from '../../types/status';
import { Button } from '../Common';

export interface IDeckActionsProps {
  addDeck: () => void;
  starDeck: () => void;
  startDeckBuilding: () => void;
  addStatus: Status;
  starStatus: Status;
  loggedIn: boolean;
}
const DeckActions: React.SFC<IDeckActionsProps> = ({
  addDeck,
  starDeck,
  startDeckBuilding,
  addStatus,
  starStatus,
  loggedIn,
}) => {
  return (
    <div>
      <Button loading={starStatus === 'FETCHING'} onClick={starDeck}>
        Star
      </Button>
      {loggedIn && (
        <Button onClick={addDeck} loading={addStatus === 'FETCHING'}>
          Save Deck
        </Button>
      )}
      <Button onClick={startDeckBuilding}>Start deck building</Button>
    </div>
  );
};

export default DeckActions;
