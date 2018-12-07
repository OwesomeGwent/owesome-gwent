import UIModal from '@material-ui/core/Modal';
import React, { Component, CSSProperties } from 'react';
import { ModalContext } from '../contexts';

interface IWithModalState {
  open: boolean;
  comp: React.ReactNode;
}
const getModalStyle = (): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '80vh',
  overflowY: 'auto',
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
          disableAutoFocus
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
