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
import { FilterItem } from '.';
import * as filterAction from '../../actions/filter';
import { IRootState } from '../../reducers';
import { FilterField, filterSet, IFilter } from '../../types/filter';
const styles = (theme: Theme) =>
  createStyles({
    panel: {
      color: theme.palette.primary.contrastText,
    },
    panelSummary: {
      backgroundColor: theme.palette.primary.dark,
    },
    panelDetails: {
      backgroundColor: theme.palette.primary.light,
    },
  });
export interface IFilterProps extends WithStyles<typeof styles> {
  filter: IFilter;
  setFilter: typeof filterAction.setFilter;
  clearFilter: typeof filterAction.clearFilter;
}
const Filter: React.SFC<IFilterProps> = ({ classes, filter, setFilter }) => {
  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary
        className={classes.panelSummary}
        expandIcon={<ExpandMoreIcon />}
      >
        필터~
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        {Object.keys(filterSet).map(field => {
          const asseted = field as FilterField;
          return (
            <FilterItem
              key={field}
              filter={asseted}
              setFilter={setFilter}
              selected={filter[asseted]}
            />
          );
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const mapStateToProps = (state: IRootState) => ({
  filter: state.filter.filter,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { ...filterAction },
  )(Filter),
);
