import React, { useMemo, useState } from 'react';
import { useColorMode } from 'theme-ui';
import './DecisionModelPlayground.css';

const examples = [
  { text: 'I was charged twice for my order.', weights: [95, 2, 1, 2] },
  { text: 'The app crashes when I try to log in.', weights: [2, 94, 1, 3] },
  {
    text: 'My parcel is late and tracking has stopped updating.',
    weights: [1, 2, 94, 3],
  },
  { text: 'Can you change the name on my account?', weights: [4, 8, 1, 87] },
];
const categories = ['billing', 'technical', 'shipping', 'other'];

export default function DecisionModelPlayground() {
  const [colorMode] = useColorMode();
  const [example, setExample] = useState(0);
  const [threshold, setThreshold] = useState(80);
  const [show, setShow] = useState(true);
  const current = examples[example];
  const winner = useMemo(
    () => current.weights.indexOf(Math.max(...current.weights)),
    [current],
  );
  const route =
    current.weights[winner] >= threshold && categories[winner] !== 'other'
      ? categories[winner]
      : 'human review';

  return (
    <section
      className="dm-widget"
      data-mode={colorMode}
      aria-label="Decision routing playground"
    >
      <p className="dm-caption">
        This is an illustrative simulation with fixed example probabilities,{' '}
        <strong>not</strong> a call to a model. Watch what changes when you
        raise the routing threshold.
      </p>

      <div className="dm-field">
        <span className="dm-section-label">
          <label htmlFor="decision-example">Customer message</label>
        </span>
        <select
          id="decision-example"
          className="dm-select"
          value={example}
          onChange={(event) => {
            setExample(Number(event.target.value));
            setShow(false);
            requestAnimationFrame(() => setShow(true));
          }}
        >
          {examples.map((item, index) => (
            <option key={item.text} value={index}>
              {item.text}
            </option>
          ))}
        </select>
      </div>

      <div className="dm-rate-row">
        <label className="dm-rate-label" htmlFor="decision-threshold">
          Automatic routing threshold: {threshold}%
        </label>
        <input
          id="decision-threshold"
          className="dm-range"
          type="range"
          min="0"
          max="100"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
        />
      </div>

      <div className="dm-bars" aria-label="Illustrative category probabilities">
        {categories.map((category, index) => (
          <div className="dm-bar-row" key={category}>
            <span className="dm-bar-label">{category}</span>
            <div className="dm-bar-track">
              <div
                className={`dm-bar-fill${
                  index === winner ? ' dm-bar-fill-winner' : ''
                }`}
                style={{ width: show ? `${current.weights[index]}%` : '0%' }}
              />
            </div>
            <span className="dm-bar-value">{current.weights[index]}%</span>
          </div>
        ))}
      </div>

      <p
        className={`dm-readout${
          route !== 'human review' ? ' dm-readout-accent' : ''
        }`}
        aria-live="polite"
      >
        <strong>Next step:</strong>{' '}
        {route === 'human review'
          ? 'Send to human review.'
          : `Route to ${route}.`}
      </p>

      <p className="dm-hint">
        These percentages are invented to explain the interface; real thresholds
        need calibration against labeled cases. A top-category probability is
        not a guarantee that a decision is correct.
      </p>
    </section>
  );
}
