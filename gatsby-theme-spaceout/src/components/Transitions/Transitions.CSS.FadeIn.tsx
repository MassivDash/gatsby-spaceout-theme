import React from 'react';
import styled from '@emotion/styled';
import { Transition } from 'react-transition-group';
import { keyframes } from '@emotion/core';

interface CSSFadeInProps {
  as?: string;
  children: React.ReactNode;
}

const CSSFadeIn: React.FC<CSSFadeInProps> = ({ as, children }) => {
  return <TransitionCSS as={as}>{children}</TransitionCSS>;
};

export default CSSFadeIn;

const fadein = keyframes`
  0% { opacity: 0; }
  70% { opacity: 0 }
  100% { opacity: 1; }
`;

const TransitionCSS = styled.div<{ as?: string }>`
  opacity: 0;
  animation: ${fadein} 1.9s linear forwards;
`;

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const Fade: React.FC<{ in: boolean; children: React.ReactNode }> = ({
  in: inProp,
  children,
}) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);
