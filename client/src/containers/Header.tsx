import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { Login } from '.';
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
  user: IUser | {};
  setLocale: (locale: Locale) => void;
  login: typeof AuthActions.login;
}
type IModal = 'Login' | 'Signup' | null;
interface IHeaderState {
  modal: IModal;
}
class Header extends React.Component<IHeaderProps, IHeaderState> {
  public render() {
    const { locale, loggedIn, login, user, setLocale } = this.props;
    return (
      <ModalContext.Consumer>
        {({ openModal, closeModal }) => (
          <AppBar position="sticky">
            <Toolbar>
              <div style={{ flexGrow: 1 }}>오우썸 궨트</div>
              <div>
                <button
                  onClick={() => openModal(<Login closeModal={closeModal} />)}
                >
                  login
                </button>
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
  { login: AuthActions.login },
)(Header);
