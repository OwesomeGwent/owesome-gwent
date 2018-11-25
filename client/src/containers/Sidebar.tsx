import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import {
  CardLocaleDataList,
  CategoryLocaleDataList,
} from '../../../shared/ILocaleData';
import * as DeckActions from '../actions/deck';
import {
  DeckList,
  DefaultImageBox,
  StateToggleBox,
} from '../components/Sidebar';
import { IRootState } from '../reducers';
import { ICardState } from '../reducers/card';
import { IDeckState } from '../reducers/deck';
import {
  getCardCategoryByLocale,
  getCardDetailByLocale,
} from '../selectors/locale';
import { getRandomLeader } from '../selectors/random';
import { DeckMakerStatus } from '../types/deck';

interface ISidebarProps {
  randomLeader: CardData;
  deck: IDeckState;
  cardData: ICardState;
  detail: CardLocaleDataList;
  category?: CategoryLocaleDataList;
  setDeckMakerStatus: (status: DeckMakerStatus) => void;
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
  filter: blur(1px);
  display: flex;
`;

const Sidebar: React.SFC<ISidebarProps> = ({
  randomLeader: { variations },
  deck,
  detail,
  setDeckMakerStatus,
}) => {
  if (detail === undefined) {
    return null;
  }
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
        <LeaderView backgroundCard={deck.leader.variations[0].art}>
          {detail[deck.leader.ingameId].name}
        </LeaderView>
      )}
      <DeckList cards={deck.cards} detail={detail} />
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => {
  const detail = getCardDetailByLocale(state);
  const category = getCardCategoryByLocale(state);
  return {
    randomLeader: getRandomLeader(state),
    deck: state.deck,
    cardData: state.card,
    detail,
    category,
  };
};

export default connect(
  mapStateToProps,
  { ...DeckActions },
)(Sidebar);
