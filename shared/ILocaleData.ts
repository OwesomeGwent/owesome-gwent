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
export type Locale =
  | 'de-DE'
  | 'en-US'
  | 'es-ES'
  | 'es-MX'
  | 'fr-FR'
  | 'it-IT'
  | 'ja-JP'
  | 'ko-KR'
  | 'pl-PL'
  | 'pt-BR'
  | 'ru-RU'
  | 'zh-CN'
  | 'zh-TW';

// export enum Locale {
//   DE = 'de-DE',
//   US = 'es-US',
//   ES = 'es-ES',
//   MX = 'es-MX',
//   FR = 'fr-FR',
//   IT = 'it-IT',
//   JP = 'ja-JP',
//   KR = 'ko-KR',
//   PL = 'pl-PL',
//   BR = 'pt-BR',
//   RU = 'ru-RU',
//   CN = 'zh-CN',
//   TW = 'zh-TW',
// }
