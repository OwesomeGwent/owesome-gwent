import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { Login, Signup } from '.';
import { Locale } from '../../../shared/ILocaleData';
import * as AuthActions from '../actions/auth';
import { SimpleSelect } from '../components/Common';
import { ModalContext } from '../contexts';
import { localeMap } from '../helpers/localeMapper';
import { IRootState } from '../reducers';
import { IUser } from '../types/user';
export interface IHeaderProps {
  locale: Locale;
  loggedIn: boolean;
  user: IUser | undefined;
  setLocale: (locale: Locale) => void;
  logout: typeof AuthActions.logout;
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
    const { locale, setLocale, loggedIn, logout, user } = this.props;
    return (
      <ModalContext.Consumer>
        {({ openModal, closeModal }) => (
          <AppBar position="sticky">
            <Toolbar>
              <div style={{ flexGrow: 1 }}>오우썸 궨트</div>
              <div>
                {loggedIn ? (
                  <>
                    {user && user.username}
                    <Button onClick={logout}>Logout</Button>
                  </>
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
              </div>
            </Toolbar>
          </AppBar>
        )}
      </ModalContext.Consumer>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  loggedIn: state.auth.loggedIn,
  user: state.auth.user,
});
export default connect(
  mapStateToProps,
  {
    logout: AuthActions.logout,
  },
)(Header);
