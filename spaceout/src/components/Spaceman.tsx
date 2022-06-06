import React from 'react';
import styled from '@emotion/styled';
import {keyframes} from '@emotion/core';
import spaceman from '../assets/spaceman.png';
import bg from '../assets/heroBack.jpg';

const SpacemanTitle = () => {
  return (
    <ShadowParent>
      <SpacemanHolder>
        <SpacemanImg src={spaceman} />
      </SpacemanHolder>
    </ShadowParent>
  );
};

export default SpacemanTitle;

const moveBlack = keyframes`
	100% {

        background-position: -100vw 0;
	}
`;

const moveSpaceman = keyframes`
0% {
    transform: translateY(20vh) scale(1.5);
}



25% {
    transform: translateY(25vh) translateX(-5vw) scale(1.7) rotate(4deg)
}

50% {
    transform: translateY(25vh) translateX(-2vw) scale(1.4) rotate(2deg)
}

100% {

  transform: translateY(20vh) scale(1.5) rotate(0deg)
}
`;

const SpacemanHolder = styled.div`
  width: 100%;
  background-image: url(${bg});
  background-repeat: repeat;
  background-size: 300%;
  display: flex;
  flexdirection: column;
  align-items: flex-end;
  justify-content: flex-end;
  animation: ${moveBlack} 65s linear infinite;
  clip-path: circle(43% at 70% 45%);
  transform: translate(25px, 40px);

  @media (min-width: 1024px) {
    clip-path: circle(25% at 70% 45%);
    transform: translate(0);
  }
`;
const SpacemanImg = styled.img`
  margin: 5vw 8vw 0 0;
  max-width: 400px;
  animation: ${moveSpaceman} 25s linear infinite;
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
