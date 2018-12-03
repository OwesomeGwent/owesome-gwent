import debounce from 'lodash/debounce';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import * as CollectionActions from '../actions/collection';
import { CollectionFilter, CollectionList } from '../components/Collection';
import { IRootState } from '../reducers';
import { ICollection } from '../types/collection';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';
export interface ICollectionProps extends RouteComponentProps {
  collection: ICollection[];
  status: Status;
  error: string;
  fetchCollection: (payload: CollectionActions.IFetchCollection) => void;
}
class Collection extends React.Component<ICollectionProps> {
  public getNextPage = debounce(
    (payload: CollectionActions.IFetchCollection) => {
      const { collection, fetchCollection } = this.props;
      const basePayload = {
        skip: collection.length,
        search: this.getSearchQuery(),
        limit: 30,
      };
      fetchCollection({ ...basePayload, ...payload });
    },
    1000,
  );
  public async componentDidMount() {
    if (this.props.collection.length <= 0) {
      this.getNextPage({});
    }
  }
  public componentDidUpdate(prevProps: ICollectionProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const q = this.getSearchQuery();
      this.props.fetchCollection({ search: q, skip: 0 });
    }
  }
  public getSearchQuery = () => {
    const { q } = queryString.parse(this.props.location.search);
    if (typeof q !== 'undefined') {
      return Array.isArray(q) ? q[0] : q;
    }
    return '';
  };
  public render() {
    const { collection } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <CollectionFilter fetchMore={this.getNextPage} />
        <CollectionList
          collection={collection}
          fetchMore={this.getNextPage}
          isLast={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  collection: state.collection.collection,
  status: state.collection.status,
  error: state.collection.error,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  fetchCollection: (payload: CollectionActions.IFetchCollection) =>
    dispatch(CollectionActions.fetchCollection(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Collection);
