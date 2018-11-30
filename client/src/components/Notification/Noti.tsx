import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { INoti, NotiType } from '../../helpers/notify';

type NotiColor = Record<NotiType, string>;

const NOTI_COLOR: NotiColor = {
  success: '#05ac7c',
  error: '#ce2c14',
  default: '#048bfb',
};
interface IStyledProps {
  mounted: boolean;
  removed: boolean;
  type: NotiType;
}
const NotiBox = styled.div`
  position: relative;
  width: 300px;
  min-height: 50px;
  margin-bottom: 10px;
  color: #fbfbfb;
  background-color: ${({ type }: IStyledProps) => NOTI_COLOR[type]};
  box-shadow: 0 8px 6px -6px black;
  transform: scale(0);
  opacity: 0;
  ${({ mounted }) =>
    mounted &&
    css`
      opacity: 1;
      transform: scale(1);
    `};
  ${({ removed }) =>
    removed &&
    css`
      opacity: 0;
      transform: scale(0);
    `};
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.885, 1.275);
`;
const NotiInner = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  min-height: 50px;
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
        type={type}
        mounted={mounted}
        removed={removed}
        onClick={() => this.handleRemove(id)}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <NotiInner>{message}</NotiInner>
      </NotiBox>
    );
  }
}

export default Noti;
