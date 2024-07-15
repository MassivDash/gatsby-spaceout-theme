import React, { useEffect, useRef, useState } from 'react';
import './Charts/charts.css';

export const Observer = ({ children }) => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef();

  useEffect(() => {
    const reference = chartRef.current;
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.0,
        },
      );

      if (reference) {
        observer.observe(reference);
      }

      return () => {
        if (reference) {
          observer.unobserve(reference);
        }
      };
    }
  }, []);

  return (
    <div ref={chartRef} className="chartHolder">
      {isInView && children}
    </div>
  );
};
