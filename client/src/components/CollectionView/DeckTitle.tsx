import React from 'react';
import styled from 'styled-components';
import { CardData } from '../../../../shared/ICardData';
import { LEADER_IMAGE_PATH } from '../../apis/defs';
import { CardDetail } from '../CardFinder';
import { Avatar, WithPopover } from '../Common';
const Container = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BigAvatar = styled(Avatar)`
  width: 128px;
  height: 128px;
  margin-right: 1rem;
`;
const DeckName = styled.h1`
  color: #f2f2f2;
`;

export interface IDeckTitleProps {
  name: string;
  leader: CardData;
}

const DeckTitle: React.SFC<IDeckTitleProps> = ({ name, leader }) => (
  <Container>
    <WithPopover
      Main={
        <BigAvatar
          src={`${LEADER_IMAGE_PATH}/${leader.variations[0].art}0000.png`}
          alt={`leader${leader.ingameId}`}
        />
      }
      Hover={<CardDetail {...leader} cardId={leader.ingameId} type="leader" />}
    />
    <DeckName>{name}</DeckName>
  </Container>
);

export default DeckTitle;
