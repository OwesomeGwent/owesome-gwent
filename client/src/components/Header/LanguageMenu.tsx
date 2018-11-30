import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.contrastText,
    },
    menu: {
      background: theme.palette.primary.main,
    },
    menuItem: {
      color: theme.palette.primary.contrastText,
    },
  });
export interface ILanguageMenuProps extends WithStyles<typeof styles> {
  label?: string;
  data: string[];
  selected: string;
  onChange: (value: string) => void;
}
class LanguageMenu extends React.Component<ILanguageMenuProps> {
  public state = {
    anchorEl: null,
  };

  public handleClick = (event: React.MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorEl: null });
  };

  public handleMenuClick = (option: string) => () => {
    this.props.onChange(option);
    this.handleClose();
  };
  public render() {
    const { anchorEl } = this.state;
    const { data, classes, selected } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="language"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <LanguageIcon classes={{ root: classes.icon }} />
        </IconButton>
        <Menu
          id="select-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          classes={{
            paper: classes.menu,
          }}
        >
          {data.map(option => (
            <MenuItem
              className={classes.menuItem}
              key={option}
              selected={option === selected}
              onClick={this.handleMenuClick(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(LanguageMenu);
