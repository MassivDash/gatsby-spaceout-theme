import React, { useState } from 'react';
import { useColorMode } from 'theme-ui';
import './FitnessPipeline.css';

const CHECKS = [
  {
    id: 'coupling',
    label: 'Coupling Budget',
    detail: 'Reporting service must not call the Orders DB directly.',
    initial: 'pass',
  },
  {
    id: 'latency',
    label: 'Latency SLA',
    detail: 'P95 response time under 200ms for checkout.',
    initial: 'pass',
  },
  {
    id: 'security',
    label: 'Security Scan',
    detail: 'No high-severity CVEs in the dependency graph.',
    initial: 'fail',
  },
  {
    id: 'chaos',
    label: 'Chaos Resilience',
    detail: 'Service degrades gracefully when a dependency is killed.',
    initial: 'unguarded',
  },
];

const NEXT_STATE = {
  unguarded: 'pass',
  pass: 'fail',
  fail: 'unguarded',
};

const STATE_COPY = {
  unguarded: 'no fitness function',
  pass: 'passing',
  fail: 'failing',
};

export const FitnessPipeline = () => {
  const [colorMode] = useColorMode();
  const [states, setStates] = useState(() =>
    CHECKS.reduce((acc, check) => {
      acc[check.id] = check.initial;
      return acc;
    }, {}),
  );

  const cycle = (id) => {
    setStates((prev) => ({ ...prev, [id]: NEXT_STATE[prev[id]] }));
  };

  const failing = CHECKS.filter((check) => states[check.id] === 'fail');
  const unguarded = CHECKS.filter((check) => states[check.id] === 'unguarded');

  let deployState = 'clean';
  if (failing.length > 0) deployState = 'blocked';
  else if (unguarded.length > 0) deployState = 'silent';

  return (
    <div className="fp-widget" data-mode={colorMode}>
      <p className="fp-caption">
        Click a check to cycle it through the three ways a fitness function can
        sit in your pipeline. Watch what happens to the deploy stage.
      </p>
      <div className="fp-pipeline">
        <div className="fp-stage fp-stage-static">
          <span className="fp-stage-label">Commit</span>
        </div>
        <span className="fp-arrow" aria-hidden="true">
          &rarr;
        </span>
        <div className="fp-stage fp-stage-static">
          <span className="fp-stage-label">Build</span>
        </div>
        <span className="fp-arrow" aria-hidden="true">
          &rarr;
        </span>
        <div className="fp-stage fp-stage-checks">
          <span className="fp-stage-label">Fitness Functions</span>
          <div className="fp-checks">
            {CHECKS.map((check) => {
              const state = states[check.id];
              return (
                <button
                  key={check.id}
                  type="button"
                  className={`fp-check fp-check-${state}`}
                  onClick={() => cycle(check.id)}
                  title={check.detail}
                >
                  <span className="fp-check-label">{check.label}</span>
                  <span className="fp-check-state">{STATE_COPY[state]}</span>
                </button>
              );
            })}
          </div>
        </div>
        <span className="fp-arrow" aria-hidden="true">
          &rarr;
        </span>
        <div className={`fp-stage fp-stage-deploy fp-deploy-${deployState}`}>
          <span className="fp-stage-label">Deploy</span>
          <span className="fp-deploy-verdict">
            {deployState === 'blocked' && 'BLOCKED'}
            {deployState === 'silent' && 'SHIPPED'}
            {deployState === 'clean' && 'SHIPPED'}
          </span>
        </div>
      </div>
      <p className={`fp-verdict fp-verdict-${deployState}`}>
        {deployState === 'blocked' &&
          `Build goes red — ${failing
            .map((c) => c.label)
            .join(
              ', ',
            )} violated a fitness function nobody has to argue about.`}
        {deployState === 'silent' &&
          `Ships fine, but ${unguarded
            .map((c) => c.label)
            .join(
              ', ',
            )} has no fitness function watching it. That characteristic can rot for months before anyone notices.`}
        {deployState === 'clean' &&
          'Every characteristic the team agreed mattered is enforced. Nothing here is a vibe.'}
      </p>
    </div>
  );
};

export default FitnessPipeline;
