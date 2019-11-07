import React from "react";

import Layout from "gatsby-theme-spaceout/src/components/Layout";
import Section from "gatsby-theme-spaceout/src/components/Section";
import SEO from "gatsby-theme-spaceout/src/components/SEO";
import Headings from "gatsby-theme-spaceout/src/components/Headings";

const HowItsDone = () =>  {
  return (
  <Layout>
      <SEO />
      <Section>
        <div style={{ marginTop: "100px" }}>
          <Headings.h1>About us</Headings.h1>
        </div>
      </Section>
    </Layout>
  );
}

export default HowItsDone;
