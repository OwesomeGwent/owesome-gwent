import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData, Faction } from '../../../../shared/ICardData';
import { CardLocaleData } from '../../../../shared/ILocaleData';
import { history } from '../../helpers/history';
import { IRootState } from '../../reducers';
import {
  getFactions,
  getLeadersWithLocaleName,
} from '../../selectors/collection';
import { ICollectionQuery, ISearchQuery } from '../../types/collection';
import { SimpleCheckBox, SimpleSelect } from '../Common';
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem auto;
`;
const Filter = styled.div`
  margin: 10px;
  flex: 1;
  display: flex;
  align-items: center;
`;
const FilterHeader = styled.div`
  color: #fefefe;
  margin-right: 20px;
  font-size: 20px;

  padding: 5px 10px;
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
`;

export interface ICollectionFilterProps {
  q: string;
  faction: string;
  factions: string[];
  leaders: Array<CardData & CardLocaleData>;
  leaderId: string;
}
class CollectionFilter extends React.Component<ICollectionFilterProps> {
  public state = {
    search: this.props.q,
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
  public handlePush = (search: ISearchQuery) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({
        ...queryString.parse(history.location.search),
        ...search,
      }),
    });
  };
  public handleSearch = () => {
    this.handlePush({ q: this.state.search });
  };
  public handleFactionChange = (value: string) => {
    const isSelected = this.props.faction === value;
    this.handlePush({
      faction: isSelected ? undefined : value,
      leaderId: undefined,
    });
  };
  public handleLeaderChange = (value: string) => {
    this.handlePush({
      faction: this.props.faction,
      leaderId: value || undefined,
    });
  };
  public getLeadersByFaction = (faction: string) => {
    const { leaders } = this.props;
    return leaders
      .filter(leader => leader.faction === faction)
      .map(leader => ({ label: leader.name, value: leader.ingameId }));
  };
  public render() {
    const { search } = this.state;
    const { faction, factions, leaderId } = this.props;
    return (
      <Container>
        <Filter>
          <FilterHeader>☑️ Select Faction</FilterHeader>
          {factions.map(item => (
            <SimpleCheckBox
              checked={faction === item}
              key={item}
              label={item}
              value={item}
              onClick={this.handleFactionChange}
            />
          ))}
          <SimpleSelect
            items={this.getLeadersByFaction(faction)}
            selected={leaderId}
            handleChange={this.handleLeaderChange}
          />
          }
        </Filter>
        <Search>
          <label htmlFor="search_bar">🔍</label>
          <SearchBar
            id="search_bar"
            value={search}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleKeyPress}
          />
        </Search>
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  factions: getFactions(state),
  leaders: getLeadersWithLocaleName(state),
});
export default connect(mapStateToProps)(CollectionFilter);
