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

export type FilterField = 'faction' | 'type' | 'rarity';
export type FilterType = Faction | Type | Rarity;
export type IFilter = Partial<Record<FilterField, FilterType>>;
export type IFilterSet = Record<FilterField, any>;
// 이름에 맞는 Filter는 여기서 가져오자.

export const filterSet: IFilterSet = {
  faction: Faction,
  type: Type,
  rarity: Rarity,
};
