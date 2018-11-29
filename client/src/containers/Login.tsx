import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as UserActions from '../actions/user';
import { Field, Form } from '../components/Common';
import { IRootState } from '../reducers';
import { Status } from '../types/status';

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
export interface ILoginProps {
  openSignup: () => void;
  closeModal: () => void;
  login: typeof UserActions.login;
  loginStatus: Status;
}
interface ILoginState {
  username: string;
  password: string;
  message: string;
}
class Login extends Component<ILoginProps, ILoginState> {
  public state = {
    username: '',
    password: '',
    message: '',
  };
  public handleChange = (field: keyof ILoginState) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      [field]: e.target.value,
      message: '',
    } as Pick<ILoginState, keyof ILoginState>);
  };
  public handleLogin = async () => {
    const { username, password } = this.state;
    await this.props.login(username, password);
    const { loginStatus, closeModal } = this.props;
    if (loginStatus === 'SUCCESS') {
      closeModal();
    } else {
      this.setState({
        message: 'Incorrect username or password.',
      });
    }
  };
  public render() {
    const { username, password, message } = this.state;
    const { openSignup } = this.props;
    return (
      <Form
        title="Log in"
        action="Log in"
        onSubmit={this.handleLogin}
        message={message}
      >
        <TextWithLink>
          No account? <span onClick={openSignup}>Create one</span>
        </TextWithLink>
        <Field
          autoComplete="username"
          onChange={this.handleChange('username')}
          variant="filled"
          value={username}
          fullWidth
          label="Username"
        />
        <Field
          autoComplete="current-password"
          onChange={this.handleChange('password')}
          value={password}
          fullWidth
          label="Password"
          variant="filled"
          type="password"
        />
      </Form>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  loginStatus: state.user.login.status,
});
export default connect(
  mapStateToProps,
  { login: UserActions.login },
)(Login);
