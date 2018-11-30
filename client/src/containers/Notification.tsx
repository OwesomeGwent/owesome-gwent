import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { NotiFactory } from '../components/Notification';
import { INoti, Notify } from '../helpers/notify';

export interface INotificationProps {
  notify: Notify;
}
interface INotificationState {
  noties: INoti[];
}
class Notification extends Component<INotificationProps, INotificationState> {
  public root: HTMLDivElement;
  public state = {
    noties: [],
  };
  constructor(props: INotificationProps) {
    super(props);
    this.root = document.createElement('div');
    this.root.id = 'notification-root';
    document.body.appendChild(this.root);
  }
  public componentDidMount() {
    this.props.notify.subscribe(getNoties => {
      const noties = getNoties();
      this.setState({
        noties,
      });
    });
  }
  public render() {
    const { noties } = this.state;
    const { notify } = this.props;
    return createPortal(
      <NotiFactory noties={noties} remove={notify.remove} />,
      this.root,
    );
  }
}

export default Notification;
