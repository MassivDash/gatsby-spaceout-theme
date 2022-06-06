import React, {FC} from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import Spaceman, {FlexHolder} from '../components/Spaceman';
import TechStack from '../components/TechStack';
import {TechIcons} from 'gatsby-theme-spaceout/src/sections/articles/Articles.List';
import CSSFadeIn from 'gatsby-theme-spaceout/src/components/Transitions/Transitions.CSS.FadeIn';
import ExternalLink from '../components/ExternalLink';
import GitHubCalendar from 'react-github-calendar';

const HowItsDone: FC = () => {
  return (
    <>
      <SEO />
      <Scroller style={{minHeight: '100vh'}}>
        <CSSFadeIn>
          <Section>
            <div style={{height: '50px', width: '100%'}}></div>
            <Spaceman />
            <Headings.H1>Hi there 👋</Headings.H1>
            <Headings.H2>
              My name is Luke and I am full stack javascript developer.
            </Headings.H2>
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
              Currently i am full time employed in JLL technology, Business
              Intelligence division as a tech lead and security champion.
            </Paragraph>
            <Paragraph>My stack:</Paragraph>
            <div style={{maxWidth: '1150px', margin: '20px auto'}}>
              <TechStack />
            </div>
            <Paragraph>
              If you are looking for a high quality custom product, that is not
              based on themes or standard solutions. Contact me for more info at{' '}
              <ExternalLink href="mailto:luke@spaceout.pl">
                luke@spaceout.pl
              </ExternalLink>
            </Paragraph>
            <div style={{height: '50px', width: '100%'}}></div>
            <Headings.H2>I’m currently working on ... </Headings.H2>
            <Paragraph>
              <TechIcons tech={['Owasp']} /> Implementing compliance and
              security protocols using the DevSecOps (#OWASP) principles
            </Paragraph>
            <Paragraph>
              <TechIcons tech={['Docker']} /> Docker mastery and node
              orchestration, Node.js clusters and distributed systems
            </Paragraph>
            <Paragraph>
              <TechIcons tech={['Cypress']} /> Mastering intergration testing
              using cypress.io
            </Paragraph>
            <Paragraph>
              <TechIcons tech={['Azure']} />
              Azure dev ops advanced yaml pipeline configuration
            </Paragraph>
            <div style={{height: '50px', width: '100%'}}></div>
            <div style={{maxWidth: '1150px', margin: '20px auto'}}>
              <GitHubCalendar
                username="MassivDash"
                blockSize={18}
                blockMargin={4}
                showTotalCount={false}
              />
            </div>
            <div style={{height: '50px', width: '100%'}}></div>
            <Headings.H2>some personal info ... </Headings.H2>
            <Paragraph>
              I am a big geek with huge love for Star Wars, Marvel and DC comic
              books, Funk and 80s music. I take most of my design inspiration
              from offline experiences like going to art museums, galleries and
              working with other creative people on various projects. I also
              work with various Activist and NGO groups as a pro-bono designer
              and developer.
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
            <div style={{height: '50px', width: '100%'}}></div>
            <Headings.H2>spaceout.pl info: </Headings.H2>
            <Paragraph>
              This website is designed with ❤ by Spaceout.pl, using gatsby.js
              v2, react framework and typescript, I am trying to make it a
              gatsby template for others to using yarn workspaces, however still
              very at very early stage. Repo can be found{' '}
              <ExternalLink href="https://github.com/MassivDash/gatsby-spaceout-theme">
                {' '}
                here
              </ExternalLink>
            </Paragraph>
            <div style={{height: '200px', width: '100%'}}></div>
          </Section>
        </CSSFadeIn>
      </Scroller>
    </>
  );
};

export default HowItsDone;
