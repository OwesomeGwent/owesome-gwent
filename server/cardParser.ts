import fs from 'fs';
import path from 'path';
import { CardData, CardDataList, RawCardData } from '../shared/ICardData';
import {
  AllCardData,
  CategoryDataList,
  DefaultLocaleSet,
  KeyWordDataList,
} from '../shared/IJsonData';
import {
  CardLocaleData,
  CardLocaleDataList,
  CategoryLocaleDataList,
  KeyWordLocaleDataList,
  LocaleDataList,
} from '../shared/ILocaleData';

const LOCALE_DATA_DEFS = ['flavor', 'info', 'infoRaw', 'name'];

interface ICardDataList {
  [cardID: string]: CardData;
}
const cardParser = async () => {
  // 언어별 정보를 담고 있을 데이터.
  const localeData: { [country: string]: LocaleDataList } = {};
  // 카드 정보를 불러온다.
  const cardDefs = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'gwent-data-release', 'cards.json'), {
      encoding: 'utf-8',
    }),
  );
  // 파싱 후 나눠서 담기.
  const cardData: CardDataList = Object.entries(cardDefs).reduce(
    (acc: CardDataList, [cardID, value]: [string, any]): CardDataList => {
      const variationIds = Object.keys(value.variations);
      const variations = variationIds.map(variationId => {
        const variation = value.variations[variationId];
        const { ingameArtId } = variation.art;
        return {
          ...variation,
          art: ingameArtId,
        };
      });
      const currentCard: AllCardData = {
        ...value,
        variationIds,
        variations,
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
      const cardType = currentCard.type === 'Leader' ? 'leader' : 'normal';
      const card = { [cardID]: { ...(currentCard as CardData) } };
      return {
        ...acc,
        [cardType]: {
          ...acc[cardType],
          ...card,
        },
      };
    },
    {} as CardDataList,
  );
  const categoryData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'gwent-data-release', 'categories.json'),
      {
        encoding: 'utf-8',
      },
    ),
  );
  Object.entries(categoryData as CategoryDataList).forEach(
    ([category, countries]: [string, DefaultLocaleSet]) => {
      Object.entries(countries).forEach(([country, locale]) => {
        localeData[country].categories[category] = locale;
      });
    },
  );

  const keywordData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, 'gwent-data-release', 'keywords.json'),
      {
        encoding: 'utf-8',
      },
    ),
  );

  Object.entries(keywordData as KeyWordDataList).forEach(
    ([keyword, keywordLocaleSet]) => {
      Object.entries(keywordLocaleSet).forEach(([country, countryData]) => {
        localeData[country].keywords[keyword] = countryData;
      });
    },
  );

  fs.writeFileSync(
    path.join(__dirname, 'parsed', 'card-data.json'),
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
