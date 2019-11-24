import React from "react";
import Section from "gatsby-theme-spaceout/src/components/Section";
import SEO from "gatsby-theme-spaceout/src/components/SEO";
import Headings from "gatsby-theme-spaceout/src/components/Headings";

const HowItsDone = () =>  {
  return (
  <>
      <SEO />
      <Section>
        <div style={{ marginTop: "100px" }}>
          <Headings.h1>About us</Headings.h1>
        </div>
      </Section>
    </>
  );
}

export default HowItsDone;
