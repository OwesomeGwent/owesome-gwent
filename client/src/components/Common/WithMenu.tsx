import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.primary.dark,
    },
  });
export interface IWithMenuProps extends WithStyles<typeof styles> {
  Button: React.ReactElement<any>;
  MenuItems: React.ReactNode;
}
export interface IWithMenuState {
  anchorEl: React.ReactNode;
}
class WithMenu extends Component<IWithMenuProps, IWithMenuState> {
  public state = {
    anchorEl: null,
  };
  public handleOpen = (e: React.MouseEvent) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };
  public handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };
  public render() {
    const { anchorEl } = this.state;
    const { classes, Button, MenuItems } = this.props;
    return (
      <>
        {React.cloneElement(Button, { onClick: this.handleOpen })}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          classes={{ paper: classes.paper }}
        >
          {Array.isArray(MenuItems)
            ? MenuItems.map((Item, i) => <MenuItem key={i}>{Item}</MenuItem>)
            : { MenuItems }}
        </Menu>
      </>
    );
  }
}

export default withStyles(styles)(WithMenu);
