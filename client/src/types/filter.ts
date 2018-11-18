import { localeMap } from '../helpers/localeMapper';

export enum Faction {
  nor = 'Northern Realms',
  mon = 'Monster',
  neu = 'Neutral',
  sco = 'Scoiatael',
  ske = 'Skellige',
}
export enum Type {
  bronze = 'Bronze',
  gold = 'Gold',
  special = 'Special',
  leader = 'Leader',
}
export enum Rarity {
  common = 'Common',
  rare = 'Rare',
  epic = 'Epic',
  legendary = 'Legendary',
}
export enum CardType {
  unit = 'Unit',
  spell = 'Spell',
  artifact = 'Artifact',
  leader = 'Leader',
}
export enum Provision {
  '1~4' = '4',
  '5-' = '5',
  '6-' = '6',
  '7-' = '7',
  '8-' = '8',
  '9-' = '9',
  '10-' = '10',
  '11~' = '11',
}
export type FilterField =
  | 'faction'
  | 'type'
  | 'rarity'
  | 'cardType'
  | 'provision';
export type FilterType = Faction | Type | Rarity | CardType | Provision;
export type IFilter = Partial<Record<FilterField, FilterType>>;
export type IFilterSet = Record<FilterField, any>;
// 이름에 맞는 Filter는 여기서 가져오자.

export const filterSet: IFilterSet = {
  faction: Faction,
  type: Type,
  rarity: Rarity,
  cardType: CardType,
  provision: Provision,
};
