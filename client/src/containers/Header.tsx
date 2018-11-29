import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { Login, Signup } from '.';
import { Locale } from '../../../shared/ILocaleData';
import * as DeckActions from '../actions/deck';
import * as UserActions from '../actions/user';
import { Button, SimpleSelect, WithMenu } from '../components/Common';
import { DeckListButton } from '../components/Header';
import { ModalContext } from '../contexts';
import { localeMap } from '../helpers/localeMapper';
import { IRootState } from '../reducers';
import { Status } from '../types/status';
import { IDeck, IUser } from '../types/user';
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
  setCurrentDeck: typeof DeckActions.setCurrentDeck;
  selectDeckUrl: typeof DeckActions.selectDeckUrl;
  fetchDecks: typeof UserActions.fetchDecks;
  logout: typeof UserActions.logout;
}
class Header extends React.Component<IHeaderProps> {
  public openLogin = (
    openModal: (children: React.ReactNode) => void,
    closeModal: () => void,
  ) => {
    return () =>
      openModal(
        <Login
          openSignup={this.openSignup(openModal, closeModal)}
          closeModal={closeModal}
        />,
      );
  };
  public openSignup = (
    openModal: (children: React.ReactNode) => void,
    closeModal: () => void,
  ) => {
    return () =>
      openModal(
        <Signup
          openLogin={this.openLogin(openModal, closeModal)}
          closeModal={closeModal}
        />,
      );
  };
  public render() {
    const {
      decks,
      setCurrentDeck,
      selectDeckUrl,
      fetchDecks,
      locale,
      setLocale,
      loggedIn,
      logout,
      user,
    } = this.props;
    return (
      <ModalContext.Consumer>
        {({ openModal, closeModal }) => (
          <AppBar style={{ backgroundColor: '#24282A' }} position="sticky">
            <Toolbar>
              <div style={{ flexGrow: 1 }}>Owesome Gwent</div>
              <>
                {loggedIn ? (
                  <div>
                    <WithMenu
                      Button={<Button>{user && user.username}</Button>}
                      MenuItems={[
                        <DeckListButton
                          {...decks}
                          setCurrentDeck={setCurrentDeck}
                          selectDeckUrl={selectDeckUrl}
                          fetchDecks={fetchDecks}
                        />,
                        <Button onClick={logout}>Logout</Button>,
                      ]}
                    />
                  </div>
                ) : (
                  <Button onClick={this.openLogin(openModal, closeModal)}>
                    Log in
                  </Button>
                )}

                <SimpleSelect
                  data={Object.values(localeMap)}
                  onChange={(value: string) => setLocale(value as Locale)}
                  selected={locale}
                />
              </>
            </Toolbar>
          </AppBar>
        )}
      </ModalContext.Consumer>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  decks: state.user.decks,
  loggedIn: state.user.loggedIn,
  user: state.user.user,
});
export default connect(
  mapStateToProps,
  {
    setCurrentDeck: DeckActions.setCurrentDeck,
    selectDeckUrl: DeckActions.selectDeckUrl,
    fetchDecks: UserActions.fetchDecks,
    logout: UserActions.logout,
  },
)(Header);
