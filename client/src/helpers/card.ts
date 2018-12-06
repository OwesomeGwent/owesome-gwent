import { CardData } from '../../../shared/ICardData';
// Ownable 검사. 덱에 못넣는 카드들.
export const checkOwnable = (card: CardData) => {
  if (!card.variations) {
    return false;
  }
  return card.variations[0].availability !== 'NonOwnable';
};
export const sortByFaction = (a: CardData, b: CardData) => {
  if (a.faction && b.faction) {
    return a.faction.localeCompare(b.faction);
  }
  return 0;
};
export const sortByProvision = (a: CardData, b: CardData) => {
  if (a.mulligans && b.mulligans) {
    return b.mulligans - a.mulligans;
  }
  return b.provision - a.provision;
};

export const countCard = (deckCards: CardData[]) => (card: CardData) => {
  let cardCount = 0;
  deckCards.forEach(deckCard => {
    if (deckCard.ingameId === card.ingameId) {
      cardCount++;
    }
  });
  return cardCount;
};
export const hasSpace = (card: CardData, deckCards: CardData[]) => {
  const cardCount = countCard(deckCards)(card);
  if (card.type === 'Bronze' && cardCount <= 1) {
    return true;
  } else if (cardCount === 0) {
    return true;
  }
  return false;
};
