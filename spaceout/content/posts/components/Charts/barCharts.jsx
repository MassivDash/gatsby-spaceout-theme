import React from 'react';
import { Bar, Rectangle } from 'recharts';
import './charts.css';
import { BarChartWrapper, Controls } from './wrapper';

export const AvgServerChart = ({ data }) => {
  return (
    <BarChartWrapper data={data}>
      <Bar
        dataKey="all"
        fill="#333333"
        activeBar={<Rectangle fill="#ed8e88" stroke="#fce3e2" />}
      />
      <Bar
        stackId={1}
        dataKey="image"
        fill="#195eec"
        activeBar={<Rectangle fill="#eb5751" stroke="#fce3e2" />}
      />
      <Bar
        stackId={1}
        dataKey="html"
        fill="#c93d22"
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
      <Controls
        mode={mode}
        onClickHtml={() => setMode(false)}
        onClickImage={() => setMode(true)}
      />
      <BarChartWrapper data={data}>
        <Bar
          dataKey="min"
          fill="#195eec"
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
