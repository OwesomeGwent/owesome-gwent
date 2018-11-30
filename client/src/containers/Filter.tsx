import Drawer from '@material-ui/core/Drawer';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import FilterList from '@material-ui/icons/FilterList';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as filterAction from '../actions/filter';
import { Button } from '../components/Common';
import {
  FilterItem,
  MultiFilterItem,
  SearchFilter,
} from '../components/Filter';
import { IRootState } from '../reducers';
import { getMultiFilterByLocale } from '../selectors/filter';
import {
  FilterField,
  filterSet,
  IFilter,
  IMultiFilter,
  MultiFilterField,
} from '../types/filter';

const FilterButton = styled.div`
  position: fixed;
  top: 70px;
  right: 5px;
`;
const CloseButton = styled.div`
  width: 100%;
  text-align: right;
`;
const styles = (theme: Theme) =>
  createStyles({
    paper: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.dark,
    },
  });
export interface IFilterProps extends WithStyles<typeof styles> {
  search: string;
  filter: IFilter;
  multiFilter: IMultiFilter;
  setFilter: typeof filterAction.setFilter;
  setMultiFilter: typeof filterAction.setMultiFilter;
  setSearchFilter: typeof filterAction.setSearchFilter;
  clearFilter: typeof filterAction.clearFilter;
}
class Filter extends React.Component<IFilterProps> {
  public state = {
    open: false,
  };
  public openFilter = () => this.setState({ open: true });
  public closeFilter = () => this.setState({ open: false });
  public render() {
    const { open } = this.state;
    const {
      classes,
      filter,
      multiFilter,
      search,
      setFilter,
      setMultiFilter,
      setSearchFilter,
    } = this.props;
    return (
      <>
        <FilterButton>
          <Button onClick={this.openFilter}>
            <FilterList />
          </Button>
        </FilterButton>
        <Drawer
          anchor="top"
          open={open}
          onClose={this.closeFilter}
          PaperProps={{
            className: classes.paper,
          }}
        >
          {Object.keys(filterSet).map(field => {
            const asserted = field as FilterField;
            return (
              <FilterItem
                key={field}
                filter={asserted}
                setFilter={setFilter}
                selected={filter[asserted]}
              />
            );
          })}
          {Object.keys(multiFilter).map(field => {
            const asserted = field as MultiFilterField;
            return (
              <MultiFilterItem
                key={field}
                field={asserted}
                filter={multiFilter[asserted]}
                setMultiFilter={setMultiFilter}
                selected={filter[asserted]}
              />
            );
          })}
          <SearchFilter search={search} setSearch={setSearchFilter} />
          <CloseButton>
            <Button onClick={this.closeFilter}>
              <Close />
            </Button>
          </CloseButton>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  search: state.filter.search,
  filter: state.filter.filter,
  multiFilter: getMultiFilterByLocale(state),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { ...filterAction },
  )(Filter),
);
