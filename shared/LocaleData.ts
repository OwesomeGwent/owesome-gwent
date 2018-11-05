export default interface LocaleData {
  [cardId: string]: {
    infoRaw: string;
    info?: string;
    name: string;
  };
}
