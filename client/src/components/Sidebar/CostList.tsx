import React, { SFC } from 'react';
import styled from 'styled-components';
import { MAX_PROVISION, MIN_COUNT } from '../../helpers/deck';
import Card from '../../icons/card.png';
import Craft from '../../icons/craft.png';
import Provision from '../../icons/provision.png';

const CostView = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Cost = styled.div`
  color: white;
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
  }
`;

interface IMaxProps {
  count?: number;
  provision?: number;
}
const CountText = styled.span`
  color: ${(props: IMaxProps) =>
    props.count && props.count < MIN_COUNT ? 'red' : 'inherit'};
`;
const ProvisionText = styled.span`
  color: ${(props: IMaxProps) =>
    props.provision && props.provision > MAX_PROVISION ? 'red' : 'inherit'};
`;
export interface ICost {
  count: number;
  craft: number;
  provision: number;
}
const CostList: SFC<ICost> = ({ count, craft, provision }) => (
  <CostView>
    <Cost>
      <img src={Provision} />
      <ProvisionText provision={provision}>{provision}</ProvisionText>/165
    </Cost>
    <Cost>
      <img src={Card} />
      <CountText count={count}>{count}</CountText>/25
    </Cost>
    <Cost>
      <img src={Craft} />
      {craft}
    </Cost>
  </CostView>
);

export default CostList;
