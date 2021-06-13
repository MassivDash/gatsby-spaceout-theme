import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import logo from './logo.png'
import uuid from 'uuid';
import Image from 'gatsby-image'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import mediaqueries from '@styles/media'

const SpaceHero = () => {
  const [position, toggleToPosition] = useState('positionOne')
  const [backgroundLoaded, onBackgroundLoad] = useState(false);
  const [spacemanLoaded, onSpacemanLoad] = useState(false);


  const spaceHeroQuery = graphql`
    {
      site: allSite {
        edges {
          node {
            siteMetadata {
              hero {
                heading
                maxWidth
              }
            }
          }
        }
      }
      back: imageSharp(original: { src: { regex: "/heroBack/" } }) {
        id
        sizes(maxWidth: 1920, quality: 90, traceSVG: { color: "#121f28" }) {
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          tracedSVG
        }
        resize(width: 1920) {
          src
        }
      }
      earth: imageSharp(original: { src: { regex: "/earth/" } }) {
        id
        sizes(maxWidth: 3000, quality: 90, traceSVG: { color: "#FFF" }) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          tracedSVG
        }
        resize(width: 1920) {
          src
        }
      }
      spaceman: imageSharp(original: { src: { regex: "/spaceman/" } }) {
        id
        sizes(maxWidth: 3000, quality: 90, traceSVG: { color: "#FFF" }) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          tracedSVG
        }
        resize(width: 1920) {
          src
        }
      }
      shuttle: imageSharp(original: { src: { regex: "/shuttle/" } }) {
        id
        sizes(maxWidth: 3000, quality: 90, traceSVG: { color: "#FFF" }) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          tracedSVG
        }
        resize(width: 1920) {
          src
        }
      }
    }
  `

  const results = useStaticQuery(spaceHeroQuery)
  const {  spaceman, back } = results

  return (
    <Hero>
      <Blackie>
        <Image sizes={back.sizes} onLoad={() => onBackgroundLoad(true)} />
      </Blackie>
      <div>
      { onBackgroundLoad && onSpacemanLoad &&
        <SpaceoutBox
          onClick={() => toggleToPosition('positionTwo')}
        >
          <City src={logo} alt="" />

          <AnimatedSpace>
          <svg  >
      <title>{"spaceout.pl"}</title>
      <text
        stroke="#fff"
        fill="#645F5A"
        fontFamily="Paytone one"
        fillRule="evenodd"
      >
        <tspan x={3} y={109}>
        {[...'spaceout'].map(letter => <tspan key={letter+Math.random()}>{letter}</tspan>)}
        </tspan>
      </text>
    </svg>

          </AnimatedSpace>

          <AnimatedStellar>
    <svg>
      <title>{"spaceout.pl"}</title>
      <text
        strokeWidth="1"
        stroke="#fff"
        fill="#645F5A"
        fontFamily="Satisfy"
        fillRule="evenodd"
      >
        <tspan x={3} y={109}>{
          [...'interstellar design'].map(letter => <tspan key={letter+Math.random()}>{letter}</tspan>)
        }
        </tspan>
      </text>
    </svg>

          </AnimatedStellar>

          </SpaceoutBox>
      }
        <Spaceman>

        <Image
            sizes={spaceman.sizes}
            style={{
              position: 'aboslute',
              width: '100%',
              height: '100%',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onLoad={() => onSpacemanLoad(true)}
          />
          </Spaceman>
      </div>
    </Hero>
  )
}

const moveBlack = keyframes`
	0% {
		transform: scale(3) translate(-400px)
	}
	50% {
		transform: scale(3) translate(0px)
    	}

	100% {transform: scale(3) translate(-400px)
	}
`

const Hero = styled.div`
  overflow: hidden;
  background-color: #121f28;
  min-height: 90vh;
  height: 900px;
  margin-top: 10px;
  min-width: 67vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  ${mediaqueries.desktop`
    margin: 0 0 0 10px;
    `}
`

const Blackie = styled.div`
z-index: 0;
background-color: transparent;
position: absolute;
right: 0;
left: 0;
top: 0;
bottom: 0;
display: grid;
animation: ${moveBlack} 120s linear infinite;
${mediaqueries.phone`
   width: 100%;
   height: 100%;
   min-height: 650px;
  `}
  ${mediaqueries.tablet`
    width: 100%;
    height: 100%;
    `}
  ${mediaqueries.desktop`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    `}
`

const animationDelayTime = 300;

const draw = keyframes`
	0% {
		fill: none;
    z-index: 5;
	}
	90% {
		fill: #FFFFFF00;
    z-index: 5;
	}

	100% {
		stroke-dashoffset: 0;
		fill-opacity: 1;
		fill: #FFFFFF;
    z-index: 5;
	}
`


const moveCity = keyframes`
	0% {
		z-index: 5;
    transform: translate(134px, -83px)
    	}

  25% {
    z-index: 5;
    transform: translate(139px, -53px)
  }

	50% {
		z-index: 0;
    transform: translate(134px, -83px)
	}

  75% {
    z-index: 0;
    transform: translate(129px, -53px)
  }

	100% {
		z-index: 0;
    transform: translate(134px, -83px)
	}
`
const moveSpaceman = keyframes`
	0% {

    transform: translate(-345px,-502px)
    	}

  25% {

    transform: translate(-365px,-522px)
  }

	50% {

    transform: translate(-375px,-532px)
	}

  75% {

    transform: translate(-365px,-522px)
  }

	100% {

    transform: translate(-345px,-502px)
	}
`


const AnimatedSpace = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
  position: absolute;
  z-index: 5;
  left: 10vw;
  width: 100%;
  min-height: 300px;
  svg {
		width: 100%;
		height: auto;
		fill: none;
		stroke: white;
		stroke-width: 4;
		tspan > tspan {
			stroke-dasharray: 1500;
			stroke-dashoffset: -1500;
      fill: none;
      font-size: 160px;
      &:nth-of-type(1){
        animation: ${draw} 600ms ${1 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(2){
        animation: ${draw} 600ms ${2 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(3){
        animation: ${draw} 600ms ${3 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(4){
        animation: ${draw} 600ms ${4 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(5){
        animation: ${draw} 600ms ${5 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(6){
        animation: ${draw} 600ms ${6 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(7){
        animation: ${draw} 600ms ${7 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(8){
        animation: ${draw} 600ms ${7 * animationDelayTime}ms forwards;
      }
		}

	}
`


const AnimatedStellar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
  position: absolute;
  left: 30%;
  z-index: 5;
  margin-top: 100px;
  width: 100%;
  min-height: 300px;
  svg {
		width: 100%;
		height: auto;
		fill: none;
		stroke: white;
		stroke-width: 4;
		tspan > tspan {
			stroke-dasharray: 1500;
			stroke-dashoffset: -1500;
      fill: none;
      font-size: 67px;
      font-weight: normal;

      &:nth-of-type(1){
        animation: ${draw} 600ms ${8 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(2){
        animation: ${draw} 600ms ${9 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(3){
        animation: ${draw} 600ms ${10 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(4){
        animation: ${draw} 600ms ${11 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(5){
        animation: ${draw} 600ms ${12 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(6){
        animation: ${draw} 600ms ${13 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(7){
        animation: ${draw} 600ms ${14 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(8){
        animation: ${draw} 600ms ${15 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(9){
        animation: ${draw} 600ms ${16 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(10){
        animation: ${draw} 600ms ${17 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(11){
        animation: ${draw} 600ms ${18 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(12){
        animation: ${draw} 600ms ${19 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(13){
        animation: ${draw} 600ms ${20 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(14){
        animation: ${draw} 600ms ${21 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(15){
        animation: ${draw} 600ms ${22 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(16){
        animation: ${draw} 600ms ${23 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(17){
        animation: ${draw} 600ms ${24 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(18){
        animation: ${draw} 600ms ${25 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(19){
        animation: ${draw} 600ms ${26 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(20){
        animation: ${draw} 600ms ${27 * animationDelayTime}ms forwards;
      }
		}

	}
`


const SpaceoutBox = styled.div`
 display: flex;
 z-index: 4;
 flex-direction: column;
 justify-content: center;
 align-items: flex-end;
 cursor: pointer;
 transition: 0.8s ease-out;
 ${mediaqueries.phone`
   margin-left: 20px;
   margin-top: 0px;
  `}
`


const City = styled.img`
align-self: flex-start;
position: absolute;
left: 0;
animation: ${moveCity} 38s linear infinite;
`
const Spaceman = styled.div`
  position: absolute;
  transition: 3s ease-in-out;
  z-index: 0;
  width: 1250px;
  animation: ${moveSpaceman} 38s linear infinite;
`


export default SpaceHero
