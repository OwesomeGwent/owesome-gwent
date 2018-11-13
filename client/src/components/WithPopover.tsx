import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

const EnhancedPaper = styled(Paper)`
  padding: 10px;
  z-index: 101;
`;

export interface IWithPopoverProps {
  Hover: ReactNode;
  Main: ReactNode;
}
interface IWithPopoverState {
  anchorEl: ReactNode;
}
class WithPopover extends Component<IWithPopoverProps, IWithPopoverState> {
  public state = {
    anchorEl: null,
  };
  public handlePopoverOpen = (e: React.MouseEvent) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };
  public handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  public render() {
    const { Main, Hover } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <div
          onMouseOver={this.handlePopoverOpen}
          onMouseOut={this.handlePopoverClose}
        >
          {Main}
        </div>
        <Popper id="mouse-over-popover" open={open} anchorEl={anchorEl}>
          <EnhancedPaper>{Hover}</EnhancedPaper>
        </Popper>
      </>
    );
  }
}

export default WithPopover;
