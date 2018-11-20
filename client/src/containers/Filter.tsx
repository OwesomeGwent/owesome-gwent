import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { connect } from 'react-redux';
import * as filterAction from '../actions/filter';
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

const styles = (theme: Theme) =>
  createStyles({
    panel: {
      color: theme.palette.primary.contrastText,
    },
    panelSummary: {
      backgroundColor: theme.palette.primary.dark,
    },
    panelDetails: {
      display: 'block',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    expandIcon: {
      color: theme.palette.primary.contrastText,
    },
  });
export interface IFilterProps extends WithStyles<typeof styles> {
  filter: IFilter;
  multiFilter: IMultiFilter;
  setFilter: typeof filterAction.setFilter;
  setMultiFilter: typeof filterAction.setMultiFilter;
  setSearchFilter: typeof filterAction.setSearchFilter;
  clearFilter: typeof filterAction.clearFilter;
}
const Filter: React.SFC<IFilterProps> = ({
  classes,
  filter,
  multiFilter,
  setFilter,
  setMultiFilter,
  setSearchFilter,
}) => {
  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary
        classes={{
          root: classes.panelSummary,
          expandIcon: classes.expandIcon,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        필터~
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
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
          <SearchFilter setSearch={setSearchFilter} />
        </>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const mapStateToProps = (state: IRootState) => ({
  filter: state.filter.filter,
  multiFilter: getMultiFilterByLocale(state),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { ...filterAction },
  )(Filter),
);
