import React, { Component } from 'react';
import styled from 'styled-components';
import { DeckItem } from '.';
import { CardLocaleDataList } from '../../../../shared/ILocaleData';
import { IDeckCard } from '../../types/deck';
import { CardDetail } from '../CardFinder';
import { WithPopover } from '../Common';

const DeckListWrapper = styled.div`
  width: 300px;
  background-color: rgba(0, 0, 0, 0.7);
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
            placement="right-start"
            modifiers={{
              preventOverflow: {
                enabled: false,
              },
              hide: {
                enabled: false,
              },
            }}
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
                artId={card.variations[0].art}
                card={card}
                name={detail[card.ingameId].name}
                onClick={this.handleClick(card.ingameId)}
              />
            }
          />
        ))}
      </DeckListWrapper>
    );
  }
}
