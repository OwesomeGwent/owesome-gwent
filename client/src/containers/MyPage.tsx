import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Locale } from '../../../shared/ILocaleData';
import * as UserActions from '../actions/user';
import { Button, CollectionItem } from '../components/Common';
import { history } from '../helpers/history';
import { IRootState } from '../reducers';
import { IDeck } from '../types/deck';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';
import { IUser } from '../types/user';

const Container = styled.div`
  width: 100%;
  min-height: 300px;
  color: #fefefe;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const NoResult = styled.div`
  color: #fefefe;
  margin-top: 1rem;
  font-size: 20px;
`;
const Centering = styled.div`
  width: 100%;
  min-height: 300px;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export interface IMyPageProps {
  decks: {
    decks: IDeck[];
    status: Status;
    error: string;
  };
  locale: Locale;
  loggedIn: boolean;
  user: IUser | undefined;
  fetchDecks: () => void;
}
class MyPage extends React.Component<IMyPageProps> {
  public componentDidMount() {
    if (this.props.user) {
      this.props.fetchDecks();
    }
  }
  public componentDidUpdate(prevProps: IMyPageProps) {
    if (this.props.loggedIn && prevProps.user !== this.props.user) {
      this.props.fetchDecks();
    }
  }
  public handleStartDeckBuilding = () => {
    history.push('/');
  };
  public handleDeckClick = (deckId: string) => () => {
    history.push(`/collection/view/${deckId}`);
  };
  public render() {
    const { decks, user } = this.props;
    if (!user) {
      return (
        <Centering>
          <NoResult>Can not identify you... Please login!</NoResult>
        </Centering>
      );
    }
    const { status } = decks;
    return (
      <Container>
        {status === 'INIT' || status === 'FAILURE' ? null : status ===
          'FETCHING' ? (
          <Centering>
            <CircularProgress color="inherit" />
          </Centering>
        ) : decks.decks.length <= 0 ? (
          <Centering>
            <NoResult>
              <h2>😅 You don't have a deck yet... Make one!</h2>
              <Centering>
                <Button onClick={this.handleStartDeckBuilding}>
                  🚀 Start Deck building
                </Button>
              </Centering>
            </NoResult>
          </Centering>
        ) : (
          decks.decks.map(deck => (
            <CollectionItem
              deck={deck}
              key={deck.id}
              handleDeckClick={this.handleDeckClick(deck.id)}
            />
          ))
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  decks: state.user.decks,
  loggedIn: state.user.loggedIn,
  user: state.user.user,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  fetchDecks: () => dispatch(UserActions.fetchDecks()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
