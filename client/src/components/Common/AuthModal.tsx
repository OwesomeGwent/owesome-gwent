import React from 'react';
import { Login, Signup } from '../../containers';
import { ModalContext } from '../../contexts';

export interface IAuthModalProps {
  render: (loginAction: IAuthModal) => React.ReactNode;
}
interface IAuthModal {
  openLogin: () => void;
  openSignup: () => void;
  openModal: (children: React.ReactNode) => void;
  closeModal: () => void;
}
class AuthModal extends React.Component<IAuthModalProps> {
  public openLogin = (
    openModal: (children: React.ReactNode) => void,
    closeModal: () => void,
  ) => {
    return () =>
      openModal(
        <Login
          openSignup={this.openSignup(openModal, closeModal)}
          closeModal={closeModal}
        />,
      );
  };
  public openSignup = (
    openModal: (children: React.ReactNode) => void,
    closeModal: () => void,
  ) => {
    return () =>
      openModal(
        <Signup
          openLogin={this.openLogin(openModal, closeModal)}
          closeModal={closeModal}
        />,
      );
  };
  public render() {
    return (
      <ModalContext.Consumer>
        {({ openModal, closeModal }) => {
          return this.props.render({
            openLogin: this.openLogin(openModal, closeModal),
            openSignup: this.openSignup(openModal, closeModal),
            openModal,
            closeModal,
          });
        }}
      </ModalContext.Consumer>
    );
  }
}

export default AuthModal;
