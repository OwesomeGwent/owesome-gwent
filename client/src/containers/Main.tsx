import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { CardFinder, Filter, Sidebar } from '.';

const Left = styled.div`
  flex: 0;
  justify-content: center;
  flex-basis: 400px;
  margin-right: 20px;
`;

const Card = styled.div`
  flex: 1;
`;
const Right = styled.div`
  margin-left: 20px;
  flex: 0;
  flex-basis: 400px;
`;
// React.memo 적용되면 함수형으로~
class Main extends React.PureComponent<RouteComponentProps> {
  public state = {
    isMobile: window.innerWidth < 1000,
  };
  public componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  public handleResize = () => {
    if (window.innerWidth && window.innerWidth < 1000) {
      this.setState({
        isMobile: true,
      });
    }
  };
  public render() {
    const { isMobile } = this.state;
    const { deckUrl } = this.props.match.params as { deckUrl: string };
    return (
      <>
        <Left>
          <Sidebar deckUrl={deckUrl} />
        </Left>
        <Card>
          <CardFinder />
        </Card>
        {isMobile ? (
          <Filter isMobile={isMobile} />
        ) : (
          <Right>
            <Filter isMobile={isMobile} />
          </Right>
        )}
      </>
    );
  }
}

export default Main;
