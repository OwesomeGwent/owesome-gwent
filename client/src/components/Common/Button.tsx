import styled from 'styled-components';

export interface IButtonProps {
  color?: string;
  fullWidth?: boolean;
}
const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: inherit;
  width: ${(props: IButtonProps) => (props.fullWidth ? '100%' : '120px')};
  padding: 10px;
  color: ${(props: IButtonProps) => (props.color ? props.color : 'white')};
  cursor: pointer;
  &:hover {
    transition: background-color 0.3s;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export default Button;
