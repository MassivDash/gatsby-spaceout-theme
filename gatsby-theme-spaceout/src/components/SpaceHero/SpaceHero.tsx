import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import logo from './logo.png'
import Image from 'gatsby-image'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import mediaqueries from '@styles/media'

const SpaceHero = () => {
  const [position, toggleToPosition] = useState('positionOne')
  console.log(position);

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
  const { earth, spaceman, back, shuttle } = results

  return (
    <Hero>
      <Blackie>
        <Image sizes={back.sizes} />
      </Blackie>
      <div>
        <SpaceoutBox
          onClick={() => toggleToPosition('positionTwo')}
          position={position}
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
          <tspan>{"s"}</tspan>
          <tspan>{"p"}</tspan>
          <tspan>{"a"}</tspan>
          <tspan>{"c"}</tspan>
          <tspan>{"e"}</tspan>
          <tspan>{"o"}</tspan>
          <tspan>{"u"}</tspan>
          <tspan>{"t"}</tspan>
        </tspan>
      </text>
    </svg>

          </AnimatedSpace>
          <AnimatedStellar>
    <svg>
      <title>{"spaceout.pl"}</title>
      <text
        stroke-width="1"
        stroke="#fff"
        fill="#645F5A"
        fontFamily="Satisfy"
        fillRule="evenodd"
      >
        <tspan x={3} y={109}>
          <tspan>{"i"}</tspan>
          <tspan>{"n"}</tspan>
          <tspan>{"t"}</tspan>
          <tspan>{"e"}</tspan>
          <tspan>{"r"}</tspan>
          <tspan>{"s"}</tspan>
          <tspan>{"t"}</tspan>
          <tspan>{"e"}</tspan>
          <tspan>{"l"}</tspan>
          <tspan>{"l"}</tspan>
          <tspan>{"a"}</tspan>
          <tspan>{"r"}</tspan>
          <tspan >{" "}</tspan>
          <tspan>{"d"}</tspan>
          <tspan>{"e"}</tspan>
          <tspan>{"s"}</tspan>
          <tspan>{"i"}</tspan>
          <tspan>{"g"}</tspan>
          <tspan>{"n"}</tspan>
        </tspan>
      </text>
    </svg>

          </AnimatedStellar>
          </SpaceoutBox>
        <Spaceman position={position}>

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
          />
          </Spaceman>
      </div>
    </Hero>
  )
}

const Hero = styled.div`
  overflow: hidden;
  background-color: #121f28;
  min-height: 90vh;
  height: 900px;
  margin-top: 10px;
  min-width: 77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  ${mediaqueries.phone`
   width: 100%;
   height: 100%;
   min-height: 650px;
   margin: 0 15px 0 17px;
  `}
  ${mediaqueries.tablet`center
    margin: 0 19px 0 13px;
    `}
  ${mediaqueries.desktop`
    margin: 0 22px 0 10px;
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
    height: "100%;$i
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    `}
`

const draw = keyframes`
	0% {
		fill: none;
	}
	90% {
		fill: #FFFFFF00;
	}
	
	100% {
		stroke-dashoffset: 0;
		fill-opacity: 1;
		fill: #FFFFFF;
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

const AnimatedSpace = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
  position: absolute;
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
        animation: ${draw} 600ms ${1 * 300}ms forwards;
      }
      &:nth-of-type(2){
        animation: ${draw} 600ms ${2 * 300}ms forwards;
      }
      &:nth-of-type(3){
        animation: ${draw} 600ms ${3 * 300}ms forwards;
      }
      &:nth-of-type(4){
        animation: ${draw} 600ms ${4 * 300}ms forwards;
      }
      &:nth-of-type(5){
        animation: ${draw} 600ms ${5 * 300}ms forwards;
      }
      &:nth-of-type(6){
        animation: ${draw} 600ms ${6 * 300}ms forwards;
      }
      &:nth-of-type(7){
        animation: ${draw} 600ms ${7 * 300}ms forwards;
      }
      &:nth-of-type(8){
        animation: ${draw} 600ms ${7 * 300}ms forwards;
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
        animation: ${draw} 600ms ${8 * 300}ms forwards;
      }
      &:nth-of-type(2){
        animation: ${draw} 600ms ${9 * 300}ms forwards;
      }
      &:nth-of-type(3){
        animation: ${draw} 600ms ${10 * 300}ms forwards;
      }
      &:nth-of-type(4){
        animation: ${draw} 600ms ${11 * 300}ms forwards;
      }
      &:nth-of-type(5){
        animation: ${draw} 600ms ${12 * 300}ms forwards;
      }
      &:nth-of-type(6){
        animation: ${draw} 600ms ${13 * 300}ms forwards;
      }
      &:nth-of-type(7){
        animation: ${draw} 600ms ${14 * 300}ms forwards;
      }
      &:nth-of-type(8){
        animation: ${draw} 600ms ${15 * 300}ms forwards;
      }
      &:nth-of-type(9){
        animation: ${draw} 600ms ${16 * 300}ms forwards;
      }
      &:nth-of-type(10){
        animation: ${draw} 600ms ${17 * 300}ms forwards;
      }
      &:nth-of-type(11){
        animation: ${draw} 600ms ${18 * 300}ms forwards;
      }
      &:nth-of-type(12){
        animation: ${draw} 600ms ${19 * 300}ms forwards;
      }
      &:nth-of-type(13){
        animation: ${draw} 600ms ${20 * 300}ms forwards;
      }
      &:nth-of-type(14){
        animation: ${draw} 600ms ${21 * 300}ms forwards;
      }
      &:nth-of-type(15){
        animation: ${draw} 600ms ${22 * 300}ms forwards;
      }
      &:nth-of-type(16){
        animation: ${draw} 600ms ${23 * 300}ms forwards;
      }
      &:nth-of-type(17){
        animation: ${draw} 600ms ${24 * 300}ms forwards;
      }
      &:nth-of-type(18){
        animation: ${draw} 600ms ${25 * 300}ms forwards;
      }
      &:nth-of-type(19){
        animation: ${draw} 600ms ${26 * 300}ms forwards;
      }
      &:nth-of-type(20){
        animation: ${draw} 600ms ${27 * 300}ms forwards;
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
 opacity: ${p => (p.position === 'positionOne' ? 1 : 0)}
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
  z-index: 3;
  width: 1250px;
  transform: ${props => {
    const { position } = props
    switch (true) {
      case position === 'positionOne':
        return 'rotate(11deg) scale(0.9) translate(-365px,-502px)'
      case position === 'positionTwo':
        return 'rotate(-1deg) scale(1.3) translate(852px,-802px)'
      case position === 'positionThree':
        return 'rotate(155deg) translate(0px, 1523px)'
    }
  }};
`


export default SpaceHero
