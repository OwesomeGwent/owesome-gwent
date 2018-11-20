import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import debounce from 'lodash/debounce';
import React, { SFC } from 'react';
import { FilterBox } from '.';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.contrastText,
    },
    underline: {
      borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
      '&:before': {
        borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
      },
    },
  });
export interface ISearchFilterProps extends WithStyles<typeof styles> {
  setSearch: (search: string) => void;
}

const debounced = debounce(
  (setSearch: (search: string) => void, search: string) => {
    setSearch(search);
  },
  500,
);
const SearchFilter: SFC<ISearchFilterProps> = ({ classes, setSearch }) => {
  return (
    <FilterBox label="SEARCH">
      <Input
        type="search"
        placeholder="Search cards by name"
        classes={{
          root: classes.root,
          underline: classes.underline,
        }}
        onChange={e => debounced(setSearch, e.target.value)}
      />
    </FilterBox>
  );
};

export default withStyles(styles)(SearchFilter);
