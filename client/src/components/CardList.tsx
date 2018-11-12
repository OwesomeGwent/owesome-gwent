import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Card } from '.';
import { CardData } from '../../../shared/ICardData';
export interface ICardListProps {
  cards: CardData[];
  title: string;
  fetchMore: () => void;
  isLast: boolean;
}

class CardList extends Component<ICardListProps> {
  _debounce = false;
  static defaultProps = {
    title: '',
    fetchMore: null,
    isLast: false,
  };
  componentDidMount() {
    this.addScrollEvent();
  }
  componentWillUnmount() {
    this.removeScrollEvent();
  }
  componentDidUpdate = (prevProps: ICardListProps) => {
    if (this.props.isLast) {
      this.removeScrollEvent();
    }
  };
  addScrollEvent = () => {
    this.props.fetchMore &&
      document.addEventListener('scroll', this.handleScroll);
  };
  removeScrollEvent = () => {
    this.props.fetchMore &&
      document.removeEventListener('scroll', this.handleScroll);
  };
  initDebounce = () => {
    this._debounce = false;
  };
  handleScroll = () => {
    const { body } = document;
    if (
      !this._debounce &&
      window.scrollY + window.innerHeight >= body.scrollHeight - 100
    ) {
      this._debounce = true;
      setTimeout(this.initDebounce, 1000);
      this.props.fetchMore();
    }
  };
  render() {
    const { cards, title } = this.props;
    return (
      <>
        <h2>{title}</h2>
        <Grid container spacing={24}>
          {cards.map((card, i) => (
            <Grid key={i} item xs>
              <Card key={i} card={card} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

export default CardList;