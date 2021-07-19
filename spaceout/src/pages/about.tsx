import React, { FC } from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import Spaceman, { FlexHolder } from '../components/Spaceman';

import CSSFadeIn from 'gatsby-theme-spaceout/src/components/Transitions/Transitions.CSS.FadeIn';
const HowItsDone: FC = () => {
  return (
    <>
      <SEO />
      <Scroller style={{ minHeight: '100vh' }}>
        <CSSFadeIn>
          <Section>
            <div style={{ height: '50px', width: '100%' }}></div>
            <Spaceman />
            <Headings.H1>Hi there 👋</Headings.H1>
            <Paragraph>
              My name is Luke and I am full stack developer.
            </Paragraph>
            <Paragraph>
              I have built my first website way back in highschool (2004), and
              since then I have been perfecting my skills in both design, (UX,
              UI) and web/app development.
            </Paragraph>
            <Paragraph>
              For many years now, I have been involved in various projects as a
              systems architect and UI/UX consultant. I make sure that various
              designs and ideas can be implemented swiftly and without headache
              to all major platforms (such as AWS services, Azure, custom
              Virtual and dedicated servers,). My area of expertise is React.js
              and React Native, Node.js, which I use to develop Apps for all the
              major platforms (Web, iOS and Android).
            </Paragraph>
            <Paragraph>
              If you are looking for a high quality custom product, that is not
              based on themes or standard solutions. Contact me for more info at
              luke@spaceout.pl
            </Paragraph>
            <div style={{ height: '50px', width: '100%' }}></div>
            <Headings.H2>🏆 I’m currently working on: </Headings.H2>
            <Paragraph>
              🏅 Implementing compliance and security protocols at my current
              job, using the DevSecOps (#OWASP) principles, using such tools as
              self-hosted azure dev ops dependobot, static code and security
              analysis on 13 commercial projects.
            </Paragraph>
            <Paragraph>
              🏅 Docker mastery and node orchestration, Node.js clusters and
              distributed systems
            </Paragraph>
            <Paragraph>
              🏅 Mastering typescript and automatic testing using jest and
              cypress.io
            </Paragraph>
            <div style={{ height: '50px', width: '100%' }}></div>
            <Headings.H2>🧑‍🚀 Personal info: </Headings.H2>
            <Paragraph>
              Personally, I am a big geek with huge love for Star Wars, Marvel
              and DC comic books, Funk and 80s music. I take most of my design
              inspiration from offline experiences like going to art museums,
              galleries and working with other creative people on various
              projects. I also work with various Activist and NGO groups as a
              pro-bono designer and developer.
            </Paragraph>

            <Paragraph>
              Check out these official spaceout music collections:
            </Paragraph>
            <FlexHolder>
              <iframe
                src="https://open.spotify.com/embed/playlist/51qkTF7gCNA0htNjLtfqwR"
                width="300"
                height="380"
                frameBorder="0"
                allow="encrypted-media"
              ></iframe>{' '}
              <iframe
                src="https://open.spotify.com/embed/playlist/5jjCwKT5BZsEkYPbCZsVSR"
                width="300"
                height="380"
                frameBorder="0"
                allow="encrypted-media"
              ></iframe>
            </FlexHolder>
            <div style={{ height: '50px', width: '100%' }}></div>
            <Headings.H2>🛰️ Website info: </Headings.H2>
            <div style={{ height: '50px', width: '100%' }}></div>
            <Paragraph>
              This website is designed with ❤ by Spaceout.pl, using gatsby.js
              v2, react framework and typescript, I am trying to make it a
              gatsby template for others to using yarn workspaces, however still
              very at very early stage. Repo can be found at
              https://github.com/MassivDash/gatsby-spaceout-theme
            </Paragraph>
            <div style={{ height: '200px', width: '100%' }}></div>
          </Section>
        </CSSFadeIn>
      </Scroller>
    </>
  );
};

export default HowItsDone;
