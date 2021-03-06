import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { SFC } from 'react';
import { Card, CardDetail } from '.';
import { CardData } from '../../../../shared/ICardData';
import { WithPopover } from '../Common';
export interface ICardListProps {
  title: string;
  cards: CardData[];
  isAvailable: (card: CardData) => boolean;
  onClickCard: (card: CardData) => (e: React.MouseEvent) => void;
}
const CardList: SFC<ICardListProps> = ({
  title,
  cards,
  isAvailable,
  onClickCard,
}) => {
  if (cards.length <= 0) {
    return null;
  }
  return (
    <>
      <Typography
        style={{ marginTop: '1rem', color: 'white' }}
        variant="subtitle1"
      >
        {title}
      </Typography>
      <Divider style={{ marginBottom: '1rem' }} light />
      <Grid container spacing={16}>
        {cards.map((card, i) => (
          <Grid key={i} item xs>
            <WithPopover
              Hover={<CardDetail {...card} />}
              Main={
                <Card
                  available={isAvailable(card)}
                  card={card}
                  onClick={onClickCard(card)}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardList;
