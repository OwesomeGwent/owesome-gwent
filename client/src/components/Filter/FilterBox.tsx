import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  vertical-align: middle;
  min-height: 70px;
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
