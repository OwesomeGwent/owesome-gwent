import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Collection, CollectionView, Main } from '.';
import { media } from '../helpers/media';

const HomeRouter = styled.div`
  display: flex;
  width: 90%;
  margin: auto;

  @media (max-width: ${media.phone}px) {
    flex-wrap: wrap;
  }
`;

const Section: React.SFC = props => {
  return (
    <HomeRouter>
      <Switch>
        <Route path="/collection/view/:deckId" component={CollectionView} />
        <Route path="/collection" component={Collection} />
        <Route path="/:deckUrl?" component={Main} />
      </Switch>
    </HomeRouter>
  );
};

export default Section;
