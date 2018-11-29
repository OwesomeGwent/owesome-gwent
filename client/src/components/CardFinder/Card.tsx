import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { CardData } from '../../../../shared/ICardData';
import { BASE_IMAGE_PATH } from '../../apis/defs';

interface IContainerProps extends React.HTMLProps<HTMLImageElement> {
  available: boolean;
  src: string;
}
const CardImage = styled.img`
  ${(props: IContainerProps) =>
    props.available
      ? null
      : `
    filter: grayscale(100%);
  `}
`;
const CardFrontGroup = styled.div`
  div {
    z-index: 1;
  }
  .c-card__rarity {
    z-index: 2;
  }
`;
interface IMapper {
  [key: string]: number;
}
const RARITY: IMapper = {
  Common: 5,
  Rare: 15,
  Epic: 20,
  Legendary: 25,
};
const CARDTYPE: IMapper = {
  Unit: 1,
  Spell: 2,
  Artifact: 3,
  Leader: 4,
};
const TYPE: IMapper = {
  Bronze: 1,
  Silber: 2,
  Gold: 3,
  Special: 4,
  Leader: 5,
};
export interface ICardProps {
  available: boolean;
  card: CardData;
  onClick: (e: React.MouseEvent) => void;
}
const Card: React.SFC<ICardProps> = ({ available, card, onClick }) => {
  const {
    cardType,
    type,
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
  const parsedType = cardType.toLowerCase();
  const { art, rarity, variationId } = variations[Object.keys(variations)[0]];
  return (
    <div onClick={onClick}>
      <div
        className={`c-card c-card--${parsedFaction} c-card--${parsedType} is-flipped`}
        data-power={strength}
        data-provision={provision}
        data-row={CARDTYPE[cardType]}
        data-mulligan={mulligans}
        data-type={TYPE[type]}
        data-rarity={RARITY[rarity]}
      >
        <div className="c-card__front-container">
          <div className="c-card__front">
            <CardFrontGroup>
              <div className="c-card__group" />
              <div className="c-card__frame" />
              <div className="c-card__rarity" />
              <div className="c-card__banner">
                <div className="c-card__power" />
                <div className="c-card__row" />
                <div className="c-card__mulligan">
                  <div className="c-card__mulligan-cost" />
                </div>
              </div>
              {!!provision && (
                <>
                  <div className="c-card__provision-icon" />
                  <div className="c-card__provision-basis">
                    <div className="c-card__provision" />
                  </div>
                </>
              )}
            </CardFrontGroup>
            <CardImage
              available={available}
              src={`${BASE_IMAGE_PATH}/${art}0000.png`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
