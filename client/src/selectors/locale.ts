import { createSelector } from 'reselect';
import { IRootState } from '../reducers';

interface IBaseProps {
  cardId: string;
  categoryIds: string[];
  type: 'leader' | 'normal';
  keywords: string[];
}

/* input selector */
const getCurrentLocale = (state: IRootState) => state.locale;
const getCardDetails = (state: IRootState) => state.card.detail.localeData;
const getLocaleKeywords = (state: IRootState) =>
  state.card.detail.localeKeywords;
const getLocaleCategories = (state: IRootState) =>
  state.card.detail.localeCategories;

const getCardKeywords = (state: IRootState, { keywords }: IBaseProps) => {
  return keywords;
};
const getCardCategories = (state: IRootState, { categoryIds }: IBaseProps) => {
  return categoryIds;
};

/* selector */
export const getCardDetailByLocale = createSelector(
  getCurrentLocale,
  getCardDetails,
  (locale, localeData) => localeData[locale] || {},
);
export const getCardKeywordByLocale = createSelector(
  getCurrentLocale,
  getLocaleKeywords,
  (locale, localeKeywords) => localeKeywords[locale],
);
export const getCardCategoryByLocale = createSelector(
  getCurrentLocale,
  getLocaleCategories,
  (locale, localeCategories) => localeCategories[locale],
);

export const makeGetCardDetailByLocale = () => {
  return createSelector(
    getCurrentLocale,
    getCardDetails,
    (locale, localeData) => localeData[locale] || {},
  );
};
export const makeGetkeywordInfoByLocale = () => {
  return createSelector(
    getCardKeywordByLocale,
    getCardKeywords,
    (localeKeywords, keywords) => {
      let results = {};
      if (localeKeywords) {
        keywords.forEach(keyword => {
          results = {
            ...results,
            [keyword]: localeKeywords[keyword],
          };
        });
      }
      return results;
    },
  );
};
export const makeGetCategoryByLocale = () => {
  return createSelector(
    getCardCategoryByLocale,
    getCardCategories,
    (localeCategories, categoryIds) => {
      let results: string[] = [];
      if (localeCategories) {
        results = Object.entries(localeCategories).reduce(
          (acc, [categoryId, text]) => {
            if (categoryIds.includes(categoryId)) {
              return [...acc, text];
            }
            return acc;
          },
          [] as string[],
        );
      }
      return results;
    },
  );
};
