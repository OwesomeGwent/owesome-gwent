import React, { Component } from 'react';

export interface ILoginProps {
  closeModal: () => void;
}
class Login extends Component<ILoginProps> {
  public render() {
    return <div tabIndex={-1}>Hi!</div>;
  }
}

export default Login;
