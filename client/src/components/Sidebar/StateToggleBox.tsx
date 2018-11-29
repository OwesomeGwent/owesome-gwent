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
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);

  &:hover {
    transition: background-color 0.1s;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const StateToggleBox: React.SFC<IStateToggleBoxProps> = ({
  backgroundLeader,
  onToggle,
}) => {
  return (
    <DeckToggleBox backgroundCard={backgroundLeader}>
      <Button onClick={onToggle}>Start Deck Building 🚀</Button>
    </DeckToggleBox>
  );
};

export default StateToggleBox;
