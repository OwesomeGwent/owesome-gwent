import { CardData, RawCardData } from './shared/ICardData';
import { CardLocaleData, CardLocaleDataList, Locale } from './shared/ILocaleData';

enum Faction {
  Monster = 'monster',
  North = 'north',
};
enum RARITY  {
  Common = 5,
  Rare = 15,
  Epic = 20,
  Legendary = 25,
};
interface reducer {
  card: {
    rawCards: {
      cards: RawCardData,
      status: 'INIT' | 'REQUEST', // ...
    },
    cards: CardData[],
    currentCards: CardData[],
    detail: {
      [locale in Locale]: CardLocaleData;
    };
  }
  filter: {
    faction: Faction;
    rarity: RARITY;
    locale: Locale;
  },
}

const faction: key in Faction = Faction[Monster];
