import React from 'react';
import baseImage from '../img/card-reveals/cards/m/12950000.png';
import './flip.css';

export interface IFlipCardProps {
  [prop: string]: React.ReactNode;
}
const FilpCard: React.SFC<IFlipCardProps> = ({ front }) => {
  return (
    <div className="flip-container">
      <div className="flipper">
        <div className="front">
          {front}
          <div className="c-card__frame" />
          <img src={baseImage} />
        </div>
        <div className="back" />
      </div>
    </div>
  );
};

export default FilpCard;
