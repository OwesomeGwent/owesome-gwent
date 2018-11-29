import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IRootState } from '../../reducers';
import { makeGetLeaderName } from '../../selectors/deck';
import { IDeck } from '../../types/user';
import { Button } from '../Common';
const Item = styled.div`
  text-align: center;
  padding: 20px 10px;
`;
const DeckName = styled.span`
  font-weight: 600;
`;
export interface IDeckItemProps extends IDeck {
  handleDeckClick: () => void;
  leaderName?: string;
}

const DeckItem: React.SFC<IDeckItemProps> = ({
  id,
  url,
  name,
  leaderId,
  leaderName,
  handleDeckClick,
}) => {
  return (
    <Item>
      <Button fullWidth onClick={handleDeckClick}>
        {leaderName}의 덱 <DeckName>{name}</DeckName>
      </Button>
    </Item>
  );
};

DeckItem.defaultProps = {
  leaderName: '',
};

const mapStateToProps = () => {
  const getLeaderName = makeGetLeaderName();
  return (state: IRootState, props: IDeckItemProps) => ({
    leaderName: getLeaderName(state, props.leaderId),
  });
};
export default connect(mapStateToProps)(DeckItem);
