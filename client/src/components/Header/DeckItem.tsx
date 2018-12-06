import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../../shared/ICardData';
import { LEADER_IMAGE_PATH } from '../../apis/defs';
import { IRootState } from '../../reducers';
import { makeGetLeader } from '../../selectors/card';
import { IDeck } from '../../types/deck';
import { Avatar, Button } from '../Common';

const Item = styled.div`
  text-align: center;
  padding: 20px 10px;
`;
const DeckName = styled.span`
  font-weight: 600;
`;
const ButtonInner = styled.div`
  display: flex;
  align-items: center;
`;
export interface IDeckItemProps extends IDeck {
  handleDeckClick: () => void;
  leader?: CardData | undefined;
}

const DeckItem: React.SFC<IDeckItemProps> = ({
  children,
  name,
  leader,
  handleDeckClick,
}) => {
  return (
    <Item>
      <Button fullWidth onClick={handleDeckClick}>
        <ButtonInner>
          {leader && (
            <Avatar
              src={`${LEADER_IMAGE_PATH}/${leader.variations[0].art}0000.png`}
            />
          )}
          <DeckName>{name}</DeckName>
        </ButtonInner>
        {children}
      </Button>
    </Item>
  );
};

DeckItem.defaultProps = {
  leader: undefined,
};

const mapStateToProps = () => {
  const getLeader = makeGetLeader();
  return (state: IRootState, props: IDeckItemProps) => ({
    leader: getLeader(state, props.leaderId),
  });
};
export default connect(mapStateToProps)(DeckItem);
