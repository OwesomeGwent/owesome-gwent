import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Faction } from '../../../../shared/ICardData';
import { factionColor } from '../../helpers/color';
import { IRootState } from '../../reducers';
import { IDetails, makeGetDetails } from '../../selectors/collection';
import { CostList } from '../Sidebar';
const Container = styled.div`
  min-width: 300px;
  padding: 10px;
  color: #fefefe;
`;
const FactionName = styled.h2`
  span {
    border-radius: 10px;
    padding: 5px;
    background-color: ${({ faction }: { faction: Faction }) =>
      factionColor[faction]};
  }
`;
export interface ICollectionItemDetail {
  url: string;
}
const CollectionItemDetail: React.SFC<ICollectionItemDetail & IMapState> = ({
  url,
  details,
}) => {
  return (
    <Container>
      <FactionName faction={details.faction as Faction}>
        <span>{details.faction}</span>
      </FactionName>
      <CostList {...details} />
    </Container>
  );
};

interface IMapState {
  details: IDetails;
}
const makeMapStateToProps = () => {
  const getDetails = makeGetDetails();
  return (state: IRootState, props: ICollectionItemDetail) => ({
    details: getDetails(state, props.url),
  });
};

export default connect(makeMapStateToProps)(CollectionItemDetail);
