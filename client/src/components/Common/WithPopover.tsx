import Popover from '@material-ui/core/Popover';
import Popper from '@material-ui/core/Popper';
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
        <Popper
          id="mouse-over-popover"
          placement="top"
          anchorEl={anchorEl}
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
          open={open}
          style={{ pointerEvents: 'none', zIndex: 101 }}
        >
          {Hover}
        </Popper>
      </>
    );
  }
}

export default WithPopover;
