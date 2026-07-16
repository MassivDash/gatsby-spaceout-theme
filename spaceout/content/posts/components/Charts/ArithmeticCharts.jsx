import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import { ChartStyleWrapper } from './wrapper';

const SEQUENTIAL_BLUE = '#2a78d6';
const STATUS_GOOD = '#0ca30c';
const STATUS_CRITICAL = '#d03b3b';
const CATEGORICAL_1 = '#2a78d6';
const CATEGORICAL_2 = '#eb6834';

export const TaskFamilyAccuracyChart = ({ data }) => {
  const [showTable, setShowTable] = React.useState(false);

  return (
    <>
      <div className="controls">
        <button
          className={!showTable ? 'chart-control active' : 'chart-control'}
          onClick={() => setShowTable(false)}
        >
          chart
        </button>
        <button
          className={showTable ? 'chart-control active' : 'chart-control'}
          onClick={() => setShowTable(true)}
        >
          table
        </button>
      </div>
      {showTable ? (
        <table
          style={{
            width: '100%',
            maxWidth: 1150,
            margin: '0 auto',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderBottom: '2px solid currentColor',
                }}
              >
                Task family
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderBottom: '2px solid currentColor',
                }}
              >
                Best accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.task}>
                <td
                  style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid rgba(128,128,128,0.25)',
                  }}
                >
                  {row.task}
                </td>
                <td
                  style={{
                    padding: '8px 12px',
                    borderBottom: '1px solid rgba(128,128,128,0.25)',
                  }}
                >
                  {row.accuracy}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ChartStyleWrapper height={420}>
          <div style={{ width: '100%', height: 420 }}>
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis dataKey="task" type="category" width={140} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar
                  dataKey="accuracy"
                  name="Best accuracy"
                  fill={SEQUENTIAL_BLUE}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartStyleWrapper>
      )}
    </>
  );
};

export const ReasoningVsChatChart = ({ data }) => {
  return (
    <ChartStyleWrapper height={620}>
      <div style={{ width: '100%', height: 620 }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 9]} allowDecimals={false} />
            <YAxis dataKey="model" type="category" width={130} />
            <Tooltip
              formatter={(value, name, props) => [
                `${props.payload.score} / 9`,
                'Sum accuracy',
              ]}
            />
            <Legend
              payload={[
                {
                  value: 'Reasoning models',
                  type: 'square',
                  color: STATUS_GOOD,
                },
                {
                  value: 'Non-reasoning (chat) models',
                  type: 'square',
                  color: STATUS_CRITICAL,
                },
              ]}
            />
            <Bar dataKey="score" name="Sum-benchmark score">
              {data.map((entry) => (
                <Cell
                  key={entry.model}
                  fill={
                    entry.group === 'Reasoning' ? STATUS_GOOD : STATUS_CRITICAL
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const AccuracyDecayChart = ({ data }) => {
  return (
    <ChartStyleWrapper height={320}>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="config" />
            <YAxis domain={[0, 50]} unit="%" />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="Sum accuracy"
              stroke={SEQUENTIAL_BLUE}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const CostPerSumChart = ({ data }) => {
  return (
    <ChartStyleWrapper height={340}>
      <div style={{ width: '100%', height: 340 }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(v) => `$${v}`} />
            <YAxis dataKey="model" type="category" width={110} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="cost" name="Cost per sum" fill={SEQUENTIAL_BLUE} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const PriceVsAccuracyChart = ({ data }) => {
  return (
    <ChartStyleWrapper height={380}>
      <div style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="cost"
              name="Cost per sum"
              scale="log"
              domain={['auto', 'auto']}
              allowDataOverflow
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="score"
              name="Datasets correct"
              domain={[0, 9]}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const point = payload[0].payload;
                return (
                  <div
                    style={{
                      background: '#fff',
                      border: '1px solid #ccc',
                      padding: '8px 12px',
                      borderRadius: 4,
                    }}
                  >
                    <strong>{point.model}</strong>
                    <div>${point.cost} per sum</div>
                    <div>{point.score} / 9 correct</div>
                  </div>
                );
              }}
            />
            <Legend
              payload={[
                {
                  value: 'Reasoning models',
                  type: 'circle',
                  color: STATUS_GOOD,
                },
                {
                  value: 'Non-reasoning (chat) models',
                  type: 'circle',
                  color: STATUS_CRITICAL,
                },
              ]}
            />
            <Scatter name="Models" data={data}>
              {data.map((entry) => (
                <Cell
                  key={entry.model}
                  fill={
                    entry.group === 'Reasoning' ? STATUS_GOOD : STATUS_CRITICAL
                  }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const ClaudeVsOpenAIChart = ({ data }) => {
  return (
    <ChartStyleWrapper height={340}>
      <div style={{ width: '100%', height: 340 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="task" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="OpenAI" name="OpenAI (GPT)" fill={CATEGORICAL_1} />
            <Bar dataKey="Claude" name="Claude" fill={CATEGORICAL_2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const KpiTierChart = ({ data }) => {
  return (
    <ChartStyleWrapper height={320}>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tier" />
            <YAxis domain={[0, 100]} unit="%" />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar dataKey="Property" name="Property KPIs" fill={CATEGORICAL_1} />
            <Bar
              dataKey="Fund"
              name="Fund financial KPIs"
              fill={CATEGORICAL_2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartStyleWrapper>
  );
};

export const KeyFindingsStats = ({ data }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        margin: '40px 0',
      }}
    >
      {data.map((stat) => (
        <div
          key={stat.label}
          style={{
            border: '1px solid rgba(128,128,128,0.25)',
            borderRadius: 6,
            padding: '20px 18px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: SEQUENTIAL_BLUE,
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              margin: '8px 0 4px',
            }}
          >
            {stat.label}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{stat.sub}</div>
        </div>
      ))}
    </div>
  );
};
