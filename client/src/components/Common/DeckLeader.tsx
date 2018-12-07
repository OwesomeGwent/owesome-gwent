import React from 'react';
import styled from 'styled-components';

import { LEADER_IMAGE_PATH } from '../../apis/defs';
export interface ILeaderIconProps {
  artId: string;
  name?: string;
}

const View = styled.div`
  display: flex;
  padding-top: 20px;
  font-size: 24px;
  color: white;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 100%;
  margin-right: 10px;
`;
const LeaderView: React.SFC<ILeaderIconProps> = ({ artId, name }) => (
  <View>
    <Icon src={`${LEADER_IMAGE_PATH}/${artId}0000.png`} alt="leader" />
    {name}
  </View>
);

export default LeaderView;
