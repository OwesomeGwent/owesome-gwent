import { RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { CardFinder, Filter, Sidebar } from '.';

const Side = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 300px;
  margin-right: 20px;
`;

const Card = styled.div`
  flex: 1;
`;
// React.memo 적용되면 함수형으로~
class Main extends React.PureComponent<RouteComponentProps> {
  public render() {
    return (
      <>
        <Side>
          <Sidebar />
        </Side>
        <Card>
          <Filter />
          <CardFinder />
        </Card>
      </>
    );
  }
}

export default Main;
