import React from 'react';
import { ICard } from './types/card';

const BASE_IMAGE_PATH = './img/card-reveals/cards/card';

interface IRarity {
  [key: string]: number;
}
const RARITY: IRarity = {
  Common: 5,
  Rare: 15,
  Epic: 20,
  Legendary: 25,
};
const cardStyle: React.CSSProperties = {
  zIndex: 2,
};
const topStyle: React.CSSProperties = {
  height: 0,
  visibility: 'visible',
  paddingBottom: 0,
  paddingTop: 0,
  borderWidth: '0px 3px',
  transition: 'height 0.5s ease 0s, padding 0.5s ease 0s',
};

export interface ICardProps {
  card: ICard;
  id: String;
}
// Image 파일의 이름이 어떻게 정해지는지 모르겠다..
const Card: React.SFC<ICardProps> = ({ id, card }) => {
  const { faction, strength, variations } = card;
  const parsedFaction = faction.toLowerCase().trim();
  const { rarity, variationId } = variations[Object.keys(variations)[0]];
  return (
    <div>
      <div
        className={`c-card c-card--${parsedFaction} is-flipped`}
        data-power={strength}
        data-row="2"
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
            <img src={`${BASE_IMAGE_PATH}/${variationId}.png`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
