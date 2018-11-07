import { CardData } from './ICardData';
import { KeyWordData } from './ILocaleData';

export interface AllCardData extends CardData {
  flavor?: DefaultLocaleSet;
  info?: DefaultLocaleSet;
  infoRaw?: DefaultLocaleSet;
  name?: DefaultLocaleSet;
}

export interface CategoryDataList {
  [categoryKey: string]: DefaultLocaleSet;
}

export interface KeyWordDataList {
  [keyword: string]: {
    [country: string]: KeyWordData;
  };
}
export interface DefaultLocaleSet {
  'de-DE': string;
  'en-US': string;
  'es-ES': string;
  'es-MX': string;
  'fr-FR': string;
  'it-IT': string;
  'ja-JP': string;
  'ko-KR': string;
  'pl-PL': string;
  'pt-BR': string;
  'ru-RU': string;
  'zh-CN': string;
  'zh-TW': string;
  [country: string]: string;
}
