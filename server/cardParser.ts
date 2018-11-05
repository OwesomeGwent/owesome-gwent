import fs from 'fs';
import path from 'path';
import cardDefs from './data_definitions/cards.json';
import LocaleData from '../shared/LocaleData';
import CardData from '../shared/CardData';

const LOCALE_DATA_DEFS = ['flavor', 'info', 'infoRaw', 'name'];

const cardParser = () => {
  let localeData: { [country: string]: LocaleData } = {};

  const cardData: { [cardID: string]: CardData } = Object.entries(
    cardDefs,
  ).reduce((acc, [key, value]) => {
    const currentCard = { ...value };
    LOCALE_DATA_DEFS.forEach(attrKey => {
      Object.entries(currentCard[attrKey]).forEach(([country, localString]) => {
        localeData = {
          ...localeData,
          [country]: {
            ...localeData[country],
            [key]: {
              ...localeData[country][key],
              [attrKey]: localString,
            },
          },
        };
      });
      delete currentCard[attrKey];
    });
    return {
      ...acc,
      [key]: { ...currentCard },
    };
  }, {});

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
