import { Faction } from '../../../shared/ICardData';

type FactionColor = Record<Faction, string>;

export const factionColor: FactionColor = {
  Monster: '#350704',
  'Northern Realms': '#0F2644',
  Nilfgaard: '#101418',
  Scoiatael: '#2B330D',
  Skellige: '#291E41',
  Neutral: '#4D3F21',
};
