import React from 'react';
import styled from 'styled-components';
import { DeckCost, DeckLeader, DeckList } from '.';
import { CardData } from '../../../../shared/ICardData';
import { CardLocaleDataList } from '../../../../shared/ILocaleData';
import { IDeckCard, IDeckCost } from '../../types/deck';
import { Card, CardDetail } from '../CardFinder';
import { WithPopover } from '../Common';

const Container = styled.div`
  width: 100%;
  color: #fefefe;
  font-weight: 600;
`;
const CardWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;
const DetailWrapper = styled.div`
  margin-top: 1rem;
`;
const NoLeader = styled.h2`
  color: white;
`;
const Owesome = styled.div`
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  padding: 10px 5px;
`;
export interface IDeckListProps {
  cards: IDeckCard[];
  cost: IDeckCost;
  detail: CardLocaleDataList;
  onCardClick?: (cardId: string) => void;
  leader?: CardData;
}
class FullDeckList extends React.Component<IDeckListProps> {
  public render() {
    const { cards, cost, detail, leader, onCardClick } = this.props;
    return (
      <Container>
        {leader === undefined ? (
          <NoLeader>Choose Your Leader 👍</NoLeader>
        ) : (
          <WithPopover
            key={leader.ingameId}
            placement="right-start"
            modifiers={{
              preventOverflow: {
                enabled: true,
                boundariesElement: 'viewport',
              },
            }}
            Main={
              <DeckLeader
                artId={leader.variations[0].art}
                name={detail[leader.ingameId].name}
              />
            }
            Hover={
              <>
                <CardWrapper>
                  <Card available card={leader} onClick={() => null} />
                </CardWrapper>
                <DetailWrapper>
                  <CardDetail
                    {...leader}
                    cardId={leader.ingameId}
                    type="leader"
                  />
                </DetailWrapper>
              </>
            }
          />
        )}
        <DeckCost {...cost} />
        <DeckList cards={cards} detail={detail} onCardClick={onCardClick} />
        <Owesome>🚀 Owesome</Owesome>
      </Container>
    );
  }
}

export default FullDeckList;
