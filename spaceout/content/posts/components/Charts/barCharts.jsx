import React from 'react';
import { Bar, Rectangle } from 'recharts';
import './charts.css';
import { BarChartWrapper } from './wrapper';

export const AvgServerChart = ({ data }) => {
  return (
    <BarChartWrapper data={data}>
      <Bar
        dataKey="all"
        fill="#c93d22"
        activeBar={<Rectangle fill="#ed8e88" stroke="#fce3e2" />}
      />
      <Bar
        stackId={1}
        dataKey="image"
        fill="#4e6ab9"
        activeBar={<Rectangle fill="#eb5751" stroke="#fce3e2" />}
      />
      <Bar
        stackId={1}
        dataKey="html"
        fill="#82b9f4"
        stroke="#fce3e2"
        activeBar={<Rectangle fill="#e7a1a5" stroke="#fce3e2" />}
      />
    </BarChartWrapper>
  );
};
export const MinMaxServerChart = ({ html, image }) => {
  const [mode, setMode] = React.useState(false);

  const data = !mode ? html : image;
  return (
    <>
      <div className="controls">
        <button
          className={!mode ? 'chart-control active' : 'chart-control'}
          onClick={() => setMode(false)}
        >
          html
        </button>
        <button
          className={mode ? 'chart-control active' : 'chart-control'}
          onClick={() => setMode(true)}
        >
          image
        </button>
      </div>
      <BarChartWrapper data={data}>
        <Bar
          dataKey="min"
          fill="#82b9f4"
          activeBar={<Rectangle fill="#ed8e88" stroke="#fce3e2" />}
        />
        <Bar
          dataKey="max"
          fill="#c93d22"
          activeBar={<Rectangle fill="#ed8e88" stroke="#fce3e2" />}
        />
      </BarChartWrapper>
    </>
  );
};
