import React from 'react';
import styled from 'styled-components';
import { DeckChart } from '.';
import { factionColor } from '../../helpers/color';
import { IDeckCard, IDeckCost } from '../../types/deck';
import { DeckCost } from '../Common';

const DetailItem = styled.div`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  margin-top: 1rem;
  border-radius: 10px;
`;
const Faction = styled.div`
  text-align: center;
  width: 100%;
  font-size: 26px;
  span {
    padding: 5px;
    border-radius: 10px;
    color: #fefefe;
    background-color: ${({ faction }: { faction: string }) =>
      factionColor[faction]};
  }
`;
const Cost = styled.div`
  width: 100%;
  margin: auto;
  font-size: 20px;
`;
const Header = styled.div`
  text-align: left;
  font-weight: 600;
  color: #fefefe;
`;
export interface IDeckDetailProps {
  faction: string;
  cards: IDeckCard[];
  cost: IDeckCost;
}
const DeckDetail: React.SFC<IDeckDetailProps> = ({ cards, cost, faction }) => {
  return (
    <>
      <DetailItem>
        <Header>Faction</Header>
        <Faction faction={faction}>
          <span>{faction}</span>
        </Faction>
      </DetailItem>
      <DetailItem>
        <Header>Cost</Header>
        <Cost>
          <DeckCost {...cost} />
        </Cost>
      </DetailItem>
      <DetailItem>
        <Header>Chart</Header>
        <DeckChart cards={cards} />
      </DetailItem>
    </>
  );
};

export default DeckDetail;
