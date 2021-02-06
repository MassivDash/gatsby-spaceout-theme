import React from "react";
import Scroller from "gatsby-theme-spaceout/src/components/Scroller";
import Section from "gatsby-theme-spaceout/src/components/Section";
import SEO from "gatsby-theme-spaceout/src/components/SEO";
import Headings from "gatsby-theme-spaceout/src/components/Headings";
import Lottie from 'lottie-react-web'
import underConstruction from '../assets/lottie/construction.json'

import styled from '@emotion/styled'
import { css } from '@emotion/core'


const HowItsDone = () =>  {
  return (
  <>
      <SEO />
      <Scroller style={{minHeight: "100vh" }}>
      <Section>
        <div style={{ marginTop: "100px" }}>
        <Lottie
          options={{
          animationData: underConstruction
        }}
          />
          <Headings.h1>How its done</Headings.h1>
          <div>
          
          </div>
        </div>
      </Section>
      </Scroller>
    </>
  );
}

export default HowItsDone;
