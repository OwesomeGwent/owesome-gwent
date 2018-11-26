import React from 'react';
import styled from 'styled-components';
import { IDeckCard } from '../../types/deck';

const SelectedCardWrapper = styled.div`
  position: relative;
  height: 80px;
  border-bottom: solid 1px black;
  color: white;
`;
const CardInner = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
const CardInnerLeft = styled.div`
  flex: 1;
`;
const CardInnerRight = styled.div`
  flex: 0;
`;
export interface IDeckItemProps extends React.HTMLAttributes<HTMLDivElement> {
  card: IDeckCard;
  name: string;
}
const DeckItem: React.SFC<IDeckItemProps> = ({ card, name, ...props }) => {
  return (
    <SelectedCardWrapper {...props}>
      <CardInner>
        <CardInnerLeft>
          <span>{card.strength}</span>
          <span>{name}</span>
        </CardInnerLeft>
        <CardInnerRight>
          <span>{card.provision}</span>
          <span>x{card.cardCount}</span>
        </CardInnerRight>
      </CardInner>
    </SelectedCardWrapper>
  );
};

export default DeckItem;
