import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { INoti } from '../../helpers/notify';

interface IStyledProps {
  mounted: boolean;
  removed: boolean;
}
const NotiBox = styled.div`
  position: relative;
  width: 300px;
  min-height: 100px;
  margin-bottom: 10px;
  background-color: white;
  transform: translateX(300px);
  ${({ mounted }: IStyledProps) =>
    mounted &&
    css`
      transform: translateX(0px);
    `};
  ${({ removed }: IStyledProps) =>
    removed &&
    css`
      transform: translateX(300px);
    `};
  transition: transform 0.3s ease-in-out;
`;
export interface INotiProps extends INoti {
  remove: (id: number) => void;
}
class Noti extends Component<INotiProps> {
  public removeTimeout: number = 0;
  public state = {
    mounted: false,
    removed: false,
  };
  public componentDidMount() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.setState({
          mounted: true,
        });
      });
    });
    const { id, timeout } = this.props;
    this.removeTimeout = window.setTimeout(() => {
      this.handleRemove(id);
    }, timeout);
  }
  public componentWillUnmount() {
    if (this.removeTimeout) {
      window.clearTimeout(this.removeTimeout);
    }
  }
  public handleRemove = (id: number) => {
    this.setState({
      removed: true,
    });
  };
  public handleTransitionEnd = () => {
    const { removed } = this.state;
    const { id, remove } = this.props;
    if (!removed) {
      return;
    }
    remove(id);
  };
  public render() {
    const { mounted, removed } = this.state;
    const { id, message, type } = this.props;
    return (
      <NotiBox
        mounted={mounted}
        removed={removed}
        onClick={() => this.handleRemove(id)}
        onTransitionEnd={this.handleTransitionEnd}
      >
        {message}
      </NotiBox>
    );
  }
}

export default Noti;
