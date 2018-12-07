import React from 'react';
import * as CRApi from '../apis/crash';

export default class ErrorBoundary extends React.Component {
  public state = {
    connected: false,
  };
  public async componentDidMount() {
    try {
      const {
        data: { connected },
      } = await CRApi.connectCR();
      this.setState({
        connected,
      });
    } catch (err) {
      console.error(err);
    }
  }
  public componentDidCatch(error: any, info: any) {
    console.log(`${error.message} ${info.componentStack}`);
    CRApi.postCR(`${error.message} ${info.componentStack}`);
  }
  public render() {
    return this.props.children;
  }
}
