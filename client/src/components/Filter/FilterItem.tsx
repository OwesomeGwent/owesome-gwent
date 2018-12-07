import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import React from 'react';
import { FilterBox } from '.';
import { FilterField, filterSet, FilterType } from '../../types/filter';
import { SimpleSelect } from '../Common';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.contrastText,
      '&$checked': {
        color: theme.palette.primary.contrastText,
      },
    },
    checked: {},
  });
export interface IFilterItem extends WithStyles<typeof styles> {
  filter: FilterField;
  setFilter: (field: FilterField, value: FilterType) => void;
  selected?: FilterType;
}
const makeSelectable = (filter: any) => {
  return Object.entries(filter).map(([key, value]) => {
    return {
      label: value as string,
      value: value as string,
    };
  });
};
const FilterItem: React.SFC<IFilterItem> = ({
  classes,
  filter,
  setFilter,
  selected,
}) => {
  const filterEnum = filterSet[filter];
  const selectable = makeSelectable(filterEnum);
  return (
    <FilterBox label={filter.toUpperCase()}>
      <FormGroup row>
        <SimpleSelect
          selected={selected ? selected : ''}
          items={selectable}
          handleChange={value => setFilter(filter, value as FilterType)}
          placeHolder={`Select ${filter}`}
        />
      </FormGroup>
    </FilterBox>
  );
};

export default withStyles(styles)(FilterItem);
