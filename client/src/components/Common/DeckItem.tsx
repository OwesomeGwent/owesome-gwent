import React from 'react';
import styled from 'styled-components';
import { THUMBNAIL_IMAGE_PATH } from '../../apis/defs';
import { pushCardToUrl } from '../../helpers/deckUrl';
import Card from '../../icons/card.png';
import Provision from '../../icons/provision.png';
import { IDeckCard } from '../../types/deck';
interface IWrapperProps {
  artId: string;
}
// prettier-ignore
const SelectedCardWrapper = styled.div`
  position: relative;
  height: 50px;
  border-bottom: solid 1px black;
  color: white;
  background-size: cover;
  background-image: url(${({ artId }: IWrapperProps) => `${THUMBNAIL_IMAGE_PATH}/${artId}0000.png`});
  cursor: pointer;
`;
const CardInner = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  ${({ type }: { type: string }) =>
    type === 'Gold'
      ? `
      color: #d19632;
    `
      : `
      color: #9b5140;
    `};
  background-color: rgba(0, 0, 0, 0.6);
`;
const CardBack = styled.div`
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);

  border-radius: 10px;
`;
export interface IDeckItemProps extends React.HTMLAttributes<HTMLDivElement> {
  artId: string;
  card: IDeckCard;
  name: string;
}
const DeckItem: React.SFC<IDeckItemProps> = ({
  artId,
  card,
  name,
  ...props
}) => {
  return (
    <SelectedCardWrapper
      artId={artId}
      {...props}
      onClick={() => pushCardToUrl('REMOVE', card)}
    >
      <CardInner type={card.type}>
        <CardBack>
          <span>{card.strength > 0 && card.strength}</span>
          <span> {name}</span>
        </CardBack>
        <CardBack>
          <img src={Provision} />
          <span>{card.provision}</span>
          <img src={Card} />
          <span>{card.cardCount}</span>
        </CardBack>
      </CardInner>
    </SelectedCardWrapper>
  );
};

export default DeckItem;
