import React, { Component } from 'react';
import styled from 'styled-components';
import { Noti } from '.';
import { INoti } from '../../helpers/notify';
const Factory = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
`;
const InnerFactory = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
  width: 100%;
`;
export interface INotiFactory {
  noties: INoti[];
  remove: (id: number) => void;
}
class NotiFactory extends Component<INotiFactory> {
  public render() {
    const { noties, remove } = this.props;
    return (
      <Factory>
        <InnerFactory>
          {noties.map(noti => (
            <Noti key={noti.id} remove={remove} {...noti} />
          ))}
        </InnerFactory>
      </Factory>
    );
  }
}

export default NotiFactory;
