import { createSelector } from 'reselect';
import { IRootState } from '../reducers';

const getCurrentLocale = (state: IRootState) => state.locale;
const getCardDetails = (state: IRootState) => state.card.detail.localeData;
export const getCardDetailByLocale = createSelector(
  getCurrentLocale,
  getCardDetails,
  (locale, localeData) =>  localeData[locale],
);
