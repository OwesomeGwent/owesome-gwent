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
import { SimpleSelect } from '../Common';

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
      borderRadius: 10,
      padding: 10,
      '&$focused': {
        borderRadius: 10,
      },
    },
    input: {
      '&$focused': {
        borderRadius: 10,
      },
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
  placeHolder?: string;
}
const makeSelectable = (filter: any) => {
  return filter.map((item: any) => {
    let selectable;
    Object.entries(item).forEach(([key, value]) => {
      selectable = {
        label: key as string,
        value: value as string,
      };
    });
    return selectable;
  });
};

const MultiFilterItem: React.SFC<IMultiFilterItem> = ({
  classes,
  field,
  filter,
  setMultiFilter,
  selected,
  placeHolder,
}) => {
  const selectable = makeSelectable(filter);
  return (
    <FilterBox label={LABEL[field].toUpperCase()}>
      <SimpleSelect
        autoWidth
        disableUnderline
        displayEmpty={false}
        multiple
        items={selectable}
        selected={selected || []}
        onChange={(e: any) => {
          setMultiFilter(field, e.target.value as any);
        }}
      />
    </FilterBox>
  );
};

export default withStyles(styles)(MultiFilterItem);
