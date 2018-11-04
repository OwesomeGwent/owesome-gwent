import React from 'react';
import { ICard } from '../types/card';
const BASE_IMAGE_PATH =
  'https://res.cloudinary.com/godsenal/image/upload/v1541344313/gwent/card';

interface IRarity {
  [key: string]: number;
}
interface ICardType {
  [key: string]: number;
}
const RARITY: IRarity = {
  Common: 5,
  Rare: 15,
  Epic: 20,
  Legendary: 25,
};
const CARDTYPE: ICardType = {
  Unit: 1,
  Spell: 2,
  Artifact: 3,
  Leader: 4,
};
const cardStyle: React.CSSProperties = {
  zIndex: 2,
};
export interface ICardProps {
  card: ICard;
}
const Card: React.SFC<ICardProps> = ({ card }) => {
  const {
    cardType,
    faction,
    strength,
    variations,
    mulligans,
    provision,
    ingameId,
  } = card;
  const parsedFaction = faction
    .toLowerCase()
    .split(' ')
    .join('');
  const { art, rarity, variationId } = variations[Object.keys(variations)[0]];
  const { ingameArtId } = art;
  return (
    <div>
      <div
        className={`c-card c-card--${parsedFaction} is-flipped`}
        data-power={cardType === 'Leader' ? mulligans : strength}
        data-provision={provision}
        data-row={CARDTYPE[cardType]}
        data-group="3"
        data-rarity={RARITY[rarity]}
        style={cardStyle}
      >
        <div className="c-card__front-container">
          <div className="c-card__front">
            <div className="c-card__group" />
            <div className="c-card__frame" />
            <div className="c-card__rarity" />
            <div className="c-card__banner">
              <div className="c-card__power" />
              <div className="c-card__row" />
            </div>
            {!!provision && (
              <>
                <div className="c-card__provision-icon" />
                <div className="c-card__provision-basis">
                  <div className="c-card__provision" />
                </div>
              </>
            )}
            <img src={`${BASE_IMAGE_PATH}/${ingameArtId}0000.png`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
