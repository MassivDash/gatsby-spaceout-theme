import React from "react";
import logo from "./logo.png";
import Image from "gatsby-image";
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

class SpaceHero extends React.PureComponent {
  state = {
    animating: "positionOne"
  };

  toggleToPosition = position => {
    this.setState({ animating: `position${position}` });
  };

  

  render() {
    const {earth, spaceman, back, shuttle } = this.props;
    const { animating } = this.state;
    
    return (
      <Hero>
        <Blackie>
          <Image sizes={back.sizes}  />
        </Blackie>
        <div >
          <SpaceoutBox onClick={() => this.toggleToPosition("Two")}>
            <City src={logo} alt="" />
            <Spaceout>spaceout</Spaceout>
            <Interstellar>interstellar design </Interstellar>
            <button
              style={{ alignSelf: "flex-start" }}
              type="button"
              onClick={() => this.toggleToPosition("Two")}
            >
              Lets start!
            </button>
          </SpaceoutBox>
          <UxBox>
            <Spaceout right>UX/UI</Spaceout>
            <Interstellar>modern and inspiring design</Interstellar>
            <Text>Creating unique user expirences with clear and modern design in mind.</Text>
            <Text>
              Custom animations and motion design that will help your app standout from the crowd
            </Text>
            <button
              type="button"
              onClick={() => this.toggleToPosition("Three")}
            >
              Lets build it together!
            </button>
          </UxBox>
          <StackBox>
            <Spaceout >build up</Spaceout>
            <Interstellar left>All platforms</Interstellar>
            <Text> 
              Building custom apps for all major platforms, Web, iOS and Android. Commercial
              systems, shops, publishing platforms, websites, landing pages tailored to your needs.
            </Text>
            <button
              type="button"
              onClick={() => this.toggleToPosition("Four")}
            >
              Lets deploy
            </button>
          </StackBox>
          <DeployBox>
            <Spaceout >Serv Up</Spaceout>
            <Interstellar left>To all major platforms!</Interstellar >
            <Text> 
              Amazon Web Services and all major server deployment for your apps. Systems that are
              build for the future.
            </Text>
            <button
              type="button"
              onClick={() => this.toggleToPosition("One")}
            >
              Lets roll
            </button>
          </DeployBox>
          <Earth position={animating}>
            <Image
              sizes={earth.sizes}
              style={{
                position: "aboslute",
                width: "100%",
                height: "100%",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }}
            />
          </Earth>
          <Spaceman>
            <Image
              sizes={spaceman.sizes}
              style={{
                position: "aboslute",
                width: "100%",
                height: "100%",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }}
            />
          </Spaceman>
          <Shuttle>
            <Image
              sizes={shuttle.sizes}
              style={{
                position: "aboslute",
                width: "100%",
                height: "100%",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }}
            />
          </Shuttle>
        </div>
      </Hero>
    );
  }
}

const Hero = styled.div`
  overflow: hidden;
  background-color: #121f28;
  min-height: 90vh;
  height: 900px;
  margin-top: -80px;
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
  ${mediaqueries.tablet`
    margin: 0 19px 0 13px;
    `}
  ${mediaqueries.desktop`
    margin: 0 22px 0 10px;
    `}
`;

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
    height: "100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    `}
`;

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
`;

const UxBox = styled.div`
    display: flex;
    z-index: 4;
    flex-direction: column;
    justify-content: center;
    align-items:flex-end;
    cursor: pointer;
    transition: 0.8s ease-out;
    color: white;
    padding: 0 0.5rem;
    ${mediaqueries.phone`
    top: 10px;
    right: 10px;
    max-width: 320px;
  `}
  ${mediaqueries.phablet`
    top: 100px;
    right: 100px;
    max-width: 320px;
    `}
  ${mediaqueries.tablet`
    top: 100px;
    right: 100px;
    max-width: 320px;
    `}

    ${mediaqueries.desktop`
    top: 100px;
    right: 100px;
    max-width: 396px;
    `}
`;

const Text = styled.p`
 ${mediaqueries.tablet`
    font-size: 26px
    `}

    ${mediaqueries.desktop`
    font-size: 36px
    `}
`;

const StackBox = styled.div`
    display: flex;
    z-index: 4;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    transition: 0.8s ease-out;
    padding: 0 0.5rem;
    ${mediaqueries.phone`
    top: 10px;
    right: 10px;
    max-width: 320px;
  `}
  ${mediaqueries.phablet`
    top: 100px;
    right: 100px;
    max-width: 320px;
    `}
  ${mediaqueries.tablet`
    top: 100px;
    right: 100px;
    max-width: 320px;
    `}

    ${mediaqueries.desktop`
    top: 100px;
    right: 100px;
    max-width: 396px;
    `}
    `;

const DeployBox = styled.div`
    display: flex;
    z-index: 4;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    cursor: pointer;
    transition: 0.8s ease-out;
    padding: 0 0.5rem;
    ${mediaqueries.phone`
    top: 10px;
    right: 10px;
    max-width: 320px;
  `}
  ${mediaqueries.phablet`
    top: 100px;
    right: 100px;
    max-width: 320px;
    `}
  ${mediaqueries.tablet`
    top: 100px;
    right: 100px;
    max-width: 320px;
    `}

    ${mediaqueries.desktop`
    top: 100px;
    right: 100px;
    max-width: 396px;
    `}
    `;

const Spaceout = styled.p`
 font-family: Paytone One;
 color: white;
 line-height: 1;
 margin-top: 0;
 z-index: 4;
 text-shadow: #112c3f -1px 1px 10px;
 ${mediaqueries.phablet`
    font-size: 38px;
    `}
  ${mediaqueries.tablet`
    font-size: 42px;
    `}

    ${mediaqueries.desktop`
    font-size: 100px
    `}
    `;

const City = styled.img`
align-self: flex-start;
z-index: 5;
${mediaqueries.phablet`
    margin-left: -40px
    margin-bottom: -27px
    margin-top: -40px;
    max-width: 100%
    max-height: 100%
    `}
  ${mediaqueries.tablet`
    margin-left: -80px
    margin-bottom: -20px;
    max-width: 100%
    max-height: 100%
    `}

    ${mediaqueries.desktop`
    margin-left: -80px
    margin-bottom: -50px
    max-width: 100%
    max-height: 100%
    `}
    `;

const Interstellar = styled.p`
 font-family: Satisfy, cursive;
 color: white;
 z-index: 4;
 ${mediaqueries.phablet`
    margin-bottom: 40px
    margin-top: -36px;
    font-size: 18px;
    `}
  ${mediaqueries.tablet`
   margin-top: -20px;
   font-size: 20px;
    `}

    ${mediaqueries.desktop`
    margin-top: -50px;
    font-size: 28px;
    `}
    `;

const Earth = styled.div`
position: absolute;
z-index: 0;
transition: 3s ease-in-out;
width: 1500px;
transform: ${props => {
    const { position } = props;
        switch(true) {
        case position === "positionOne":
            return 'rotate(120deg) translate(-300px, 1493px)'
        case position === "positionTwo":
            return 'rotate(153deg) translate(-0px, 1177px)'
        case position === "positionThree":
            return 'rotate(155deg) translate(-600px, 1523px)'
    }
}};
`;


const Spaceman = styled.div`
    position: absolute;
transition: 1.4s ease-in-out
z-index: 3;
width: 1250px;
`;

const Shuttle = styled.div`
position: absolute;
transition: 1.4s ease-in-out
z-index: 3;
width: 1250px;
`;



export default SpaceHero;
