
import React from 'react'
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core'
import shuttle from "../assets/shuttle.png";
import bg from "../assets/heroBack.jpg";


const ShuttleTitle = () => {

    return ( <ShadowParent><ShuttleHolder>
        <ShuttleImg src={shuttle} />
    </ShuttleHolder>
    </ShadowParent>

    )
}

export default ShuttleTitle




const moveBlack = keyframes`
	100% {

        background-position: -100vw 0;
	}
`

const moveShuttle = keyframes`
    0% {
        transform: translateY(100vh)
    }

    25% {
        transform: translate(0)
    }

    45% {
        transform: translate(0)
    }

    70% {
        transform: translateY(-200vh)
    }

    75% {
        transform: translateY(-200vh) translateX(200vw)
    }

    85%{
        transform: translateY(100vh) translateX(200vw)
    }

    100% {

        transform: translateY(100vh) translateX(200vw)
	}
`


const ShuttleHolder = styled.div`
width: 100%;
background-image: url(${bg});
background-repeat: repeat;
background-size: 300%;
display: flex;
flexDirection: column;
align-items: flex-end;
justify-content: flex-end;
animation: ${moveBlack} 65s linear infinite;
clip-path: circle(43% at 70% 45%);
transform: translate(25px, 40px);


@media (min-width: 1024px){
  clip-path: circle(25% at 70% 45%);
  transform: translate(0);
}

`
const ShuttleImg = styled.img`
margin: 5vw 8vw 0 0;
max-width: 400px;
animation: ${moveShuttle} 15s linear infinite;
`
const ShadowParent = styled.div`
    filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.4))
`

export const NextToShuttleHolder = styled.div`
margin: 0px;

@media (min-width: 1024px){

  margin: -400px calc(100% - 25vw) 150px 0;

}



`
export const FlexHolder = styled.div`
display: flex;
align-items: center;
`
