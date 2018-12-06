import React from 'react';
import styled from 'styled-components';
import { CollectionItemDetail } from '.';
import { LEADER_IMAGE_PATH } from '../../apis/defs';
import { ICollection } from '../../types/collection';
import { Avatar, Button } from '../Common';

import { connect } from 'react-redux';
import { CardData } from '../../../../shared/ICardData';
import { IRootState } from '../../reducers';
import { makeGetLeader } from '../../selectors/card';
const Item = styled.div`
  display: inline-block;
  min-width: 33%;
  margin-top: 10px;
`;
const DeckInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const MainInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const DeckName = styled.div`
  font-weight: 800;
  color: #fefefe;
`;
const BigAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
`;
const Star = styled.div`
  flex: 0;
  flex-basis: 50px;
  font-weight: 800;
  color: #fefefe;
`;
const DeckItem = styled(Button)`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
const DeckDetail = styled.div`
  width: 100%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;
const Username = styled.div`
  flex: 1;
  text-align: right;
`;
export interface ICollectionItemProps {
  deck: ICollection;
  leader?: CardData | undefined;
  handleDeckClick: () => void;
}
const CollectionItem: React.SFC<ICollectionItemProps> = ({
  deck,
  leader,
  handleDeckClick,
}) => {
  const { user } = deck;
  return (
    <Item>
      <DeckItem fullWidth onClick={handleDeckClick}>
        <DeckInfo>
          <MainInfo>
            {leader && (
              <BigAvatar
                src={`${LEADER_IMAGE_PATH}/${leader.variations[0].art}0000.png`}
                alt={`leader${deck.leaderId}`}
              />
            )}
            <DeckName>{deck.name}</DeckName>
          </MainInfo>
          <Star>⭐ {deck.star}</Star>
        </DeckInfo>
        <DeckDetail>
          <CollectionItemDetail url={deck.url} />
        </DeckDetail>
        <DeckInfo>
          <Username>by {user && user.username}</Username>
        </DeckInfo>
      </DeckItem>
    </Item>
  );
};
CollectionItem.defaultProps = {
  leader: undefined,
};
const makeMapStateToProps = () => {
  const getLeader = makeGetLeader();
  return (state: IRootState, props: ICollectionItemProps) => ({
    leader: getLeader(state, props.deck.leaderId),
  });
};
export default connect(makeMapStateToProps)(CollectionItem);
