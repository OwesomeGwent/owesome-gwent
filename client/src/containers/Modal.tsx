import UIModal from '@material-ui/core/Modal';
import React, { Component } from 'react';
import { ModalContext } from '../contexts';

interface IWithModalState {
  open: boolean;
  comp: React.ReactNode;
}
const getModalStyle = () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
class Modal extends Component<{}, IWithModalState> {
  public state = {
    comp: null,
    open: false,
  };
  public openModal = (comp: React.ReactNode) => {
    this.setState({
      comp,
      open: true,
    });
  };
  public closeModal = () => {
    this.setState({ comp: null, open: false });
  };
  public render() {
    const { comp, open } = this.state;
    const { children } = this.props;
    return (
      <ModalContext.Provider
        value={{ openModal: this.openModal, closeModal: this.closeModal }}
      >
        {children}
        <UIModal
          style={getModalStyle()}
          open={open}
          onClose={this.closeModal}
          aria-labelledby="modal"
          aria-describedby="modal"
        >
          {comp}
        </UIModal>
      </ModalContext.Provider>
    );
  }
}

export default Modal;
