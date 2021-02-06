import React from "react";
import Scroller from "gatsby-theme-spaceout/src/components/Scroller";
import Section from "gatsby-theme-spaceout/src/components/Section";
import SEO from "gatsby-theme-spaceout/src/components/SEO";
import Headings from "gatsby-theme-spaceout/src/components/Headings";

const HowItsDone = () =>  {
  return (
  <>
      <SEO />
      <Scroller >
      <Section>
        <div style={{ marginTop: "100px" }}>
          <Headings.h1>How its done</Headings.h1>
          <div>
            <p>gsahjgshjadgasjhgjhsagjhadsgjhdsagadsjhgsadjhgj</p>
          </div>
        </div>
      </Section>
      </Scroller>
    </>
  );
}

export default HowItsDone;