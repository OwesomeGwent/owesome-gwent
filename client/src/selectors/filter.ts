import { createSelector } from 'reselect';
import { CardData } from '../../../shared/ICardData';
import { IRootState } from '../reducers';
import { IMultiFilterList } from '../types/filter';
import { getCardCategoryByLocale, getCardKeywordByLocale } from './locale';

const KEYWORD_REG = new RegExp(/<(.+?)>(.+?)<\/color>/, 'im');

const sortLabel = <T>(first: T, last: T) => {
  return Object.keys(first)[0].localeCompare(Object.keys(last)[0]);
};
// value랑 key 반대로 매핑하는것은 좀 더 편할 것 같아서.
// value: 필터에서 보여줄 부분. key: 실제 받는 값.
export const getMultiFilterByLocale = createSelector(
  getCardCategoryByLocale,
  getCardKeywordByLocale,
  (categories, keywords) => {
    const categoryFilter = categories
      ? Object.entries(categories).reduce(
          (acc, [key, value]) => {
            return [...acc, { [value]: key }].sort(sortLabel);
          },
          [] as IMultiFilterList[],
        )
      : [];
    const keywordFilter = keywords
      ? Object.entries(keywords).reduce(
          (acc, [key, value]) => {
            const keyword = KEYWORD_REG.exec(value.raw);
            if (!keyword) {
              return acc;
            }
            return [...acc, { [keyword[2]]: key }].sort(sortLabel);
          },
          [] as IMultiFilterList[],
        )
      : [];
    return {
      categoryIds: categoryFilter,
      keywords: keywordFilter,
    };
  },
);
