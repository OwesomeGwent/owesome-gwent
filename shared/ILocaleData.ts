export interface LocaleDataList {
  categories: CategoryLocaleDataList;
  cards: CardLocaleDataList;
  keywords: KeyWordLocaleDataList;
  [localeDataKey: string]:
    | CardLocaleDataList
    | CategoryLocaleDataList
    | KeyWordLocaleDataList;
}

export interface CardLocaleData {
  flavor?: string;
  infoRaw: string;
  info?: string;
  name: string;
  [attrKey: string]: string | undefined;
}

export interface CardLocaleDataList {
  [cardID: string]: CardLocaleData;
}

export interface CategoryLocaleDataList {
  [category: string]: string;
}

export interface KeyWordData {
  raw: string;
  text: string;
}

export interface KeyWordLocaleDataList {
  [keyword: string]: KeyWordData;
}
