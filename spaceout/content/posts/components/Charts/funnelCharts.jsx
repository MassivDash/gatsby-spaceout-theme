import React from 'react';
import { RadialBar, RadialBarChart, Tooltip, Legend } from 'recharts';
import './charts.css';
import { ChartStyleWrapper, Controls } from './wrapper';

function calculatePercentage(number, total) {
  return ((number / total) * 100).toFixed();
}

function generateRange(n, maxNumber) {
  const step = maxNumber / (n - 1);
  return Array.from({ length: n }, (_, i) => [i * step, (i + 1) * step]);
}

function lightenColor(color, index) {
  // Convert the color to RGB
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);

  // Increase the brightness
  const factor = 1 + index * 0.1;
  r = Math.min(255, Math.round(r * factor));
  g = Math.min(255, Math.round(g * factor));
  b = Math.min(255, Math.round(b * factor));

  // Convert the color back to hexadecimal
  const lighterColor =
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');

  return lighterColor;
}

function countInRange(array, min, max) {
  return array.filter((value) => value >= min && value <= max).length;
}

function createFunnel(timeValues) {
  // Sort the array in ascending order

  timeValues.sort((a, b) => a - b);

  const maxValue = timeValues[timeValues.length - 1];

  // Define the number of groups
  const numGroups = 5;

  const ranges = generateRange(numGroups, maxValue);

  // Create the groups

  const funnel = ranges.map((array) => ({
    min: array[0].toFixed(2),
    max: array[array.length - 1].toFixed(2),
    count: countInRange(
      timeValues,
      array[0].toFixed(2),
      array[array.length - 1].toFixed(2),
    ),
    value: calculatePercentage(
      countInRange(
        timeValues,
        array[0].toFixed(2),
        array[array.length - 1].toFixed(2),
      ),
      timeValues.length,
    ),
  }));

  return funnel;
}

export const FunnelTime = ({ data }) => {
  const [mode, setMode] = React.useState(false);

  const html = data
    .filter((item) => item['Content-Type'] === 'text/html')
    .map((item, index) => ({ ...item, index }));
  const image = data
    .filter((item) => item['Content-Type'] === 'image/png')
    .map((item, index) => ({ ...item, index }));

  const finalData = !mode ? html : image;

  const transformToFunnel = createFunnel(
    finalData.map((item) => Number(item.Time)),
  );
  const funnelData = transformToFunnel.map((item, index) => ({
    name: `${Number(item.min).toFixed()}ms - ${Number(item.max).toFixed()}ms`,
    index: `${Number(item.min).toFixed()}ms - ${Number(item.max).toFixed()}ms`,
    Time: item.value,
    count: item.count,
    fill: lightenColor(!mode ? '#195eec' : '#c93d22', index * 2),
  }));

  return (
    <div className="funnel">
      <Controls
        mode={mode}
        onClickHtml={() => setMode(false)}
        onClickImage={() => setMode(true)}
      />
      <ChartStyleWrapper>
        <RadialBarChart
          innerRadius="10%"
          outerRadius="80%"
          data={funnelData}
          startAngle={180}
          endAngle={0}
          barSize={20}
          barGap={5}
        >
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart' }}
            background
            clockWise={true}
            dataKey="count"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
          <Tooltip />
        </RadialBarChart>
      </ChartStyleWrapper>
    </div>
  );
};
