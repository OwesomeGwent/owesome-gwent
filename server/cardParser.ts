import fs from 'fs';
import path from 'path';
import cardDefs from './data_definitions/cards.json';
import { LocaleData, LocaleDataList } from '../shared/LocaleData';
import { CardData, AllCardData, DefaultLocaleSet } from '../shared/CardData';

const LOCALE_DATA_DEFS = ['flavor', 'info', 'infoRaw', 'name'];

interface ICardDataList {
  [cardID: string]: CardData;
}

const cardParser = () => {
  let localeData: { [country: string]: LocaleDataList } = {};

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
              localeData[country] = {};
            }
            if (localeData[country][cardID] === undefined) {
              localeData[country][cardID] = {} as LocaleData;
            }
            localeData[country][cardID][attrKey] = localString;
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
