import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../shared/ICardData';
import StateToggleBox from '../components/StateToggleBox';
import { IRootState } from '../reducers';

interface ISidebarProps {
  randomLeader: CardData;
}

const Container = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
`;

const Sidebar: React.SFC<ISidebarProps> = ({
  randomLeader: { variations },
}) => {
  const randomLeaderImg = variations[Object.keys(variations)[0]].art;
  return (
    <Container>
      <StateToggleBox backgroundLeader={randomLeaderImg} />
    </Container>
  );
};

const pickRandom = (arr: any[]): any => {
  const a = arr[Math.floor(Math.random() * arr.length)];
  return a;
};
const mapStateToProps = (state: IRootState) => ({
  randomLeader: pickRandom(state.card.cards.leader),
});

export default connect(mapStateToProps)(Sidebar);
