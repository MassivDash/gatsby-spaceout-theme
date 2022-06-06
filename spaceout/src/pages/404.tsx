import React, {FC} from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';

const Page404: FC = () => {
  return (
    <>
      <SEO />
      <Scroller style={{minHeight: '100vh'}}>
        <Section>
          <div style={{marginTop: '100px'}}>
            <Headings.H1>404</Headings.H1>
            <Paragraph>This website is currently unavailable.</Paragraph>
          </div>
        </Section>
      </Scroller>
    </>
  );
};

export default Page404;
