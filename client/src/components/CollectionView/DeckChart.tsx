import React, { memo } from 'react';
import styled from 'styled-components';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { IDeckCard } from '../../types/deck';

const ChartList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Chart = styled.div`
  width: 200px;
  height: 200px;
`;
export interface IDeckChartProps {
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
const DeckChart: React.SFC<IDeckChartProps> = ({ cards }) => {
  const chart = makeChart(cards);
  return (
    <ChartList>
      {Object.entries(chart).map(([field, value]) => {
        return (
          <Chart key={field}>
            <VictoryChart width={250} height={200}>
              <VictoryAxis
                style={{
                  axis: { stroke: '#fefefe' },
                  axisLabel: { fill: '#fefefe', fontSize: 20 },
                  tickLabels: { fontSize: 14, fill: '#fefefe' },
                }}
                label={field.toUpperCase()}
              />
              <VictoryBar
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                data={value}
                x={field}
                y="value"
                style={{
                  parent: {
                    color: '#fefefe',
                    border: '1px solid #fefefe',
                    strokeOpacity: 0,
                    fontSize: 14,
                  },
                  data: {
                    color: '#fefefe',
                    fill: '#fefefe',
                    fontSize: 14,
                  },
                  labels: {
                    fill: '#fefefe',
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

export default memo(DeckChart);
