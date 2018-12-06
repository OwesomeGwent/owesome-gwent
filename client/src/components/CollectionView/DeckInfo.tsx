import React from 'react';
import styled from 'styled-components';
import { IDeck } from '../../types/deck';
import { IUser } from '../../types/user';

const Info = styled.div`
  width: 100%;
  color: #fefefe;
  text-align: right;
  div {
    margin-top: 10px;
  }
`;
const Star = styled.div``;
const UserName = styled.div`
  font-size: 20px;
`;

export const DeckInfo: React.SFC<IDeck> = ({ star, user }) => {
  return (
    <Info>
      <UserName>by {user && user.username}</UserName>
      <Star>⭐ {star}</Star>
    </Info>
  );
};

export default DeckInfo;
