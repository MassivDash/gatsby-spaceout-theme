import { ChartStyleWrapper } from './wrapper';
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const LineChartComplexity = ({ data }) => {
  return (
    <ChartStyleWrapper>
      <LineChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="complexity" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          strokeWidth={4}
          dataKey="complexity"
          stroke="#FFA500" // Orange color for complexity
        />
        <Line type="monotone" dataKey="files" stroke="#8884d8" />
        <Line type="monotone" dataKey="folders" stroke="#6495ED" />
        <Line type="monotone" dataKey="lines" stroke="#4169E1" />
        <Line type="monotone" dataKey="chars" stroke="#1E90FF" />
      </LineChart>
    </ChartStyleWrapper>
  );
};
