import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
export interface ISimpleSelect extends WithStyles<typeof styles> {
  label?: string;
  data: string[];
  selected: string;
  onChange: (value: string) => void;
}
const SimpleSelect: React.SFC<ISimpleSelect> = ({
  classes,
  data,
  label,
  selected,
  onChange,
  ...props
}) => {
  return (
    <FormControl classes={{ root: classes.formControl }}>
      {label && <div>{label}</div>}
      <Select
        classes={{
          select: classes.select,
          icon: classes.icon,
        }}
        disableUnderline
        MenuProps={{
          classes: {
            paper: classes.menu,
          },
        }}
        value={selected}
        onChange={e => onChange(e.target.value)}
        {...props}
      >
        {data.map(item => {
          return (
            <MenuItem key={item} value={item} className={classes.menuItem}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default withStyles(styles)(SimpleSelect);
