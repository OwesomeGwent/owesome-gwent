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
import { FilterField, FilterType } from '../../types/filter';

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
export interface IFilterProps extends WithStyles<typeof styles> {}
const Filter: React.SFC<IFilterProps> = ({ classes }) => {
  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary
        className={classes.panelSummary}
        expandIcon={<ExpandMoreIcon />}
      >
        필터~
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        까꿍~
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(Filter);
