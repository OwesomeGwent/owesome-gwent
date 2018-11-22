import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import * as DeckActions from '../actions/deck';
import {
  DeckList,
  DefaultImageBox,
  StateToggleBox,
} from '../components/Sidebar';
import { IRootState } from '../reducers';
import { IDeckState } from '../reducers/deck';
import { getRandomLeader } from '../selectors/random';
import { DeckMakerStatus } from '../types/deck';

interface ISidebarProps {
  randomLeader: CardData;
  deck: IDeckState;
  setDeckMakerStatus(status: DeckMakerStatus): void;
}

const Container = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
`;

const NoLeader = styled.div`
  height: 100px;
  background: rgba(0, 0, 0, 0.2);
`;

const LeaderView = styled(DefaultImageBox)`
  height: 100px;
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
      {deck.leader === undefined ? (
        <NoLeader>Choose Your Leader</NoLeader>
      ) : (
        <LeaderView backgroundCard={deck.leader.variations[0].art} />
      )}
      <DeckList />
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => ({
  randomLeader: getRandomLeader(state),
  deck: state.deck,
});

export default connect(
  mapStateToProps,
  { ...DeckActions },
)(Sidebar);
