import CircularProgress from '@material-ui/core/CircularProgress';
import React, { SFC } from 'react';
import styled from 'styled-components';
export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
}
const Default = styled.button`
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

const Button: SFC<IButtonProps> = ({ children, loading, ...props }) => (
  <Default disabled={loading} {...props}>
    {loading ? <CircularProgress /> : children}
  </Default>
);
export default Button;
