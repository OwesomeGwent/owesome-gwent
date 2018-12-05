import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Locale } from '../../../shared/ILocaleData';
import * as DeckActions from '../actions/deck';
import * as UserActions from '../actions/user';
import { AuthModal, Button, WithMenu } from '../components/Common';
import { DeckListButton, LanguageMenu } from '../components/Header';
import { history } from '../helpers/history';
import { localeMap } from '../helpers/localeMapper';
import { IRootState } from '../reducers';
import { IDeck } from '../types/deck';
import { Status } from '../types/status';
import { ThunkFunc } from '../types/thunk';
import { IUser } from '../types/user';

const Logo = styled.span`
  cursor: pointer;
`;
export interface IHeaderProps {
  decks: {
    decks: IDeck[];
    status: Status;
    error: string;
  };
  locale: Locale;
  loggedIn: boolean;
  user: IUser | undefined;
  setLocale: (locale: Locale) => void;
  selectDeckUrl: (url: string) => void;
  fetchDecks: () => void;
  logout: () => void;
}
class Header extends React.Component<IHeaderProps> {
  public render() {
    const {
      decks,
      selectDeckUrl,
      fetchDecks,
      locale,
      setLocale,
      loggedIn,
      logout,
      user,
    } = this.props;
    return (
      <AuthModal
        render={({ openLogin }) => (
          <AppBar style={{ backgroundColor: '#24282A' }} position="sticky">
            <Toolbar>
              <div style={{ flexGrow: 1, fontSize: '1.5rem' }}>
                <Logo onClick={() => history.push('/')}>🚀 Owesome Gwent</Logo>
              </div>
              <>
                <Link to="/collection">
                  <Button>Collection</Button>
                </Link>
                {loggedIn ? (
                  <div>
                    <WithMenu
                      Button={<Button>{user && user.username}</Button>}
                      MenuItems={[
                        <DeckListButton
                          {...decks}
                          selectDeckUrl={selectDeckUrl}
                          fetchDecks={fetchDecks}
                        />,
                        <Button onClick={logout}>Logout</Button>,
                      ]}
                    />
                  </div>
                ) : (
                  <Button onClick={openLogin}>Log in</Button>
                )}
                <LanguageMenu
                  data={Object.values(localeMap)}
                  onChange={(value: string) => setLocale(value as Locale)}
                  selected={locale}
                />
              </>
            </Toolbar>
          </AppBar>
        )}
      />
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  decks: state.user.decks,
  loggedIn: state.user.loggedIn,
  user: state.user.user,
});
const mapDispatchToProps = (dispatch: ThunkFunc) => ({
  selectDeckUrl: (url: string) => dispatch(DeckActions.selectDeckUrl(url)),
  fetchDecks: () => dispatch(UserActions.fetchDecks()),
  logout: () => dispatch(UserActions.logout()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
