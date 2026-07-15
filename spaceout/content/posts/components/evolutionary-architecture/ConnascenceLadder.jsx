import React, { useState } from 'react';
import { useColorMode } from 'theme-ui';
import './ConnascenceLadder.css';

const RUNGS = [
  {
    id: 'name',
    tier: 'static',
    title: 'Connascence of Name',
    desc: 'Multiple components must agree on the name of an entity.',
    example: 'Rename a function and every caller must rename its import.',
  },
  {
    id: 'type',
    tier: 'static',
    title: 'Connascence of Type',
    desc: 'Multiple components must agree on the type of an entity.',
    example: 'A parameter moves from string to enum; every caller follows.',
  },
  {
    id: 'meaning',
    tier: 'static',
    title: 'Connascence of Meaning',
    desc: 'Multiple components must agree on what a specific value means.',
    example: 'A bare "2" meaning "cancelled" is copied across five modules.',
  },
  {
    id: 'position',
    tier: 'static',
    title: 'Connascence of Position',
    desc: 'Multiple components must agree on the order of values.',
    example:
      'createUser(name, email, role) — swap two args, nothing warns you.',
  },
  {
    id: 'algorithm',
    tier: 'static',
    title: 'Connascence of Algorithm',
    desc: 'Multiple components must agree on a particular algorithm.',
    example: 'Client and server both hand-roll the same signing scheme.',
  },
  {
    id: 'execution',
    tier: 'dynamic',
    title: 'Connascence of Execution Order',
    desc: 'The order in which operations run changes the outcome.',
    example: 'Service B assumes Service A always warms the cache first.',
  },
  {
    id: 'timing',
    tier: 'dynamic',
    title: 'Connascence of Timing',
    desc: 'The relative timing of execution changes the outcome.',
    example: 'A race condition that only ever appears under production load.',
  },
  {
    id: 'value',
    tier: 'dynamic',
    title: 'Connascence of Value',
    desc: 'Several values must change together to stay correct.',
    example: 'A tax rate and a rounding rule that must move in lockstep.',
  },
  {
    id: 'identity',
    tier: 'dynamic',
    title: 'Connascence of Identity',
    desc: 'Multiple components must reference the exact same instance.',
    example: 'Two services must share one identical singleton connection.',
  },
];

export const ConnascenceLadder = () => {
  const [colorMode] = useColorMode();
  const [openId, setOpenId] = useState('meaning');

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="cl-widget" data-mode={colorMode}>
      <p className="cl-caption">
        Ranked weak to strong. Prefer the top of the ladder — you can find it by
        reading source and fix it with automated refactoring. The bottom only
        introduces itself during an incident. Click a rung.
      </p>
      <div className="cl-ladder">
        <div className="cl-rail" aria-hidden="true">
          <span className="cl-rail-label cl-rail-label-top">
            static &mdash; weaker
          </span>
          <span className="cl-rail-gradient">
            <span className="cl-rail-boundary" />
          </span>
          <span className="cl-rail-label cl-rail-label-bottom">
            dynamic &mdash; stronger
          </span>
        </div>
        <ol className="cl-rungs">
          {RUNGS.map((rung, index) => {
            const isOpen = openId === rung.id;
            const isBoundary = index > 0 && rung.tier !== RUNGS[index - 1].tier;
            return (
              <React.Fragment key={rung.id}>
                {isBoundary && (
                  <li className="cl-divider" aria-hidden="true">
                    build graph stops seeing coupling here
                  </li>
                )}
                <li className={`cl-rung cl-rung-${rung.tier}`}>
                  <button
                    type="button"
                    className="cl-rung-header"
                    onClick={() => toggle(rung.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="cl-rung-title">{rung.title}</span>
                    <span className="cl-rung-caret">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="cl-rung-body">
                      <p className="cl-rung-desc">{rung.desc}</p>
                      <p className="cl-rung-example">{rung.example}</p>
                    </div>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ConnascenceLadder;
