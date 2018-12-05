import React from 'react';
import styled from 'styled-components';
import { CardData } from '../../../../shared/ICardData';
import { CardLocaleDataList } from '../../../../shared/ILocaleData';
import { IDeckCard } from '../../types/deck';
import { Card, CardDetail } from '../CardFinder';
import { WithPopover } from '../Common';
import { DeckItem } from '../Sidebar';

const Container = styled.div`
  width: 100%;
`;
const CardWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;
const DetailWrapper = styled.div`
  margin-top: 1rem;
`;
export interface IDeckListProps {
  cards: IDeckCard[];
  detail: CardLocaleDataList;
}
class DeckList extends React.Component<IDeckListProps> {
  public render() {
    const { cards, detail } = this.props;
    return (
      <Container>
        {cards.map(card => {
          return (
            <WithPopover
              key={card.ingameId}
              placement="right-end"
              Main={
                <DeckItem
                  card={card}
                  artId={card.variations[0].art}
                  name={detail[card.ingameId].name}
                />
              }
              Hover={
                <>
                  <CardWrapper>
                    <Card available card={card} onClick={() => null} />
                  </CardWrapper>
                  <DetailWrapper>
                    <CardDetail
                      {...card}
                      cardId={card.ingameId}
                      type="normal"
                    />
                  </DetailWrapper>
                </>
              }
            />
          );
        })}
      </Container>
    );
  }
}

export default DeckList;
