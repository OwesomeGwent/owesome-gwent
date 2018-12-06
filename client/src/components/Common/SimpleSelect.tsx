import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.contrastText,
    },
    label: {
      color: theme.palette.primary.contrastText,
      '&$focused': {
        color: theme.palette.primary.contrastText,
      },
    },
    formControl: {
      minWidth: 150,
    },
    select: {
      width: 150,
      color: theme.palette.primary.contrastText,
      border: `1px solid ${theme.palette.primary.contrastText}`,
      padding: 10,
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
    focused: {},
    menu: {
      background: theme.palette.primary.light,
    },
    menuItem: {
      color: theme.palette.primary.contrastText,
    },
    underline: {
      borderBottom: theme.palette.primary.contrastText,
    },
  });

export interface Item {
  label: string;
  value: string;
}
export interface ISimpleSelectProps extends WithStyles<typeof styles> {
  selected: string | string[];
  items: Item[];
  placeHolder?: string;
  handleChange: (value: string) => void;
}
const MultiFilterItem: React.SFC<ISimpleSelectProps & SelectProps> = ({
  classes,
  selected,
  items,
  placeHolder,
  handleChange,
  ...props
}) => {
  if (items.length <= 0) {
    return null;
  }
  return (
    <FormControl classes={{ root: classes.formControl }}>
      <Select
        autoWidth
        classes={{
          select: classes.select,
          icon: classes.icon,
        }}
        disableUnderline
        displayEmpty
        MenuProps={{
          classes: {
            paper: classes.menu,
          },
        }}
        value={selected || []}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChange(e.target.value)
        }
        {...props}
      >
        <MenuItem value="">
          <em>{placeHolder}</em>
        </MenuItem>
        {items.map(item => (
          <MenuItem
            key={item.value}
            value={item.value}
            className={classes.menuItem}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(MultiFilterItem);