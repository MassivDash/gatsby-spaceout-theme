import React from 'react';
import './charts.css';
import { BarChartWrapper } from './wrapper';
import { Bar, Rectangle } from 'recharts';

export const ComplexityChart = ({ data }) => {
  const sorted = data.sort(
    (a, b) => Number(a.complexity) - Number(b.complexity),
  );

  return (
    <BarChartWrapper data={sorted}>
      <Bar
        stackId={0}
        dataKey="complexity"
        fill="#333333"
        activeBar={<Rectangle fill="#ed8e88" stroke="#fce3e2" />}
      />
      <Bar stackId={1} dataKey="files" fill="#4c8bf5" />
      <Bar stackId={1} dataKey="folders" fill="#5dd39e" />
      <Bar stackId={1} dataKey="codelines" fill="#f5a04c" />
    </BarChartWrapper>
  );
};
