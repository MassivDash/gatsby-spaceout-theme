import React from 'react';
import { ChartStyleWrapper, Controls } from './wrapper';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ComposedChart,
} from 'recharts';

export const ScatterChart = ({ data, labelKey = 'name' }) => {
  const [mode, setMode] = React.useState(false);

  const name = data[0][labelKey] || 'Error';

  const html = data
    .filter((item) => item['Content-Type'] === 'text/html')
    .map((item, index) => ({ ...item, index }));
  const image = data
    .filter((item) => item['Content-Type'] === 'image/png')
    .map((item, index) => ({ ...item, index }));

  const finalData = !mode ? html : image;

  return (
    <div className="funnel">
      <Controls
        mode={mode}
        onClickHtml={() => setMode(false)}
        onClickImage={() => setMode(true)}
      />
      <ChartStyleWrapper>
        <ComposedChart
          width={500}
          height={400}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 50,
          }}
          data={finalData}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <Legend />

          <XAxis dataKey="index" type="number" />
          {mode && (
            <YAxis
              unit="ms"
              type="number"
              domain={[400, (dataMax) => dataMax * 2]}
            />
          )}
          {!mode && <YAxis unit="ms" type="number" includeHidden />}
          <Scatter
            name={name}
            dataKey="Time"
            fill={!mode ? '#195eec' : '#c93d22'}
          />
        </ComposedChart>
      </ChartStyleWrapper>
    </div>
  );
};
