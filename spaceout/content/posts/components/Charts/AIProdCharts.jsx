import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ScatterChart,
  Scatter,
} from 'recharts';
import { ChartStyleWrapper } from './wrapper';

export const LineChartGrowth = ({ data }) => {
  return (
    <ChartStyleWrapper>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="models"
              name="Cumulative Models"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const FunnelAdoption = ({ data }) => {
  return (
    <ChartStyleWrapper>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="stage" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" name="Adoption %" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const ScatterSmol = ({ data }) => {
  return (
    <ChartStyleWrapper>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="params"
              name="Parameters (M)"
              unit="M"
              scale="log"
              domain={['auto', 'auto']}
              allowDataOverflow
            />
            <YAxis
              type="number"
              dataKey="downloads"
              name="Downloads"
              unit="M"
              scale="log"
              domain={['auto', 'auto']}
              allowDataOverflow
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Models" data={data} fill="#8884d8">
              {data.map((entry, index) => {
                let fill = '#8884d8';
                if (entry.zone === 'Utility') fill = '#82ca9d';
                if (entry.zone === 'Frontier') fill = '#8884d8';
                if (entry.zone === 'Specialized') fill = '#ff7300';
                if (entry.zone === 'Stranded') fill = '#ff0000';
                return <Cell key={`cell-${index}`} fill={fill} />;
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const BarChartDownloads = ({ data }) => {
  return (
    <ChartStyleWrapper>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" name="Downloads/Share %">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};
