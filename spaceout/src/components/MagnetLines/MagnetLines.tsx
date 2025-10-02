import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface ContainerProps {
  columns: number;
  rows: number;
  containerSizeWidth: string;
  containerSizeHeight: string;
}

interface LineProps {
  baseAngle: number;
  lineColor: string;
  lineWidth: string;
  lineHeight: string;
  theme: {
    colors: {
      inputBackground: string;
    };
  };
}

const Container = styled.div<ContainerProps>`
  display: none; /* Hidden by default on mobile */
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  justify-items: center;
  align-items: center;
  width: ${(props) => props.containerSizeWidth};
  height: ${(props) => props.containerSizeHeight};
  position: absolute;
  max-height: 50vh;
  z-index: -1;

  /* Show only on desktop (1024px and above) */
  @media (min-width: 1024px) {
    display: grid;
  }
`;

export const SectionContainer = styled.div`
  display: none;
  height: 700px;
  width: 100%;
  position: relative;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const Line = styled.span<LineProps>`
  display: block;
  transform-origin: center;
  will-change: transform;
  transform: rotate(var(--rotate, ${(props) => props.baseAngle}deg));
  background-color: ${(props) => props.theme.colors.inputBackground};
  width: ${(props) => props.lineWidth};
  height: ${(props) => props.lineHeight};
`;

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSizeWidth?: string;
  containerSizeHeight?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark';
}

export default function MagnetLines({
  rows = 15,
  columns = 15,
  containerSizeWidth = '100%',
  containerSizeHeight = '130vmin',
  lineColor,
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {},
  theme = 'light',
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Set default color based on theme if not provided
  const defaultLineColor =
    lineColor || (theme === 'dark' ? '#333333' : '#efefef');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = (container as HTMLElement).querySelectorAll('span');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r =
          ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e: PointerEvent) =>
      onPointerMove({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <Line
      key={i}
      baseAngle={baseAngle}
      lineColor={defaultLineColor}
      lineWidth={lineWidth}
      lineHeight={lineHeight}
      style={
        {
          '--rotate': `${baseAngle}deg`,
        } as React.CSSProperties
      }
    />
  ));

  return (
    <Container
      ref={containerRef}
      className={className}
      columns={columns}
      rows={rows}
      containerSizeWidth={containerSizeWidth}
      containerSizeHeight={containerSizeHeight}
      style={style}
    >
      {spans}
    </Container>
  );
}
