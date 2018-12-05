import React, { memo } from 'react';
import styled from 'styled-components';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { IDeckCard } from '../../types/deck';

const ChartList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Chart = styled.div`
  width: 250px;
  height: 250px;
  background-color: #fefefe;
`;
export interface IDeckProvision {
  cards: IDeckCard[];
}
interface ITemp {
  [key: string]: {
    [key: string]: number;
  };
  provision: {
    [key: string]: number;
  };
  strength: {
    [key: string]: number;
  };
  cardType: {
    [key: string]: number;
  };
  type: {
    [key: string]: number;
  };
  rarity: {
    [key: string]: number;
  };
}
type IChart = Array<{
  [key: string]: string | number;
  value: number;
}>;
interface IChartList {
  [key: string]: IChart;
}
const makeChart = (cards: IDeckCard[]) => {
  const temp: ITemp = {
    provision: {},
    strength: {},
    cardType: {},
    type: {},
    rarity: {},
  };
  cards.forEach(card => {
    const { cardCount } = card;
    Object.keys(temp).forEach(key => {
      const cardValue =
        key === 'rarity' ? card.variations[0].rarity : card[key];
      if (cardValue) {
        const preValue = temp[key][cardValue] || 0;
        temp[key][cardValue] = preValue + cardCount;
      }
    });
  });
  const chart: IChartList = {};
  Object.keys(temp).forEach(key => {
    const currentData = temp[key];
    const chartData = Object.entries(currentData).map(([x, y]) => {
      return { [key]: x, value: y };
    });
    chart[key] = chartData;
  });
  return chart;
};

const DeckProvision: React.SFC<IDeckProvision> = ({ cards }) => {
  const chart = makeChart(cards);
  return (
    <ChartList>
      {Object.entries(chart).map(([field, value]) => {
        return (
          <Chart>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryBar
                data={value}
                x={field}
                y="value"
                style={{
                  labels: {
                    fontSize: 14,
                  },
                }}
                labels={d => d.value}
              />
            </VictoryChart>
          </Chart>
        );
      })}
    </ChartList>
  );
};

export default memo(DeckProvision);
