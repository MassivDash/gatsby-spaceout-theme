import React, { useMemo, useState } from 'react';
import './LaneChangeDecision.css';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function LaneChangeDecision() {
  const [gapAhead, setGapAhead] = useState(15);
  const [gapTarget, setGapTarget] = useState(45);
  const [closingSpeed, setClosingSpeed] = useState(15);
  const [signalOn, setSignalOn] = useState(true);
  const [threshold, setThreshold] = useState(70);

  const probability = useMemo(() => {
    const raw =
      50 +
      (gapTarget - gapAhead) * 0.5 -
      closingSpeed * 1.0 +
      (signalOn ? 8 : 0);
    return clamp(raw, 2, 98);
  }, [gapAhead, gapTarget, closingSpeed, signalOn]);

  const willChange = probability >= threshold;

  const egoPercent = 30;
  const aheadPercent = 46 + ((gapAhead - 5) / 75) * 39;
  const behindPercent = Math.max(2, 18 - ((gapTarget - 5) / 75) * 16);

  return (
    <section className="lc-widget" aria-label="Lane change predicate demo">
      <p className="lc-caption">
        A predicate decision in motion:{' '}
        <strong>should this car change lanes right now?</strong> This is a toy
        heuristic built for this page, not a trained model — adjust the gaps,
        the closing speed, and the signal, and watch the probability (and the
        car) respond.
      </p>

      <div className="lc-road" aria-hidden="true">
        <div className="lc-lane-divider" />
        <span className="lc-lane-tag lc-lane-tag-top">Current lane</span>
        <span className="lc-lane-tag lc-lane-tag-bottom">Target lane</span>

        <div
          className="lc-car lc-car-ahead"
          style={{ left: `${aheadPercent}%` }}
        >
          ahead
        </div>
        <div
          className={`lc-car lc-car-behind${
            closingSpeed >= 25 ? ' lc-car-behind-fast' : ''
          }`}
          style={{ left: `${behindPercent}%` }}
        >
          behind
        </div>
        <div
          className={`lc-car lc-car-ego${
            willChange ? ' lc-car-ego-bottom' : ''
          }`}
          style={{ left: `${egoPercent}%` }}
        >
          you
        </div>
      </div>

      <div className="lc-controls">
        <div className="lc-rate-row">
          <label className="lc-rate-label" htmlFor="lc-gap-ahead">
            Gap ahead in your lane: {gapAhead} m
          </label>
          <input
            id="lc-gap-ahead"
            className="lc-range"
            type="range"
            min="5"
            max="80"
            step="5"
            value={gapAhead}
            onChange={(event) => setGapAhead(Number(event.target.value))}
          />
        </div>

        <div className="lc-rate-row">
          <label className="lc-rate-label" htmlFor="lc-gap-target">
            Gap available in target lane: {gapTarget} m
          </label>
          <input
            id="lc-gap-target"
            className="lc-range"
            type="range"
            min="5"
            max="80"
            step="5"
            value={gapTarget}
            onChange={(event) => setGapTarget(Number(event.target.value))}
          />
        </div>

        <div className="lc-rate-row">
          <label className="lc-rate-label" htmlFor="lc-closing-speed">
            Closing speed of traffic behind in target lane: {closingSpeed} km/h
          </label>
          <input
            id="lc-closing-speed"
            className="lc-range"
            type="range"
            min="-20"
            max="40"
            step="5"
            value={closingSpeed}
            onChange={(event) => setClosingSpeed(Number(event.target.value))}
          />
        </div>

        <div className="lc-signal-row">
          <input
            id="lc-signal"
            type="checkbox"
            checked={signalOn}
            onChange={(event) => setSignalOn(event.target.checked)}
          />
          <label htmlFor="lc-signal">Turn signal on</label>
        </div>
      </div>

      <div className="lc-threshold-row">
        <label className="lc-rate-label" htmlFor="lc-threshold">
          Decision threshold: {threshold}%
        </label>
        <input
          id="lc-threshold"
          className="lc-range"
          type="range"
          min="0"
          max="100"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
        />
      </div>

      <div className="lc-readout">
        <span className="lc-decision" aria-live="polite">
          {willChange ? 'Change lanes' : 'Stay in lane'} —{' '}
          {Math.round(probability)}%{willChange ? ' ≥ ' : ' < '}
          {threshold}% threshold
        </span>
        <div className="lc-formula">
          50 + ({gapTarget}−{gapAhead})×0.5 − {closingSpeed}×1.0 + (
          {signalOn ? 'signal' : 'no signal'}){signalOn ? '×8' : ''} ={' '}
          {Math.round(probability)}%
        </div>
      </div>

      <p className="lc-hint">
        The probability is a made-up formula for this demo, not a model output.
        A real predicate like this would come from a model evaluated against
        labeled lane-change outcomes, the same way the confidence gate above
        needs calibration before you'd trust its threshold in production.
      </p>
    </section>
  );
}
