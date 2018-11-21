import React, { Component } from 'react';
import styled from 'styled-components';

const DeckListWrapper = styled.div`
  width: 300px;
  background-color: rgba(0, 0, 0, 0.7);
`;

const DeckListHeader = styled.div`
  font-size: 2rem;
  padding: 6px;
  color: white;
`;

export default class DeckList extends Component {
  public render() {
    return (
      <DeckListWrapper>
        <DeckListHeader>Create Deck</DeckListHeader>
      </DeckListWrapper>
    );
  }
}
