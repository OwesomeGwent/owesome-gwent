import queryString from 'query-string';
import React from 'react';
import styled from 'styled-components';
import { IFetchCollection } from '../../actions/collection';
import { history } from '../../helpers/history';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Search = styled.div`
  flex: 0;
  flex-basis: 200px;
`;
const SearchBar = styled.input`
  color: white;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  font-size: 20px;
  line-height: 1.5;
  padding: 5px 10px;
  width: 70%;
`;

export interface ICollectionFilterProps {
  fetchMore: (payload: IFetchCollection) => void;
}
class CollectionFilter extends React.Component<ICollectionFilterProps> {
  public state = {
    search: '',
  };
  public handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: e.target.value,
    });
  };
  public handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };
  public handleSearch = () => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({ q: this.state.search }),
    });
  };
  public render() {
    const { search } = this.state;
    return (
      <Container>
        <Search>
          🔍
          <SearchBar
            value={search}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleKeyPress}
          />
        </Search>
      </Container>
    );
  }
}

export default CollectionFilter;
