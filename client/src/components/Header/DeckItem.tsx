import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../../shared/ICardData';
import { LEADER_IMAGE_PATH } from '../../apis/defs';
import { IRootState } from '../../reducers';
import { makeGetLeader } from '../../selectors/card';
import { IDeck } from '../../types/user';
import { Button } from '../Common';

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
const Icon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 10px;
`;
export interface IDeckItemProps extends IDeck {
  handleDeckClick: () => void;
  leader?: CardData | undefined;
  leaderName?: string;
}

const DeckItem: React.SFC<IDeckItemProps> = ({
  name,
  leader,
  handleDeckClick,
}) => {
  return (
    <Item>
      <Button fullWidth onClick={handleDeckClick}>
        <ButtonInner>
          {leader && (
            <Icon
              src={`${LEADER_IMAGE_PATH}/${leader.variations[0].art}0000.png`}
            />
          )}
          <DeckName>{name}</DeckName>
        </ButtonInner>
      </Button>
    </Item>
  );
};

DeckItem.defaultProps = {
  leader: undefined,
  leaderName: '',
};

const mapStateToProps = () => {
  const getLeader = makeGetLeader();
  return (state: IRootState, props: IDeckItemProps) => ({
    leader: getLeader(state, props.leaderId),
  });
};
export default connect(mapStateToProps)(DeckItem);
