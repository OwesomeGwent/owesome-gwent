import React from 'react';
import styled from 'styled-components';
import { BASE_IMAGE_PATH } from '../../apis/defs';

interface IStateToggleBoxProps {
  backgroundLeader: string;
  onToggle(): void;
}

// prettier-ignore
const Box = styled.div`
<<<<<<< HEAD
  position: sticky;
  top: 20px;
  width: 100%;
=======
  width: 80%;
  margin: auto;
>>>>>>> bbde7e1d1869cf50a16b50ea4fcfd9de98cb82da
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 10px #000000;
  background-image: url(${({ backgroundLeader }:{ backgroundLeader: string }) => `${BASE_IMAGE_PATH}/${backgroundLeader}0000.png`});
  background-size: 312px;
  background-position: 30% 5%;
`;

const Button = styled.button`
  font-size: 16px;
  height: 3rem;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2rem;
`;

const StateToggleBox: React.SFC<IStateToggleBoxProps> = ({
  backgroundLeader,
  onToggle,
}) => {
  return (
    <Box backgroundLeader={backgroundLeader}>
      <Button onClick={onToggle}>덱 만들기</Button>
    </Box>
  );
};

export default StateToggleBox;
