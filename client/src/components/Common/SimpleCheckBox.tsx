import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import React from 'react';

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
export interface ISimpleCheckboxProps extends WithStyles<typeof styles> {
  checked: boolean;
  value: string;
  label?: string;
  onClick: (value: string) => void;
}
const SimpleCheckBox: React.SFC<ISimpleCheckboxProps> = ({
  checked,
  classes,
  label,
  value,
  onClick,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          type="radio"
          checked={checked}
          classes={{
            root: classes.root,
            checked: classes.checked,
          }}
          value={value}
          onClick={() => onClick(value)}
        />
      }
      label={<span className={classes.root}>{label}</span>}
    />
  );
};

export default withStyles(styles)(SimpleCheckBox);
