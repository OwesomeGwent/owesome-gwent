import React from 'react';
import styled from 'styled-components';
import * as FilterAction from '../../actions/filter';
import { FilterField, filterSet, FilterType } from '../../types/filter';

const ItemWrapper = styled.div`
  width: 150px;
`;
const Title = styled.h3``;
const Item = styled.span`
  color: ${(props: { selected: boolean }) =>
    props.selected ? 'red' : 'black'};
`;
export interface IFilterItem {
  filter: FilterField;
  setFilter: typeof FilterAction.setFilter;
  selected?: FilterType;
}
const FilterItem: React.SFC<IFilterItem> = ({
  filter,
  setFilter,
  selected,
}) => {
  const filterEnum = filterSet[filter];
  return (
    <ItemWrapper>
      <Title>{filter}</Title>
      {Object.entries(filterEnum).map(([field, value], i) => {
        return (
          <Item
            key={i}
            selected={!!selected && selected === value}
            onClick={() => setFilter(filter, value as FilterType)}
          >
            {filterEnum[field]}{' '}
          </Item>
        );
      })}
    </ItemWrapper>
  );
};

export default FilterItem;
