import React, { useMemo, useState } from 'react';
import { useColorMode } from 'theme-ui';
import './RoutingBatchSimulator.css';

const TICKET_CONFIDENCES = [
  98, 96, 94, 92, 90, 88, 85, 83, 80, 77, 74, 70, 67, 63, 58, 53, 47, 40,
];

export default function RoutingBatchSimulator() {
  const [colorMode] = useColorMode();
  const [threshold, setThreshold] = useState(85);

  const autoCount = useMemo(
    () => TICKET_CONFIDENCES.filter((value) => value >= threshold).length,
    [threshold],
  );
  const total = TICKET_CONFIDENCES.length;
  const reviewCount = total - autoCount;
  const autoPercent = Math.round((autoCount / total) * 100);

  return (
    <section
      className="rb-widget"
      data-mode={colorMode}
      aria-label="Batch routing threshold simulator"
    >
      <p className="rb-caption">
        The same {total} tickets, every time — only the threshold moves. This is
        the aggregate version of the confidence gate above: one slider, applied
        across a whole queue instead of one message.
      </p>

      <div className="rb-rate-row">
        <label className="rb-rate-label" htmlFor="batch-threshold">
          Automatic routing threshold: {threshold}%
        </label>
        <input
          id="batch-threshold"
          className="rb-range"
          type="range"
          min="30"
          max="100"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
        />
      </div>

      <div className="rb-split-bar" aria-hidden="true">
        <div className="rb-split-auto" style={{ width: `${autoPercent}%` }} />
        <div
          className="rb-split-review"
          style={{ width: `${100 - autoPercent}%` }}
        />
      </div>

      <p className="rb-legend">
        <span>
          <span className="rb-legend-dot rb-legend-dot-auto" />
          {autoCount} auto-routed ({autoPercent}%)
        </span>
        <span>
          <span className="rb-legend-dot rb-legend-dot-review" />
          {reviewCount} sent to human review
        </span>
      </p>

      <div
        className="rb-tickets"
        role="list"
        aria-label="Individual ticket confidence scores"
      >
        {TICKET_CONFIDENCES.map((confidence, index) => (
          <span
            key={index}
            role="listitem"
            className={`rb-ticket${
              confidence >= threshold ? ' rb-ticket-auto' : ''
            }`}
          >
            {confidence}%
          </span>
        ))}
      </div>

      <p className="rb-hint">
        These confidence values are fixed and invented, standing in for a day's
        worth of top-category scores. Raising the threshold doesn't make any
        individual ticket more or less correct — it only changes how much of the
        queue you're willing to trust without a person looking.
      </p>
    </section>
  );
}
