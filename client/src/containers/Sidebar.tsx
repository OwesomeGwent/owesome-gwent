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
import { countCard } from '../helpers/card';
import { IRootState } from '../reducers';
import { ICardState } from '../reducers/card';
import { IDeckState } from '../reducers/deck';
import { getDeckCost, getParsedDeckCards } from '../selectors/deck';
import {
  getCardCategoryByLocale,
  getCardDetailByLocale,
} from '../selectors/locale';
import { getRandomLeader } from '../selectors/random';
import { DeckMakerStatus, IDeckCard, IDeckCost } from '../types/deck';

interface ISidebarProps {
  randomLeader: CardData;
  deck: IDeckState;
  deckCards: IDeckCard[];
  deckCost: IDeckCost;
  cardData: ICardState;
  detail: CardLocaleDataList;
  category?: CategoryLocaleDataList;
  setDeckMakerStatus: (status: DeckMakerStatus) => void;
  removeCard: (cardId: string) => void;
}

const Container = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
`;
const Floating = styled.div`
  position: sticky;
  top: 65px;
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
const CostView = styled.div`
  background-color: white;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Sidebar: React.SFC<ISidebarProps> = ({
  randomLeader: { variations },
  deck,
  deckCards,
  deckCost,
  detail,
  setDeckMakerStatus,
  removeCard,
}) => {
  if (detail === undefined) {
    return null;
  }
  if (deck.deckMakerStatus === 'INIT') {
    const randomLeaderImg = variations[Object.keys(variations)[0]].art;
    return (
      <Container>
        <Floating>
          <StateToggleBox
            backgroundLeader={randomLeaderImg}
            onToggle={() => setDeckMakerStatus('DECKMAKE')}
          />
        </Floating>
      </Container>
    );
  }

  return (
    <Container>
      <Floating>
        {deck.leader === undefined ? (
          <NoLeader>Choose Your Leader</NoLeader>
        ) : (
          <LeaderView backgroundCard={deck.leader.variations[0].art}>
            {detail[deck.leader.ingameId].name}
          </LeaderView>
        )}
        <CostView>
          <span>craft: {deckCost.craft} </span>
          <span>provision: {deckCost.provision}</span>
        </CostView>
        <DeckList cards={deckCards} detail={detail} removeCard={removeCard} />
      </Floating>
    </Container>
  );
};

const mapStateToProps = (state: IRootState) => {
  const detail = getCardDetailByLocale(state);
  const category = getCardCategoryByLocale(state);
  return {
    randomLeader: getRandomLeader(state),
    deck: state.deck,
    deckCards: getParsedDeckCards(state),
    deckCost: getDeckCost(state),
    cardData: state.card,
    detail,
    category,
  };
};

export default connect(
  mapStateToProps,
  { ...DeckActions },
)(Sidebar);
