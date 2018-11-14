import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import * as DeckActions from '../actions/deck';
import { DeckList, StateToggleBox } from '../components/Sidebar';
import randomPicker from '../helpers/randomPicker';
import { IRootState } from '../reducers';
import { IDeckState } from '../reducers/deck';

interface ISidebarProps {
  randomLeader: CardData;
  deck: IDeckState;
  setDeckMakerStatus(status: DeckActions.DeckMakerStatus): void;
}

const Container = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
`;

const Sidebar: React.SFC<ISidebarProps> = ({
  randomLeader: { variations },
  deck,
  setDeckMakerStatus,
}) => {
  if (deck.deckMakerStatus === 'INIT') {
    const randomLeaderImg = variations[Object.keys(variations)[0]].art;
    return (
      <Container>
        <StateToggleBox
          backgroundLeader={randomLeaderImg}
          onToggle={() => setDeckMakerStatus('DECKMAKE')}
        />
      </Container>
    );
  }

  return (
    <Container>
      <DeckList />;
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  randomLeader: randomPicker(state.card.cards.leader),
  deck: state.deck,
});

export default connect(
  mapStateToProps,
  { ...DeckActions },
)(Sidebar);
