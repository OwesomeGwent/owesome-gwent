import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
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
  FilterType,
  IFilter,
  IMultiFilter,
  MultiFilterField,
} from '../types/filter';
import { ThunkFunc } from '../types/thunk';
const Container = styled('div')<{ open: boolean }>`
  padding: 10px;
  margin-top: 10px;
  z-index: 1000;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.5);
  background-color: #121315;
  background-image: url(/img/background/bg.jpg);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
  max-height: 1000px;
  ${props =>
    !props.open &&
    `
      padding: 0px;
      max-height: 0px;
    `}
  transition: all 0.3s ease-in-out;
`;
const OpenButton = styled.div`
  width: 100%;
  text-align: right;
  z-index: 1000;
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
  setFilter: (field: FilterField, value: FilterType) => void;
  setMultiFilter: typeof filterAction.setMultiFilter;
  setSearchFilter: typeof filterAction.setSearchFilter;
  clearFilter: typeof filterAction.clearFilter;
}
class Filter extends React.Component<IFilterProps> {
  public state = {
    open: true,
  };
  public openFilter = () => this.setState({ open: true });
  public closeFilter = () => this.setState({ open: false });
  public render() {
    const { open } = this.state;
    const {
      filter,
      multiFilter,
      search,
      setFilter,
      setMultiFilter,
      setSearchFilter,
    } = this.props;
    return (
      <>
        <Container open={open}>
          <Button
            color="#f9748a"
            style={{ float: 'right', minWidth: 50, fontSize: 14 }}
            onClick={this.closeFilter}
          >
            Close
          </Button>
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
                placeHolder={`Select ${field}`}
              />
            );
          })}
          <SearchFilter search={search} setSearch={setSearchFilter} />
        </Container>
        {!open && (
          <OpenButton>
            <Button
              onClick={this.openFilter}
              style={{ minWidth: 50, fontSize: 14 }}
            >
              👐 Open
            </Button>
          </OpenButton>
        )}
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
