import React, { useState } from 'react';
import { useColorMode } from 'theme-ui';
import './GuardrailToggle.css';

const DANGEROUS_COMMAND = 'rm -rf /var/project';

const ALLOWED_ACTIONS = [
  'search_file',
  'open_folder',
  'list_top_processes',
  'grep_search',
  'system_status',
  'network_ports',
];

export const GuardrailToggle = () => {
  const [colorMode] = useColorMode();
  const [mode, setMode] = useState('unconstrained');
  const [proposedCommand, setProposedCommand] = useState(DANGEROUS_COMMAND);
  const [result, setResult] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const pickChip = (action) => {
    setProposedCommand(action);
    setResult(null);
  };

  const run = () => {
    const isDangerous = proposedCommand === DANGEROUS_COMMAND;

    if (isDangerous) {
      if (mode === 'unconstrained') {
        setResult({
          state: 'detonated',
          message: 'DETONATED — passed straight to sh -c.',
        });
        setShakeKey((key) => key + 1);
      } else {
        setResult({
          state: 'rejected',
          message:
            'REJECTED — `rm` is not in the allowed enum. Nothing reached the shell.',
        });
      }
    } else {
      setResult({
        state: 'ran',
        message: `RAN — ${proposedCommand} executed, result returned to agent.`,
      });
    }
  };

  return (
    <div className="gt-widget" data-mode={colorMode}>
      <p className="gt-caption">
        <em>
          Try to make the agent run something reckless under each model.
        </em>
      </p>

      <div className="gt-segmented" role="group" aria-label="Guardrail model">
        <button
          type="button"
          className="gt-segment"
          aria-pressed={mode === 'unconstrained'}
          onClick={() => {
            setMode('unconstrained');
            setResult(null);
          }}
        >
          Unconstrained shell
        </button>
        <button
          type="button"
          className="gt-segment"
          aria-pressed={mode === 'structured'}
          onClick={() => {
            setMode('structured');
            setResult(null);
          }}
        >
          Structured wrapper
        </button>
      </div>

      <div className="gt-proposed">
        <span className="gt-proposed-label">Agent proposes</span>
        <code className="gt-proposed-command">{proposedCommand}</code>
      </div>

      <button type="button" className="gt-run" onClick={run}>
        Agent runs it
      </button>

      <div
        key={shakeKey}
        className={`gt-readout gt-readout-${result ? result.state : 'idle'}`}
      >
        {result ? result.message : 'Awaiting execution.'}
      </div>

      <div className="gt-chips">
        <span className="gt-chips-label">Allowed enum actions</span>
        <div className="gt-chips-row">
          {ALLOWED_ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              className="gt-chip"
              aria-pressed={proposedCommand === action}
              onClick={() => pickChip(action)}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuardrailToggle;
