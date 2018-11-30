import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as UserActions from '../actions/user';
import { Field, Form } from '../components/Common';
import { IRootState } from '../reducers';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';
import { ISignupUser } from '../types/user';

const VALID_REG: { [field: string]: string } = {
  username: '^[a-z0-9_]{6,15}$',
  password: '^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$',
};
const ERROR_MESSAGE: { [field: string]: string } = {
  username: 'Username must be 6 to 15 characters without special caharacter.',
  password:
    'Must contain 8 ~ 20 characters, at least one number and special character.',
  passwordConfirm: 'Must match with Password.',
};

const TextWithLink = styled.div`
  width: 100%;
  color: white;
  text-align: right;
  margin-top: 10px;
  span {
    color: #1f90df;
    cursor: pointer;
  }
`;
export interface ISignupProps {
  openLogin: () => void;
  closeModal: () => void;
  signup: (user: ISignupUser) => void;
  signupStatus: Status;
  signupError: string;
}
interface ISignupState {
  username: string;
  password: string;
  passwordConfirm: string;
  message: string;
  error: {
    [field: string]: string;
  };
}
type SignupField = keyof Pick<
  ISignupState,
  'username' | 'password' | 'passwordConfirm'
>;

class Signup extends Component<ISignupProps, ISignupState> {
  public state = {
    username: '',
    password: '',
    passwordConfirm: '',
    message: '',
    error: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
  };
  public componentDidUpdate(_: ISignupProps, prevState: ISignupState) {
    if (prevState.username !== this.state.username) {
      this.checkField('username');
    }
    if (prevState.password !== this.state.password) {
      this.checkField('password');
      this.checkPasswordConfirm();
    } else if (prevState.passwordConfirm !== this.state.passwordConfirm) {
      this.checkPasswordConfirm();
    }
  }
  public checkField = (field: SignupField) => {
    const fieldState = this.state[field];
    let error = '';
    if (!fieldState.match(VALID_REG[field])) {
      error = ERROR_MESSAGE[field];
    }
    this.setState(
      (prevState: ISignupState) =>
        ({
          ...prevState,
          error: {
            ...prevState.error,
            [field]: error,
          },
        } as Pick<ISignupState, SignupField>),
    );
  };
  public checkPasswordConfirm = () => {
    const { password, passwordConfirm } = this.state;
    let error = '';
    if (password !== passwordConfirm) {
      error = ERROR_MESSAGE.passwordConfirm;
    }
    this.setState((prevState: ISignupState) => ({
      ...prevState,
      error: {
        ...prevState.error,
        passwordConfirm: error,
      },
    }));
  };
  public handleChange = (field: SignupField) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      [field]: e.target.value,
      message: '',
    } as Pick<ISignupState, SignupField & 'message'>);
  };
  public handleSignup = async () => {
    const { username, password, passwordConfirm, error } = this.state;
    const hasEmptyField = !username || !password || !passwordConfirm;
    const hasError = Object.values(error).some(valid => !!valid);
    if (hasError || hasEmptyField) {
      this.setState({
        message: '양식에 맞춰줘',
      });
      return;
    }
    await this.props.signup({ username, password });
    const { openLogin, signupStatus, signupError } = this.props;
    if (signupStatus === 'SUCCESS') {
      openLogin();
    } else if (signupStatus === 'FAILURE') {
      this.setState({
        message: signupError,
      });
    }
  };
  public render() {
    const { username, password, passwordConfirm, error, message } = this.state;
    const { openLogin } = this.props;
    return (
      <Form
        title="Sign up"
        action="Sign up"
        onSubmit={this.handleSignup}
        message={message}
      >
        <TextWithLink>
          Have an account? <span onClick={openLogin}>Log in</span>
        </TextWithLink>
        <Field
          autoComplete="username"
          error={!!error.username}
          helperText={error.username}
          onChange={this.handleChange('username')}
          variant="filled"
          value={username}
          fullWidth
          label="Username"
        />
        <Field
          autoComplete="new-password"
          error={!!error.password}
          helperText={error.password}
          onChange={this.handleChange('password')}
          value={password}
          fullWidth
          label="Password"
          variant="filled"
          type="password"
        />
        <Field
          autoComplete="new-password"
          error={!!error.passwordConfirm}
          helperText={error.passwordConfirm}
          onChange={this.handleChange('passwordConfirm')}
          value={passwordConfirm}
          fullWidth
          label="Password Confirm"
          variant="filled"
          type="password"
        />
      </Form>
    );
  }
}
const mapStateToProps = (state: IRootState) => ({
  signupStatus: state.user.signup.status,
  signupError: state.user.signup.error,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  signup: (user: ISignupUser) => dispatch(UserActions.signup(user)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
