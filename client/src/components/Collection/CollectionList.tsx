import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styled from 'styled-components';
import { history } from '../../helpers/history';
import { ICollection, ICollectionQuery } from '../../types/collection';
import { IDeck } from '../../types/deck';
import { Status } from '../../types/status';
import CollectionItem from './CollectionItem';

const DeckList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;
const Loading = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
const NoResult = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    color: #fefefe;
    font-size: 2em;
    text-align: center;
  }
`;
export interface ICollectionListProps {
  collection: ICollection[];
  fetchMore: (payload: ICollectionQuery) => void;
  status: Status;
  isLast: boolean;
}
class CollectionList extends React.Component<ICollectionListProps> {
  private observer: IntersectionObserver | undefined;
  private target = React.createRef<HTMLDivElement>();
  private prevTop: number = 0;
  public componentDidMount() {
    // ItersectionObserver 등록
    if (this.target.current) {
      const option = {
        root: null, // body scroll
        threshold: 0.05,
      };
      this.observer = new IntersectionObserver(this.handleObserver, option);
      this.observer.observe(this.target.current);
    }
    this.getNextPage();
  }
  public handleObserver = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      const { top } = entry.boundingClientRect;
      // prevTop - 이전 scroll trigger position
      // top - 현재 scroll trigger position
      if (this.prevTop > top) {
        this.getNextPage();
      }
      this.prevTop = top;
    });
  };
  public handleDeckClick = (deck: IDeck) => () => {
    history.push(`/collection/view/${deck.id}`);
  };
  public getNextPage = () => {
    const { fetchMore, isLast } = this.props;
    if (!isLast) {
      fetchMore({});
    }
  };
  public render() {
    const { collection, status } = this.props;
    if (status === 'SUCCESS' && collection.length <= 0) {
      return (
        <NoResult>
          <div>😐 No matching results founds.</div>
        </NoResult>
      );
    }
    return (
      <DeckList>
        {collection.map(deck => {
          return (
            <CollectionItem
              key={deck.id}
              handleDeckClick={this.handleDeckClick(deck)}
              deck={deck}
            />
          );
        })}
        {status === 'FETCHING' && (
          <Loading>
            <CircularProgress color="inherit" />
          </Loading>
        )}
        <div ref={this.target} style={{ width: '100%', height: 100 }} />
      </DeckList>
    );
  }
}

export default CollectionList;
