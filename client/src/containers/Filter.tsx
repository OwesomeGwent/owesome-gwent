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
import { Button, FloatingBox } from '../components/Common';
import {
  FilterItem,
  MultiFilterItem,
  SearchFilter,
} from '../components/Filter';
import { media } from '../helpers/media';
import { IRootState } from '../reducers';
import { getMultiFilterByLocale } from '../selectors/filter';
import {
  FilterField,
  filterSet,
  FilterType,
  IFilter,
  IMultiFilter,
  MultiFilterField,
} from '../types/filter';
import { ThunkFunc } from '../types/thunk';

const FilterButton = styled.div`
  position: fixed;
  top: 70px;
  right: 5px;

  @media (max-width: ${media.phone}px) {
    top: '';
    bottom: 10px;
  }
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
  isMobile: boolean;
  search: string;
  filter: IFilter;
  multiFilter: IMultiFilter;
  setFilter: (field: FilterField, value: FilterType) => void;
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
      isMobile,
    } = this.props;
    const MainFilter = (
      <>
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
      </>
    );
    if (!isMobile) {
      return <FloatingBox>{MainFilter}</FloatingBox>;
    }
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
          {MainFilter}
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
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  setFilter: (field: FilterField, value: FilterType) =>
    dispatch(filterAction.setFilter(field, value)),
  setMultiFilter: (field: MultiFilterField, values: string[]) =>
    dispatch(filterAction.setMultiFilter(field, values)),
  setSearchFilter: (search: string) =>
    dispatch(filterAction.setSearchFilter(search)),
  clearFilter: () => dispatch(filterAction.clearFilter),
});
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Filter),
);
