import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, CardDetail, WithPopover } from '.';
import { CardData } from '../../../shared/ICardData';
export interface ICardListProps {
  cards: CardData[];
  title: string;
  type: 'leader' | 'normal';
  fetchMore: () => void;
  isLast: boolean;
}

class CardList extends Component<ICardListProps> {
  public static defaultProps = {
    title: '',
    fetchMore: null,
    isLast: false,
  };
  public debounce = false;
  public componentDidMount() {
    this.addScrollEvent();
  }
  public componentWillUnmount() {
    this.removeScrollEvent();
  }
  public componentDidUpdate = (prevProps: ICardListProps) => {
    if (this.props.isLast) {
      this.removeScrollEvent();
    }
  };
  public addScrollEvent = () => {
    if (this.props.fetchMore) {
      document.addEventListener('scroll', this.handleScroll);
    }
  };
  public removeScrollEvent = () => {
    if (this.props.fetchMore) {
      document.removeEventListener('scroll', this.handleScroll);
    }
  };
  public initDebounce = () => {
    this.debounce = false;
  };
  public handleScroll = () => {
    const { body } = document;
    if (
      !this.debounce &&
      window.scrollY + window.innerHeight >= body.scrollHeight - 100
    ) {
      this.debounce = true;
      setTimeout(this.initDebounce, 1000);
      this.props.fetchMore();
    }
  };
  public render() {
    const { cards, title, type } = this.props;
    return (
      <>
        <h2>{title}</h2>
        <Grid container spacing={24}>
          {cards.map((card, i) => (
            <Grid key={i} item xs>
              <WithPopover
                Hover={
                  <CardDetail
                    cardId={card.ingameId}
                    categoryIds={card.categoryIds}
                    type={type}
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
  }
}

export default CardList;
