import throttle from 'lodash/throttle';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as CollectionActions from '../actions/collection';
import * as DeckActions from '../actions/deck';
import { CollectionFilter, CollectionList } from '../components/Collection';
import { IRootState } from '../reducers';
import {
  ICollection,
  ICollectionQuery,
  ISearchQuery,
} from '../types/collection';
import { IDeck } from '../types/deck';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';
export interface ICollectionProps extends RouteComponentProps {
  collection: ICollection[];
  status: Status;
  error: string;
  isLast: boolean;
  setCurrentDeck: (deck: IDeck) => void;
  fetchCollection: (payload: ICollectionQuery) => void;
}
class Collection extends React.Component<ICollectionProps> {
  public getNextPage = throttle((payload: ICollectionQuery) => {
    const { collection, fetchCollection } = this.props;
    const basePayload = {
      skip: collection.length,
      limit: 30,
      search: this.getSearchQuery(),
    };
    fetchCollection({ ...basePayload, ...payload });
  }, 1000);
  public async componentDidMount() {
    if (this.props.history.action === 'PUSH') {
      this.getNextPage({ skip: 0 });
    } else if (this.props.collection.length <= 0) {
      this.getNextPage({});
    }
  }
  public componentDidUpdate(prevProps: ICollectionProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.props.fetchCollection({ skip: 0, search: this.getSearchQuery() });
    }
  }
  public getSearchQuery = () => {
    let search: Required<ISearchQuery> = {
      q: '',
      faction: '',
      leaderId: '',
    };
    const parsed = queryString.parse(this.props.location.search);
    Object.keys(search).forEach(query => {
      const q = parsed[query];
      if (q) {
        search = { ...search, [query]: Array.isArray(q) ? q[0] : q };
      }
    });
    return search;
  };
  public render() {
    const { setCurrentDeck, collection, status, isLast } = this.props;
    const { q, faction, leaderId } = this.getSearchQuery();
    return (
      <div style={{ width: '100%' }}>
        <CollectionFilter q={q} faction={faction} leaderId={leaderId} />
        <CollectionList
          status={status}
          collection={collection}
          setCurrentDeck={setCurrentDeck}
          fetchMore={this.getNextPage}
          isLast={isLast}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: state.collection.collection,
  status: state.collection.status,
  error: state.collection.error,
  isLast: state.collection.isLast,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  setCurrentDeck: (deck: IDeck) => dispatch(DeckActions.setCurrentDeck(deck)),
  fetchCollection: (payload: ICollectionQuery) =>
    dispatch(CollectionActions.fetchCollection(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Collection);
