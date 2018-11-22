import React from 'react';
import styled from 'styled-components';
import ImageBox from './DefaultImageBox';

interface IStateToggleBoxProps {
  backgroundLeader: string;
  onToggle(): void;
}

// prettier-ignore
const DeckToggleBox = styled(ImageBox)`
  width: 80%;
  height: 300px;
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
    <DeckToggleBox backgroundCard={backgroundLeader}>
      <Button onClick={onToggle}>덱 만들기</Button>
    </DeckToggleBox>
  );
};

export default StateToggleBox;
