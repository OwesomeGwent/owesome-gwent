import fs from 'fs';
import path from 'path';
import {
  CardLocaleData,
  LocaleDataList,
  CardLocaleDataList,
  KeyWordLocaleDataList,
  CategoryLocaleDataList,
} from '../shared/ILocaleData';
import { CardData } from '../shared/ICardData';
import {
  AllCardData,
  DefaultLocaleSet,
  CategoryDataList,
  KeyWordDataList,
} from '../shared/IJsonData';

const LOCALE_DATA_DEFS = ['flavor', 'info', 'infoRaw', 'name'];

interface ICardDataList {
  [cardID: string]: CardData;
}
const cardParser = async () => {
  // 언어별 정보를 담고 있을 데이터.
  let localeData: { [country: string]: LocaleDataList } = {};

  // 카드 정보를 불러온다.
  const cardDefs = JSON.parse(
    fs.readFileSync('./gwent-data-release/cards.json', {
      encoding: 'utf-8',
    }),
  );
  // 파싱 후 나눠서 담기.
  const cardData: ICardDataList = Object.entries(cardDefs).reduce(
    (acc: ICardDataList, [cardID, value]: [string, any]): ICardDataList => {
      const [key] = Object.keys(value.variations);
      const currentCard: AllCardData = {
        ...value,
        variations: { [key]: value.variations[key] },
      };

      LOCALE_DATA_DEFS.forEach(attrKey => {
        Object.entries(currentCard[attrKey] as DefaultLocaleSet).forEach(
          ([country, localString]) => {
            if (localeData[country] === undefined) {
              localeData[country] = {
                cards: {} as CardLocaleDataList,
                categories: {} as CategoryLocaleDataList,
                keywords: {} as KeyWordLocaleDataList,
              };
            }
            if (localeData[country].cards[cardID] === undefined) {
              localeData[country].cards[cardID] = {} as CardLocaleData;
            }
            localeData[country].cards[cardID][attrKey] = localString;
            delete currentCard[attrKey];
          },
        );
      });
      return {
        ...acc,
        [cardID]: { ...(currentCard as CardData) },
      };
    },
    {} as ICardDataList,
  );

  const categoryData = JSON.parse(
    fs.readFileSync('./gwent-data-release/categories.json', {
      encoding: 'utf-8',
    }),
  );
  Object.entries(categoryData as CategoryDataList).forEach(
    ([category, countries]: [string, DefaultLocaleSet]) => {
      Object.entries(countries).forEach(([country, locale]) => {
        localeData[country].categories[category] = locale;
      });
    },
  );

  const keywordData = JSON.parse(
    fs.readFileSync('./gwent-data-release/keywords.json', {
      encoding: 'utf-8',
    }),
  );

  Object.entries(keywordData as KeyWordDataList).forEach(
    ([keyword, keywordLocaleSet]) => {
      Object.entries(keywordLocaleSet).forEach(([country, keywordData]) => {
        localeData[country].keywords[keyword] = keywordData;
      });
    },
  );

  fs.writeFileSync(
    path.join(__dirname, 'parsed', `card-data.json`),
    JSON.stringify(cardData, null, 4),
    'utf-8',
  );

  Object.entries(localeData).forEach(([country, locale]) => {
    fs.writeFileSync(
      path.join(__dirname, 'parsed', `${country}.json`),
      JSON.stringify(locale, null, 4),
      'utf-8',
    );
  });
};

export default cardParser;
