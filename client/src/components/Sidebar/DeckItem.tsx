import React from 'react';
import styled from 'styled-components';
import { BASE_IMAGE_PATH, THUMBNAIL_IMAGE_PATH } from '../../apis/defs';
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
      border: 1px solid #d19432;
    `
      : `
      color: #9b5140;
      border: 1px solid #9b5140;
    `};
  background-color: rgba(0, 0, 0, 0.6);
`;
const CardBack = styled.div`
  padding: 5px;
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
    <SelectedCardWrapper artId={artId} {...props}>
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
