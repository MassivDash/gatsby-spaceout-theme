import React, { useState } from 'react';
import { useColorMode } from 'theme-ui';
import './CouplingGraph.css';

const NODES = [
  { id: 'orders', label: 'Orders', x: 200, y: 60 },
  { id: 'payments', label: 'Payments', x: 333, y: 157 },
  { id: 'shipping', label: 'Shipping', x: 282, y: 313 },
  { id: 'inventory', label: 'Inventory', x: 118, y: 313 },
  { id: 'reporting', label: 'Reporting', x: 67, y: 157 },
];

const STATIC_EDGES = [
  { from: 'orders', to: 'payments' },
  { from: 'orders', to: 'inventory' },
  { from: 'payments', to: 'shipping' },
  { from: 'inventory', to: 'shipping' },
];

const DYNAMIC_EDGES = [
  { from: 'reporting', to: 'orders' },
  { from: 'reporting', to: 'payments' },
  { from: 'shipping', to: 'reporting' },
];

const nodeById = NODES.reduce((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {});

const touchesNode = (edge, id) => edge.from === id || edge.to === id;

export const CouplingGraph = () => {
  const [colorMode] = useColorMode();
  const [showDynamic, setShowDynamic] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleSelected = (id) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  return (
    <div className="cg-widget" data-mode={colorMode}>
      <div className="cg-controls">
        <p className="cg-caption">
          This is the dependency diagram Reporting ships with — clean, four
          edges, nothing touching it. Reveal what actually happens at runtime.
        </p>
        <button
          type="button"
          className="cg-toggle"
          onClick={() => setShowDynamic((prev) => !prev)}
        >
          {showDynamic ? 'Hide runtime coupling' : 'Reveal dynamic coupling'}
        </button>
      </div>
      <svg
        className="cg-svg"
        viewBox="0 0 400 380"
        role="img"
        aria-label="Service coupling graph"
      >
        {STATIC_EDGES.map((edge) => {
          const from = nodeById[edge.from];
          const to = nodeById[edge.to];
          const dimmed = selected && !touchesNode(edge, selected);
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              className={`cg-edge cg-edge-static ${dimmed ? 'cg-dimmed' : ''}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
            />
          );
        })}
        {showDynamic &&
          DYNAMIC_EDGES.map((edge) => {
            const from = nodeById[edge.from];
            const to = nodeById[edge.to];
            const dimmed = selected && !touchesNode(edge, selected);
            return (
              <line
                key={`${edge.from}-${edge.to}-dynamic`}
                className={`cg-edge cg-edge-dynamic ${
                  dimmed ? 'cg-dimmed' : ''
                }`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
            );
          })}
        {NODES.map((node) => {
          const isSelected = selected === node.id;
          const isDimmed =
            selected &&
            !isSelected &&
            ![...STATIC_EDGES, ...(showDynamic ? DYNAMIC_EDGES : [])].some(
              (edge) =>
                touchesNode(edge, selected) && touchesNode(edge, node.id),
            );
          return (
            <g
              key={node.id}
              className={`cg-node ${isSelected ? 'cg-node-selected' : ''} ${
                isDimmed ? 'cg-dimmed' : ''
              }`}
              onClick={() => toggleSelected(node.id)}
            >
              <circle cx={node.x} cy={node.y} r="28" />
              <text x={node.x} y={node.y + 4} textAnchor="middle">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="cg-legend">
        <span className="cg-legend-item">
          <span className="cg-swatch cg-swatch-static" /> static — visible in
          the build graph
        </span>
        <span className="cg-legend-item">
          <span className="cg-swatch cg-swatch-dynamic" /> dynamic — only
          visible at runtime
        </span>
      </p>
      {showDynamic && (
        <p className="cg-callout">
          Reporting has zero static dependencies and three runtime ones. On the
          architecture diagram it's the safest node in the system.
        </p>
      )}
    </div>
  );
};

export default CouplingGraph;
