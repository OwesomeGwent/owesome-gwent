import React, { Component } from 'react';
import styled from 'styled-components';
import { DeckItem } from '.';
import { CardLocaleDataList } from '../../../../shared/ILocaleData';
import { IDeckCard } from '../../types/deck';
import { CardDetail } from '../CardFinder';
import { WithPopover } from '../Common';

const DeckListWrapper = styled.div`
  width: 100%;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.7);
`;
export interface IDeckListProps {
  cards: IDeckCard[];
  detail: CardLocaleDataList;
  onCardClick?: (cardId: string) => void;
}
export default class DeckList extends Component<IDeckListProps> {
  public handleClick = (cardId: string) => () => {
    if (this.props.onCardClick) {
      this.props.onCardClick(cardId);
    }
  };
  public render() {
    const { cards, detail } = this.props;
    return (
      <DeckListWrapper>
        {cards.map((card, i) => (
          <WithPopover
            placement="right-end"
            modifiers={{
              preventOverflow: {
                enabled: false,
              },
              hide: {
                enabled: false,
              },
            }}
            key={i}
            Hover={<CardDetail {...card} type="normal" />}
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
