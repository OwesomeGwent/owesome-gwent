import React from 'react';
import { IFetchCollection } from '../../actions/collection';
import { history } from '../../helpers/history';
import { ICollection } from '../../types/collection';
import CollectionItem from './CollectionItem';
export interface ICollectionListProps {
  collection: ICollection[];
  fetchMore: (payload: IFetchCollection) => void;
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
        threshold: 0.1,
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
  public handleDeckClick = (url: string) => () => {
    history.push(url);
  };
  public getNextPage = () => {
    const { fetchMore, isLast } = this.props;
    if (!isLast) {
      fetchMore({});
    }
  };
  public render() {
    const { collection } = this.props;
    if (collection.length <= 0) {
      return null;
    }
    return (
      <div style={{ width: '100%' }}>
        {collection.map(deck => {
          return (
            <CollectionItem
              key={deck.id}
              handleDeckClick={this.handleDeckClick(deck.url)}
              deck={deck}
            />
          );
        })}
        <div ref={this.target} style={{ height: 100 }} />
      </div>
    );
  }
}

export default CollectionList;
