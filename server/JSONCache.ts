import scheduler from "node-schedule";
import { CardData } from "../shared/CardData";
import { LocaleData } from "../shared/LocaleData";
import cardParser from "./cardParser";
import checkRepoUpTodate from "./batchJob";

interface ICache {
  "card-data"?: CardData;
  [attrKey: string]: CardData | LocaleData | undefined;
}
class JSONCache {
  private cache: ICache;
  constructor() {
    this.cache = {};
  }
  runBatch() {
    scheduler.scheduleJob("* 24 * * *", () => {
      if (!checkRepoUpTodate()) {
        cardParser();
        this.cache = {};
      }
    });
  }
  setJSON(attrKey: string, data: CardData | LocaleData) {
    this.cache[attrKey] = data;
  }
  getJSON(attrKey: string): CardData | LocaleData | undefined {
    return this.cache[attrKey];
  }
  hasJSON(attrKey: string): boolean {
    return this.cache[attrKey] !== undefined;
  }
}

export default JSONCache;
