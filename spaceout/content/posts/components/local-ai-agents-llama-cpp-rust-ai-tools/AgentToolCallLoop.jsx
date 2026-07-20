import React, { useRef, useState } from 'react';
import { useColorMode } from 'theme-ui';
import './AgentToolCallLoop.css';

const STEPS = [
  { id: 'search_file', label: 'search_file' },
  { id: 'list_top_processes', label: 'list_top_processes' },
  { id: 'grep_search', label: 'grep_search' },
  { id: 'open_folder', label: 'open_folder' },
];

const TOKEN_GEN_MS = 120;
const HTTP_ROUND_TRIP_MS = 350;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const randomToolExecMs = () => 20 + Math.random() * 40;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AgentToolCallLoop = () => {
  const [colorMode] = useColorMode();
  const [mode, setMode] = useState('local');
  const [running, setRunning] = useState(false);
  const [hopMs, setHopMs] = useState(() => STEPS.map(() => null));
  const [activeStep, setActiveStep] = useState(-1);
  const runToken = useRef(0);

  const total = hopMs.reduce((sum, ms) => sum + (ms || 0), 0);

  const runLoop = async () => {
    if (running) return;
    const token = ++runToken.current;
    setRunning(true);
    setActiveStep(-1);
    setHopMs(STEPS.map(() => null));

    const reduceMotion = prefersReducedMotion();

    for (let i = 0; i < STEPS.length; i += 1) {
      if (runToken.current !== token) return;
      setActiveStep(i);

      const toolExec = randomToolExecMs();
      const httpRoundTrip = mode === 'cloud' ? HTTP_ROUND_TRIP_MS : 0;
      const ms = TOKEN_GEN_MS + toolExec + httpRoundTrip;

      if (!reduceMotion) {
        await sleep(Math.min(ms, 500));
      }
      if (runToken.current !== token) return;

      setHopMs((prev) => {
        const next = [...prev];
        next[i] = ms;
        return next;
      });
    }

    if (runToken.current === token) {
      setActiveStep(-1);
      setRunning(false);
    }
  };

  const caption =
    mode === 'local'
      ? 'Local: the only latency left is your own token generation.'
      : 'Cloud: every hop pays an HTTP round trip before the model can think again.';

  return (
    <div className="atcl-widget" data-mode={colorMode}>
      <p className="atcl-caption">
        <em>
          Run the same loop locally and in the cloud — watch the round trips
          stack up.
        </em>
      </p>

      <div className="atcl-controls">
        <div className="atcl-segmented" role="group" aria-label="Execution target">
          <button
            type="button"
            className="atcl-segment"
            aria-pressed={mode === 'local'}
            onClick={() => !running && setMode('local')}
            disabled={running}
          >
            Local
          </button>
          <button
            type="button"
            className="atcl-segment"
            aria-pressed={mode === 'cloud'}
            onClick={() => !running && setMode('cloud')}
            disabled={running}
          >
            Cloud
          </button>
        </div>
        <button
          type="button"
          className="atcl-run"
          onClick={runLoop}
          disabled={running}
        >
          {running ? 'Running…' : 'Run loop'}
        </button>
      </div>

      <ol className="atcl-steps">
        {STEPS.map((step, index) => {
          const ms = hopMs[index];
          const isActive = activeStep === index;
          const fired = ms !== null;
          return (
            <li
              key={step.id}
              className={`atcl-step${isActive ? ' atcl-step-active' : ''}${
                fired ? ' atcl-step-fired' : ''
              }`}
            >
              <span className="atcl-step-index">{index + 1}</span>
              <span className="atcl-step-label">{step.label}</span>
              <span className="atcl-step-track" aria-hidden="true">
                <span
                  className="atcl-step-fill"
                  style={{ width: fired || isActive ? '100%' : '0%' }}
                />
              </span>
              <span className="atcl-step-ms">
                {fired ? `${Math.round(ms)}ms` : '—'}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="atcl-total">
        <span className="atcl-total-label">Total</span>
        <span className="atcl-total-value">{Math.round(total)}ms</span>
      </div>
      <p className="atcl-lesson">{caption}</p>
    </div>
  );
};

export default AgentToolCallLoop;
