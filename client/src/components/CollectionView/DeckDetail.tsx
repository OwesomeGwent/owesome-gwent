import React from 'react';
import styled from 'styled-components';
import { DeckProvision } from '.';
import { IDeckCard, IDeckCost } from '../../types/deck';
import { CostList } from '../Sidebar';

const DetailItem = styled.div`
  display: flex;
  align-items: center;
`;
const Cost = styled.div`
  width: 100%;
  margin: auto;
`;
const Header = styled.div`
  text-align: center;
  flex: 0;
  flex-basis: 200px;
  font-weight: 600;
  color: #fefefe;
`;
export interface IDeckDetailProps {
  cards: IDeckCard[];
  cost: IDeckCost;
}
const DeckDetail: React.SFC<IDeckDetailProps> = ({ cards, cost }) => {
  return (
    <>
      <DetailItem>
        <Header>Deck cost</Header>
        <Cost>
          <CostList {...cost} />
        </Cost>
      </DetailItem>
      <DetailItem>
        <Header>Deck provision</Header>
        <DeckProvision cards={cards} />
      </DetailItem>
    </>
  );
};

export default DeckDetail;
