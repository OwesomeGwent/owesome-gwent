import React from 'react';
import styled from 'styled-components';
import { CardFinder, Filter } from '.';

const Container = styled.div`
  flex: 1;
`;
// React.memo 적용되면 함수형으로~
class Main extends React.PureComponent {
  public render() {
    return (
      <Container>
        <Filter />
        <CardFinder />
      </Container>
    );
  }
}

export default Main;
