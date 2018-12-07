import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  min-height: 70px;
  color: #fefefe;
  padding: 5px;
  font-size: 14px;
`;

export interface IFilterBoxProps {
  label: string;
  children: React.ReactNode;
}
const FilterBox: React.SFC<IFilterBoxProps> = ({ label, children }) => (
  <Box>
    <div>{label}</div>
    {children}
  </Box>
);
export default FilterBox;
