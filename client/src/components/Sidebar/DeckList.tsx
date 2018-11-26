import React, { Component } from 'react';
import styled from 'styled-components';
import { DeckItem } from '.';
import { CardData } from '../../../../shared/ICardData';
import { CardLocaleDataList } from '../../../../shared/ILocaleData';
import { IDeckCard } from '../../types/deck';
import { CardDetail } from '../CardFinder';
import { WithPopover } from '../Common';

const DeckListWrapper = styled.div`
  width: 300px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const DeckListHeader = styled.div`
  font-size: 2rem;
  padding: 6px;
  color: white;
`;

export interface IDeckListProps {
  cards: IDeckCard[];
  detail: CardLocaleDataList;
  removeCard: (cardId: string) => void;
}
export default class DeckList extends Component<IDeckListProps> {
  public handleClick = (cardId: string) => () => {
    this.props.removeCard(cardId);
  };
  public render() {
    const { cards, detail } = this.props;
    return (
      <DeckListWrapper>
        {cards.map((card, i) => (
          <WithPopover
            key={i}
            Hover={
              <CardDetail
                cardId={card.ingameId}
                categoryIds={card.categoryIds}
                type="normal"
                keywords={card.keywords}
              />
            }
            Main={
              <DeckItem
                card={card}
                name={detail[card.ingameId].name}
                onClick={this.handleClick(card.ingameId)}
              />
            }
          />
        ))}
        <DeckListHeader>Create Deck</DeckListHeader>
      </DeckListWrapper>
    );
  }
}
