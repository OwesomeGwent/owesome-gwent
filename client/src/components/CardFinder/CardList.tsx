import { Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { SFC } from 'react';
import { Card, CardDetail } from '.';
import { CardData } from '../../../../shared/ICardData';
import { WithPopover } from '../Common';
export interface ICardListProps {
  title: string;
  cards?: CardData[];
}
const CardList: SFC<ICardListProps> = ({ title, cards }) => {
  if (!cards || cards.length <= 0) {
    return null;
  }
  return (
    <>
      <Typography style={{ marginTop: '1rem' }} variant="subtitle1">
        {title}
      </Typography>
      <Divider style={{ marginBottom: '1rem' }} light />
      <Grid container spacing={16}>
        {cards.map((card, i) => (
          <Grid key={i} item xs>
            <WithPopover
              Hover={
                <CardDetail
                  cardId={card.ingameId}
                  categoryIds={card.categoryIds}
                  type="leader"
                  keywords={card.keywords}
                />
              }
              Main={<Card card={card} />}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CardList;
