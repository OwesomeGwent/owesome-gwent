import React from 'react';
import styled from 'styled-components';
import { CollectionItemDetail } from '.';
import { ICollection } from '../../types/collection';
import { DeckItem } from '../Header';

const Item = styled.div`
  display: inline-block;
  width: 33%;
  div {
    margin-top: 10px;
  }
`;
const DeckInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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
  handleDeckClick: () => void;
}
const CollectionItem: React.SFC<ICollectionItemProps> = ({
  deck,
  handleDeckClick,
}) => {
  const { user } = deck;
  return (
    <Item>
      <DeckItem handleDeckClick={handleDeckClick} {...deck}>
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

export default CollectionItem;
