import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import aboutme from '../assets/aboutme2.mp4';
import LazyVideo from './LazyVideo';

const SpacemanTitle: React.FC = () => {
  return (
    <SpacemanHolder>
      <ShadowParent>
        <LazyVideo
          src={aboutme}
          height="800px"
          muted
          loop
          style={{ margin: 'auto' }}
        />
      </ShadowParent>
    </SpacemanHolder>
  );
};

export default SpacemanTitle;

const moveBlack = keyframes`
	100% {

        background-position: -100vw 0;
	}
`;

const SpacemanHolder = styled.div`
  width: 100%;
  background-color: transparent;
  background-repeat: repeat;
  background-size: 300%;
  display: flex;
  flexdirection: column;
  align-items: flex-end;
  justify-content: flex-end;
  animation: ${moveBlack} 65s linear infinite;
  clip-path: circle(70% at 50% 50%);
  transform: translate(0, 0);
  transition: clip-path 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    clip-path: circle(80% at 50% 50%);
  }

  @media (min-width: 1024px) {
    clip-path: circle(25% at 70% 45%);
    transform: translate(0);

    &:hover {
      clip-path: circle(30% at 70% 45%);
    }
  }
`;

const ShadowParent = styled.div`
  filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.4));
`;

export const NextToSpacemanHolder = styled.div`
  margin: 0px;

  @media (min-width: 1024px) {
    margin: -400px calc(100% - 25vw) 150px 0;
  }
`;

export const FlexHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 25px;
  align-items: center;
  justify-content: center;
  justify-items: center;

  justify-content: center;
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 1150px;
    margin: auto;
    grid-gap: 25px;
  }
`;
