import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import TextField, {
  FilledTextFieldProps,
  TextFieldProps,
} from '@material-ui/core/TextField';
import React, { Component } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    cssFocused: {},
    textField: {
      marginTop: 10,
    },
    input: {
      minHeight: 30,
      color: theme.palette.secondary.contrastText,
    },
    inputLabel: {
      color: theme.palette.secondary.contrastText,
      '&$cssFocused': {
        color: theme.palette.secondary.contrastText,
      },
    },
    underline: {
      borderBottom: 0,
      '&:before': {
        borderBottom: 0,
      },
    },
  });

export interface IFieldProps extends WithStyles<typeof styles> {}
class Field extends Component<IFieldProps & FilledTextFieldProps> {
  public render() {
    const { classes, ...rest } = this.props;
    return (
      <TextField
        className={classes.textField}
        variant="filled"
        InputProps={{
          classes: {
            input: classes.input,
            underline: classes.underline,
          },
        }}
        InputLabelProps={{
          classes: {
            root: classes.inputLabel,
            focused: classes.cssFocused,
          },
        }}
        {...rest}
      />
    );
  }
}

export default withStyles(styles)(Field);
