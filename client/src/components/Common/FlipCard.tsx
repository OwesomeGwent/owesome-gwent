import React from 'react';
import './flip.css';

export interface IFlipCardProps {
  src: string;
  [prop: string]: React.ReactNode;
}
const FilpCard: React.SFC<IFlipCardProps> = ({ front, src }) => {
  return (
    <div className="flip-container">
      <div className="flipper">
        <div className="front">
          {front}
          <div className="c-card__frame" />
          <img src={src} />
        </div>
        <div className="back" />
      </div>
    </div>
  );
};

export default FilpCard;
