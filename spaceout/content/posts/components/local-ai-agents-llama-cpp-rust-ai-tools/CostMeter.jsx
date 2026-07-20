import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from 'theme-ui';
import './CostMeter.css';

const TICK_MS = 600;
const TOKENS_PER_TICK_BASE = 800;
const COST_PER_1K = 0.003;
const MAX_BAR_TOKENS = 20000;
const OCHRE_THRESHOLD = 0.4;
const BLOOD_THRESHOLD = 0.75;

export const CostMeter = () => {
  const [colorMode] = useColorMode();
  const [running, setRunning] = useState(false);
  const [ticks, setTicks] = useState(0);
  const [tokens, setTokens] = useState(0);
  const intervalRef = useRef(null);

  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    [],
  );

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTokens((prev) => prev + TOKENS_PER_TICK_BASE + Math.round(Math.random() * 80 - 40));
      setTicks((prev) => prev + 1);
    }, TICK_MS);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  };

  const reset = () => {
    stop();
    setTicks(0);
    setTokens(0);
  };

  const cost = (tokens / 1000) * COST_PER_1K;
  const fillRatio = Math.min(tokens / MAX_BAR_TOKENS, 1);

  let cloudBarState = 'normal';
  if (fillRatio >= BLOOD_THRESHOLD) cloudBarState = 'blood';
  else if (fillRatio >= OCHRE_THRESHOLD) cloudBarState = 'ochre';

  return (
    <div className="cm-widget" data-mode={colorMode}>
      <p className="cm-caption">
        <em>Let both agents idle in a background loop.</em>
      </p>

      <div className="cm-meter">
        <div className="cm-meter-header">
          <span className="cm-meter-label">Cloud</span>
          <span className="cm-meter-readout">
            {Math.round(tokens).toLocaleString()} tok · ${cost.toFixed(2)}
          </span>
        </div>
        <div className="cm-track" aria-hidden="true">
          <span
            className={`cm-fill cm-fill-${cloudBarState}`}
            style={{ width: `${fillRatio * 100}%` }}
          />
        </div>
      </div>

      <div className="cm-meter">
        <div className="cm-meter-header">
          <span className="cm-meter-label">Local</span>
          <span className="cm-meter-readout">
            {Math.round(tokens).toLocaleString()} tok · $0.00
          </span>
        </div>
        <div className="cm-track" aria-hidden="true">
          <span
            className="cm-fill cm-fill-steady"
            style={{ width: `${fillRatio * 100}%` }}
          />
        </div>
      </div>

      <div className="cm-controls">
        <button type="button" className="cm-button" onClick={running ? stop : start}>
          {running ? 'Stop' : 'Start'}
        </button>
        <button type="button" className="cm-button cm-button-ghost" onClick={reset}>
          Reset
        </button>
        <span className="cm-ticks">{ticks} ticks</span>
      </div>

      <p className="cm-lesson">Same work. One meter climbs, one doesn't.</p>
    </div>
  );
};

export default CostMeter;
