import './charts.css';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import React from 'react';
import { Observer } from '../intersectionObserver';
export const ChartStyleWrapper = ({ children }) => {
  return (
    <Observer>
      <div className="chartInnerHolder">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </Observer>
  );
};

export const BarChartWrapper = ({ children, data, xAxisDataKey = 'name' }) => (
  <ChartStyleWrapper>
    <BarChart
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
      <XAxis dataKey={xAxisDataKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {children}
    </BarChart>
  </ChartStyleWrapper>
);

export const Controls = ({ mode, onClickHtml, onClickImage }) => {
  return (
    <div className="controls">
      <button
        className={!mode ? 'chart-control active' : 'chart-control'}
        onClick={onClickHtml}
      >
        html
      </button>
      <button
        className={mode ? 'chart-control active' : 'chart-control'}
        onClick={onClickImage}
      >
        image
      </button>
    </div>
  );
};

export default ChartStyleWrapper;
