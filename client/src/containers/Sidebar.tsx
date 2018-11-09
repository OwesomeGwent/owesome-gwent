import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StateToggleBox from '../components/StateToggleBox';
import { IRootState } from '../reducers';
import { CardData } from '../../../shared/ICardData';

interface ISidebarProps {
  randomLeader: CardData;
}

const Container = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
  padding: 8px;
`;

const Sidebar: React.SFC<ISidebarProps> = ({
  randomLeader: { variations },
}) => {
  const randomLeaderImg =
    variations[Object.keys(variations)[0]].art.ingameArtId;
  return (
    <Container>
      <StateToggleBox backgroundLeader={randomLeaderImg} />
    </Container>
  );
};

const pickRandom = (arr: any[]): any => {
  const a = arr[Math.floor(Math.random() * arr.length)];
  console.log(a);
  return a;
};
const mapStateToProps = (state: IRootState) => ({
  randomLeader: pickRandom(
    state.card.cards.filter(card => card.cardType === 'Leader'),
  ),
});

export default connect(mapStateToProps)(Sidebar);
