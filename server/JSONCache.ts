import scheduler from 'node-schedule';
import { CardData } from '../shared/ICardData';
import { LocaleDataList } from '../shared/ILocaleData';
import cardParser from './cardParser';
import checkRepoUpTodate from './checkRepoUpToDate';

interface ICache {
  'card-data'?: CardData;
  [attrKey: string]: CardData | LocaleDataList | undefined;
}
class JSONCache {
  private cache: ICache;
  constructor() {
    this.cache = {};
  }
  runBatch() {
    scheduler.scheduleJob('* 0 * * *', () => {
      if (!checkRepoUpTodate()) {
        cardParser();
        this.cache = {};
      }
    });
  }
  setJSON(attrKey: string, data: CardData | LocaleDataList) {
    this.cache[attrKey] = data;
  }
  getJSON(attrKey: string): CardData | LocaleDataList | undefined {
    return this.cache[attrKey];
  }
  hasJSON(attrKey: string): boolean {
    return this.cache[attrKey] !== undefined;
  }
}

export default JSONCache;
