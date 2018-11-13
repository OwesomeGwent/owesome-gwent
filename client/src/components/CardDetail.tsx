import React, { SFC } from 'react';
import { connect } from 'react-redux';
import { CardLocaleDataList } from '../../../shared/ILocaleData';
import { IRootState } from '../reducers';
import { getCardDetailByLocale } from '../selectors';

export interface ICardDetailProps {
  cardDetails: CardLocaleDataList | undefined;
  cardId: string;
}

const CardDetail: SFC<ICardDetailProps> = ({ cardDetails, cardId }) => {
  if (!cardDetails) {
    return null;
  }
  const { name, flavor, info } = cardDetails[cardId];
  return (
    <div>
      <p>{name}</p>
      <p>{flavor}</p>
      <p>{info}</p>
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  cardDetails: getCardDetailByLocale(state),
});

export default connect(mapStateToProps)(CardDetail);
