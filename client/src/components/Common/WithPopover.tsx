import Popover from '@material-ui/core/Popover';
import React, { PureComponent, ReactNode } from 'react';

export interface IWithPopoverProps {
  Hover: ReactNode;
  Main: ReactNode;
}
interface IWithPopoverState {
  anchorEl: ReactNode;
}
class WithPopover extends PureComponent<IWithPopoverProps, IWithPopoverState> {
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
  // style pointerEvents: 'none' -> flickering 해결.
  public render() {
    const { Main, Hover } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <div
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
        >
          {Main}
        </div>
        <Popover
          id="mouse-over-popover"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          disableRestoreFocus
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          onClose={this.handlePopoverClose}
          style={{ pointerEvents: 'none' }}
        >
          {Hover}
        </Popover>
      </>
    );
  }
}

export default WithPopover;
