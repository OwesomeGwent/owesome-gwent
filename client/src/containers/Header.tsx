import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { Locale } from '../../../shared/ILocaleData';
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
};
export default Header;
