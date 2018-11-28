import React, { PureComponent } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  min-width: 500px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background-color: #24282a;
  border-radius: 10px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
`;
const Button = styled.button`
  border: none;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 120px;
  padding: 20px;
  margin: 20px auto;
  color: #1f90df;
  cursor: pointer;
  &:hover {
    transition: background-color 0.3s;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const Message = styled.div`
  color: white;
  margin-top: 10px;
  text-align: center;
  background: rgba(100, 0, 0, 0.2);
  padding: 20px;
`;
export interface IFormProps {
  title: string;
  action: string;
  message?: string;
  onSubmit: () => void;
}
class Form extends PureComponent<IFormProps> {
  public handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onSubmit();
  };
  public render() {
    const { title, action, children, message } = this.props;
    return (
      <FormContainer onSubmit={this.handleSubmit}>
        <h1 style={{ color: 'white', textAlign: 'center' }}>{title}</h1>
        {children}
        {message && <Message>{message}</Message>}
        <Button onClick={this.handleSubmit}>{action}</Button>
      </FormContainer>
    );
  }
}

export default Form;
