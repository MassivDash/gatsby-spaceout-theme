import React from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import BodyHolder from 'gatsby-theme-spaceout/src/components/BodyHolder';

const HowItsDone = () => {
  return (
    <>
      <SEO />
      <Scroller style={{ minHeight: '100vh' }}>
        <Section>
          <BodyHolder>
            <Headings.H1>About me</Headings.H1>
            <Headings.H2>BIO:</Headings.H2>
            <Paragraph>
              Hello everyone. My name is Luke and I am full stack developer.
            </Paragraph>
            <Paragraph>
              I have built my first website way back in highschool (2004), and
              since then I have been perfecting my skills in both design, (UX,
              UI) and web/app development.
            </Paragraph>
            <Paragraph>
              Spaceout.pl is mainly me and my professional contacts I have
              established over the years. They include graphic designers, copy
              writers, UX researchers, other front, back, dev and sys
              developers.
            </Paragraph>
            <Paragraph>
              For 5+ years now, I have been involved in various projects as a
              systems architect and UI/UX consultant. I make sure that various
              designs and ideas can be implemented swiftly and without headache
              to all major platforms (such as AWS services, Azure, custom
              Virtual and dedicated servers,). My area of expertise is React.js
              and React Native ecosystem, which I use to develop Apps for all
              the major platforms (Web, iOS and Android).
            </Paragraph>
            <Paragraph>
              If you are looking for a high quality custom product, that is not
              based on themes or standard solutions, you are in the right place.
              Contact me for more info at info@spaceout.pl.
            </Paragraph>
            <Paragraph>
              If you are a developer, take a look at my Polish blog about
              development and other adventures in my professional life.
              https://blog.spaceout.pl
            </Paragraph>
            <Paragraph>
              Personally, I am a big geek with huge love for Star Wars, Marvel
              and DC comic books, Funk and 80s music. I take most of my design
              inspiration from offline experiences like going to art museums,
              galleries and working with other creative people on various
              projects. I also work with various Activist and NGO groups as a
              pro-bono designer and developer.
            </Paragraph>
          </BodyHolder>
        </Section>
      </Scroller>
    </>
  );
};

export default HowItsDone;
