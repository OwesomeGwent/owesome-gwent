export interface LocaleDataList {
  [cardID: string]: LocaleData;
}

export interface LocaleData {
  flavor?: string;
  infoRaw: string;
  info?: string;
  name: string;
  [attrKey: string]: string | undefined;
}
