import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import { FilterBox } from '.';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.contrastText,
    },
    input: {
      minWidth: 200,
    },
    underline: {
      borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
      '&:before': {
        borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
      },
    },
  });
export interface ISearchFilterProps extends WithStyles<typeof styles> {
  search: string;
  setSearch: (search: string) => void;
}

const debounced = debounce(
  (setSearch: (search: string) => void, search: string) => {
    setSearch(search);
  },
  500,
);
class SearchFilter extends Component<ISearchFilterProps> {
  public state = {
    search: this.props.search,
  };
  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
    debounced(this.props.setSearch, e.target.value);
  };
  public render() {
    const { search } = this.state;
    const { classes } = this.props;
    return (
      <FilterBox label="SEARCH">
        <Input
          type="search"
          placeholder="Search cards by name"
          classes={{
            root: classes.root,
            input: classes.input,
            underline: classes.underline,
          }}
          value={search}
          onChange={this.handleChange}
        />
      </FilterBox>
    );
  }
}

export default withStyles(styles)(SearchFilter);
