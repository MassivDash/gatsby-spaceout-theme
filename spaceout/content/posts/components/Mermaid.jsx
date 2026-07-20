import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from 'theme-ui';
import './Mermaid.css';

const MERMAID_SRC = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';
const LOAD_TIMEOUT_MS = 8000;

let mermaidLoadPromise = null;

function loadMermaid() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.mermaid) return Promise.resolve(window.mermaid);

  if (!mermaidLoadPromise) {
    mermaidLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${MERMAID_SRC}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve(window.mermaid));
        existing.addEventListener('error', reject);
        return;
      }
      const script = document.createElement('script');
      script.src = MERMAID_SRC;
      script.async = true;
      script.onload = () => resolve(window.mermaid);
      script.onerror = () => reject(new Error('Failed to load mermaid from CDN'));
      document.head.appendChild(script);
    });
  }
  return mermaidLoadPromise;
}

let diagramCount = 0;

export const Mermaid = ({ chart }) => {
  const [colorMode] = useColorMode();
  const [svg, setSvg] = useState(null);
  const [failed, setFailed] = useState(false);
  const idRef = useRef(`mermaid-diagram-${(diagramCount += 1)}`);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) setFailed(true);
    }, LOAD_TIMEOUT_MS);

    loadMermaid()
      .then((mermaid) => {
        if (!mermaid || cancelled) return null;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: colorMode === 'light' ? 'neutral' : 'dark',
        });
        return mermaid.render(idRef.current, chart);
      })
      .then((result) => {
        clearTimeout(timer);
        if (!cancelled && result) setSvg(result.svg);
      })
      .catch(() => {
        clearTimeout(timer);
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [chart, colorMode]);

  if (failed) {
    return (
      <pre className="mermaid-fallback">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return <div className="mermaid-loading" aria-hidden="true" />;
  }

  return (
    <div
      className="mermaid-diagram"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid;
