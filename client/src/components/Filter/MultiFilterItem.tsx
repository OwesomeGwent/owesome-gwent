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
import { FilterBox } from '.';
import * as FilterAction from '../../actions/filter';
import {
  FilterType,
  IMultiFilterList,
  MultiFilterField,
} from '../../types/filter';

const LABEL = {
  categoryIds: 'categories',
  keywords: 'keywords',
};

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
export interface IMultiFilterItem extends WithStyles<typeof styles> {
  filter: IMultiFilterList[];
  field: MultiFilterField;
  setMultiFilter: typeof FilterAction.setMultiFilter;
  selected?: FilterType;
}
const MultiFilterItem: React.SFC<IMultiFilterItem> = ({
  classes,
  field,
  filter,
  setMultiFilter,
  selected,
}) => {
  return (
    <FilterBox label={LABEL[field].toUpperCase()}>
      <FormControl classes={{ root: classes.formControl }}>
        <Select
          autoWidth
          classes={{
            select: classes.select,
            icon: classes.icon,
          }}
          disableUnderline
          multiple
          MenuProps={{
            classes: {
              paper: classes.menu,
            },
          }}
          value={selected || []}
          onChange={e => setMultiFilter(field, e.target.value as any)}
        >
          {filter.map(item => {
            return Object.entries(item).map(([label, value]) => (
              <MenuItem key={label} value={value} className={classes.menuItem}>
                {label}
              </MenuItem>
            ));
          })}
        </Select>
      </FormControl>
    </FilterBox>
  );
};

export default withStyles(styles)(MultiFilterItem);
