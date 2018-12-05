import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardData } from '../../../../shared/ICardData';
import { CardLocaleData } from '../../../../shared/ILocaleData';
import { history } from '../../helpers/history';
import { IRootState } from '../../reducers';
import {
  getFactions,
  getLeadersWithLocaleName,
} from '../../selectors/collection';
import { IOrderQuery, ISearchQuery } from '../../types/collection';
import { SimpleCheckBox, SimpleSelect } from '../Common';
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem auto;
`;
const Order = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Filter = styled.div`
  margin: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const FilterHeader = styled.div`
  color: #fefefe;
  margin-right: 20px;
  font-size: 20px;

  padding: 5px 10px;
`;
const Search = styled.div`
  flex: 0;
`;
const SearchBar = styled.input`
  color: white;
  background-color: inherit;
  border: none;
  border-bottom: 1px solid white;
  outline: none;
  font-size: 20px;
  line-height: 1.5;
  padding: 5px 0px;
`;

export interface ICollectionFilterProps {
  q: string;
  faction: string;
  factions: string[];
  leaders: Array<CardData & CardLocaleData>;
  leaderId: string;
  order: IOrderQuery;
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
    Object.entries(search).forEach(([key, field]) => {
      if (!field) {
        search[key] = undefined;
      }
    });
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
  public handleOrderChange = (value: string) => {
    this.handlePush({
      order: value as IOrderQuery,
    });
  };
  public getLeadersByFaction = (faction: string) => {
    const { leaders } = this.props;
    return leaders
      .filter(leader => leader.faction === faction)
      .map(leader => ({ label: leader.name, value: leader.ingameId }));
  };
  public getOrders = () => {
    return ['star', ''].map(order => ({
      label: order ? order : 'latest',
      value: order,
    }));
  };
  public render() {
    const { search } = this.state;
    const { faction, factions, leaderId, order } = this.props;
    return (
      <div>
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
              placeHolder="👑 Select Leader"
            />
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
        <Order>
          <SimpleSelect
            items={this.getOrders()}
            selected={order}
            placeHolder="Select Order"
            handleChange={this.handleOrderChange}
          />
        </Order>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  factions: getFactions(state),
  leaders: getLeadersWithLocaleName(state),
});
export default connect(mapStateToProps)(CollectionFilter);
