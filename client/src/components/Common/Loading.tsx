import React, { Component } from 'react';
import styled from 'styled-components';
import { FlipCard } from '.';
import baseImage from '../../img/card-reveals/cards/m/12950000.png';

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #363640;
`;

export interface ILoadingProps {
  message: string;
}
interface ILoadingState {
  imageLoaded: boolean;
}
class Loading extends Component<ILoadingProps, ILoadingState> {
  public unmounted = false;
  public state = {
    imageLoaded: false,
  };
  public componentDidMount() {
    const image = new Image();
    image.src = baseImage;
    image.onload = this.handleImageLoad;
  }
  public componentWillUnmount() {
    this.unmounted = true;
  }
  public handleImageLoad = () => {
    if (!this.unmounted) {
      this.setState({
        imageLoaded: true,
      });
    }
  };
  public render() {
    const { imageLoaded } = this.state;
    const { message } = this.props;
    return (
      <LoadingContainer>
        <div>
          {imageLoaded && <FlipCard src={baseImage} />}
          <h2 style={{ textAlign: 'center' }}>{message}</h2>
        </div>
      </LoadingContainer>
    );
  }
}

export default Loading;
