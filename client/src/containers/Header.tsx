import AppBar from '@material-ui/core/AppBar';
<<<<<<< HEAD
import React from 'react';

const Header = () => {
  return <AppBar position="sticky">타이틀~</AppBar>;
=======
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { connect } from 'react-redux';
import { Locale } from '../../../shared/ILocaleData';
import * as LocaleAction from '../actions/locale';
import { SimpleSelect } from '../components/Common';
import { localeMap } from '../helpers/localeMapper';
export interface IHeaderProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
const Header: React.SFC<IHeaderProps> = ({ locale, setLocale }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>오우썸 궨트</div>
        <div>
          <SimpleSelect
            data={Object.values(localeMap)}
            onChange={(value: string) => setLocale(value as Locale)}
            selected={locale}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
>>>>>>> bbde7e1d1869cf50a16b50ea4fcfd9de98cb82da
};
export default Header;
