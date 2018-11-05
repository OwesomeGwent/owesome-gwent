const fs = require('fs');
const path = require('path');
const es = require('event-stream');
const JSONStream = require('JSONStream');
const cardDefs = require('./data_definitions/cards.json');
const LOCALE_DATA_DEFS = ['flavor', 'info', 'infoRaw', 'name'];

let localeData = {};

const cardDataStream = fs.createWriteStream(
  path.join(__dirname, 'parsed', `card-data.json`),
);

const cardData = Object.keys(cardDefs).reduce((acc, key) => {
  const currentCard = { ...cardDefs[key] };
  LOCALE_DATA_DEFS.forEach(attrKey => {
    Object.entries(currentCard[attrKey]).forEach(([country, localString]) => {
      if (!localeData[country]) {
        localeData[country] = {};
        return;
      }
      localeData = {
        ...localeData,
        [country]: {
          ...localeData[country],
          [key]: localeData[country][key]
            ? {
                ...localeData[country][key],
                [attrKey]: localString,
              }
            : {},
        },
      };
    });
    delete currentCard[attrKey];
  });
  return {
    ...acc,
    [key]: {
      ...currentCard,
    },
  };
}, {});

es.readable(function(count, next) {
  Object.keys(cardData).forEach(key => {
    this.emit('data', [key, cardData[key]]);
  });
  this.emit('end');
  next();
})
  .pipe(JSONStream.stringifyObject())
  .pipe(cardDataStream);

Object.entries(localeData).forEach(([country, locale]) => {
  fs.writeFile(
    path.join(__dirname, 'parsed', `${country}.json`),
    JSON.stringify(locale, null, 4),
    'utf-8',
    err => {
      if (err) {
        console.log(country);
      }
    },
  );
});
