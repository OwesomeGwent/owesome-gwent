import React from 'react';
import styled from 'styled-components';
import { BASE_IMAGE_PATH } from '../../apis/defs';

interface IStateToggleBoxProps {
  backgroundLeader: string;
  onToggle(): void;
}

// prettier-ignore
const Box = styled.div`
  width: 80%;
  margin: auto;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 0px #aaaaaa;
  background-image: url(${({ backgroundLeader }:{ backgroundLeader: string }) => `${BASE_IMAGE_PATH}/${backgroundLeader}0000.png`});
`;

const Button = styled.button`
  font-size: 16px;
  border-radius: 3px;
  background-color: #cccccc;
`;

const StateToggleBox: React.SFC<IStateToggleBoxProps> = ({
  backgroundLeader,
  onToggle,
}) => {
  return (
    <Box backgroundLeader={backgroundLeader}>
      <Button onClick={onToggle}>덱 만들기~</Button>
    </Box>
  );
};

export default StateToggleBox;
