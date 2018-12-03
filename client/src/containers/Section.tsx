import React from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Collection, Main } from '.';

const HomeRouter = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
`;

const Section: React.SFC = props => {
  return (
    <HomeRouter>
      <Route path="/collection" component={Collection} />
      <Route path="/:deckUrl?" component={Main} />
    </HomeRouter>
  );
};

export default Section;
