import React, { Component } from 'react';
import styled from 'styled-components';
import { DeckItem } from '.';
import { CardData } from '../../../../shared/ICardData';
import { CardLocaleDataList } from '../../../../shared/ILocaleData';

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
  cards: CardData[];
  detail: CardLocaleDataList;
}
export default class DeckList extends Component<IDeckListProps> {
  public render() {
    const { cards, detail } = this.props;
    return (
      <DeckListWrapper>
        {cards.map(card => (
          <DeckItem key={card.ingameId}>{detail[card.ingameId].name}</DeckItem>
        ))}
        <DeckListHeader>Create Deck</DeckListHeader>
      </DeckListWrapper>
    );
  }
}
