import React, {FC} from 'react';
import styled from '@emotion/styled';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import CSSFadeIn from 'gatsby-theme-spaceout/src/components/Transitions/Transitions.CSS.FadeIn';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import SocialLinks from 'gatsby-theme-spaceout/src/components/SocialLinks';
import ExternalLink from '../components/ExternalLink';

const links = [
  {
    name: `facebook`,
    url: `https://www.facebook.com/spaceout/`,
  },
  {
    name: `twitter`,
    url: `https://twitter.com/spaceout`,
  },
  {
    name: `instagram`,
    url: `https://www.instagram.com/spaceout/`,
  },
  {
    name: `spaceout`,
    url: `https://blog.spaceout.pl/`,
  },
  {
    name: `dribbble`,
    url: `https://dribbble.com/spaceout`,
  },
  {
    name: `behance`,
    url: `https://behance.com/spaceout`,
  },
  {
    name: `github`,
    url: `https://github.com/massivDash/`,
  },
];

const HowItsDone: FC = () => {
  return (
    <>
      <SEO />
      <Scroller>
        <CSSFadeIn>
          <Section>
            <div style={{height: '50px', width: '100%'}}></div>
            <Headings.H1>Contact</Headings.H1>
            <Paragraph>
              Feel free to contact me by email:{' '}
              <ExternalLink href="mailto:luke@spaceout">
                luke@spaceout.pl
              </ExternalLink>
              , or use any of the following social media to reach me.
            </Paragraph>
            <StackSocial>
              <SocialLinks links={links} />
            </StackSocial>
          </Section>
        </CSSFadeIn>
      </Scroller>
    </>
  );
};

export default HowItsDone;

const StackSocial = styled.div`
  display: grid;
  max-width: 1150px;
  grid-gap: 15px;
  margin: 20px auto;
  grid-template-columns: repeat(4, 1fr);
  @media (min-width: 1024px) {
    grid-template-columns: repeat(10, 1fr);
    justify-content: flex-start;
  }
`;
