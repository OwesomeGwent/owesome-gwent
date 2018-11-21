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
import * as FilterAction from '../../actions/filter';
import { FilterField, filterSet, FilterType } from '../../types/filter';

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
  setFilter: typeof FilterAction.setFilter;
  selected?: FilterType;
}
const FilterItem: React.SFC<IFilterItem> = ({
  classes,
  filter,
  setFilter,
  selected,
}) => {
  const filterEnum = filterSet[filter];
  return (
    <FilterBox label={filter.toUpperCase()}>
      <FormGroup row>
        {Object.entries(filterEnum).map(([field, value], i) => {
          return (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  type="radio"
                  checked={!!selected && selected === value}
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  onClick={() => setFilter(filter, value as FilterType)}
                />
              }
              label={<span className={classes.root}>{filterEnum[field]} </span>}
            />
          );
        })}
      </FormGroup>
    </FilterBox>
  );
};

export default withStyles(styles)(FilterItem);
