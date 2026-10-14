import React, { useMemo, useState } from 'react';
import { useColorMode } from 'theme-ui';
import './ScoreWeightedAverage.css';

const LEVELS = ['Cosmetic', 'Workaround available', 'Fully blocked'];

const PRESETS = {
  'Post example': [10, 70, 20],
  'Mostly cosmetic': [80, 15, 5],
  Split: [34, 33, 33],
  'Mostly blocked': [5, 15, 80],
};

export default function ScoreWeightedAverage() {
  const [colorMode] = useColorMode();
  const [weights, setWeights] = useState(PRESETS['Post example']);

  const total = weights.reduce((sum, value) => sum + value, 0) || 1;
  const probabilities = useMemo(
    () => weights.map((value) => value / total),
    [weights, total],
  );
  const score = useMemo(
    () =>
      probabilities.reduce(
        (sum, probability, index) => sum + index * probability,
        0,
      ),
    [probabilities],
  );

  function updateWeight(index, value) {
    setWeights((previous) =>
      previous.map((weight, i) => (i === index ? value : weight)),
    );
  }

  return (
    <section
      className="sc-widget"
      data-mode={colorMode}
      aria-label="Severity score calculator"
    >
      <p className="sc-caption">
        Drag the sliders to change how much probability mass sits on each level.
        The sliders don't need to sum to 100 — they're normalized automatically,
        same as a model's raw outputs would be.
      </p>

      <div className="sc-presets">
        {Object.entries(PRESETS).map(([label, preset]) => (
          <button
            key={label}
            type="button"
            className="sc-preset"
            onClick={() => setWeights(preset)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="sc-levels">
        {LEVELS.map((label, index) => (
          <div className="sc-level-row" key={label}>
            <span className="sc-level-label">
              <span className="sc-level-index">{index}</span>
              {label}
            </span>
            <input
              type="range"
              className="sc-range"
              min="0"
              max="100"
              value={weights[index]}
              onChange={(event) =>
                updateWeight(index, Number(event.target.value))
              }
              aria-label={`Probability weight for ${label}`}
            />
            <span className="sc-level-value">
              {Math.round(probabilities[index] * 100)}%
            </span>
          </div>
        ))}
      </div>

      <div className="sc-score-readout">
        <span className="sc-score-value" aria-live="polite">
          Score: {score.toFixed(2)}
        </span>
        <div className="sc-score-formula">
          {LEVELS.map(
            (_, index) => `${index}×${probabilities[index].toFixed(2)}`,
          ).join(' + ')}{' '}
          = {score.toFixed(2)}
        </div>
      </div>

      <p className="sc-hint">
        A score of {score.toFixed(2)} isn't a hidden fourth level — it's a
        summary of the distribution above. For a safety-critical decision, look
        at the level probabilities and your risk policy, not just this one
        number.
      </p>
    </section>
  );
}
