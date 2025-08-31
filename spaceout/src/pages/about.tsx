import React, { FC } from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import Spaceman, { FlexHolder } from '../components/Spaceman';
import Spaceship from '../components/Spaceship';
import TechStack from '../components/TechStack';
import { MagnetLines, SectionContainer } from '../components/MagnetLines';

import CSSFadeIn from 'gatsby-theme-spaceout/src/components/Transitions/Transitions.CSS.FadeIn';
import ExternalLink from '../components/ExternalLink';

const About: FC = () => {
  return (
    <>
      <SEO />
      <Scroller style={{ minHeight: '100vh' }}>
        <CSSFadeIn>
          <Section>
            <div style={{ height: '50px', width: '100%' }}></div>
            <MagnetLines />
            <Spaceman />
            <Headings.H1>Hi there 👋, I'm Luke</Headings.H1>
            <Headings.H2>Professional Summary</Headings.H2>
            <Paragraph>
              <strong>
                Experienced software engineer, full-stack developer, and
                engineering manager at JLL Technologies (Business Intelligence
                Division), specializing in data-intensive applications, AI/ML,
                and cloud integrations. Passionate about system architecture,
                developer experience, and delivering robust solutions in
                competitive markets.
              </strong>
              <br />• Systems Architect for cross-platform solutions
              <br />• UI/UX Consultant ensuring seamless
              design-to-implementation workflows
            </Paragraph>
            <Headings.H2>Experience</Headings.H2>
            <Paragraph>
              Currently leading a team at JLL Technologies, building and
              maintaining full-stack solutions for workplace dynamics research
              and monitoring using sensors and big data. Over 5 years of product
              ownership and technical leadership, driving innovation and
              compliance in enterprise environments.
            </Paragraph>
            <Paragraph>
              <strong>Long-Term Product Stewardship:</strong> I take pride in
              owning and evolving products over the long haul, ensuring
              stability, scalability, and continuous improvement.
            </Paragraph>
          </Section>
          <Section>
            <SectionContainer>
              <MagnetLines columns={10} rows={10} />
            </SectionContainer>
            <Headings.H2>Technical Expertise</Headings.H2>
            <Paragraph>
              <strong>Languages:</strong> JavaScript, TypeScript, Rust, C, C++,
              Php, Asp.net
              <br />
              <strong>Frameworks & Libraries:</strong> React, React Native,
              Svelte, Astro.js, Next,js, Node.js
              <br />
              <strong>Cloud Platforms:</strong> AWS, Azure
              <br />
              <strong>DevOps & Infrastructure:</strong> Docker, CI/CD, GitHub
              Actions, DevSecOps, Cypress, Playwright ...
              <br />
              <strong>Big Data & AI:</strong> Data pipelines, AI agents,
              distributed systems
              <br />
              <strong>System Architecture:</strong> Scalable, modular design;
              performance optimization; security/compliance
              <br />
              <strong>UI/UX:</strong> Design systems, accessibility,
              cross-platform consistency
            </Paragraph>
            <div style={{ maxWidth: '1150px', margin: '20px auto' }}>
              <TechStack />
            </div>

            <div style={{ height: '50px', width: '100%' }}></div>
          </Section>
          <Section>
            <MagnetLines />
            <Spaceship />
            <Headings.H2>Projects & Achievements</Headings.H2>

            <Paragraph>
              <br />• Architected and launched enterprise-grade products for
              workplace analytics
              <br />• Led migration and integration projects across cloud and
              on-prem platforms
              <br />• Maintained and evolved a data-intensive product for over 5
              years with my team
              <br />• Implemented compliance and security protocols using
              DevSecOps principles
              <br />• Mastered Docker and node orchestration, including
              distributed systems and simulations of cloud app services
              <br />• Developed advanced GitHub Actions pipelines and CI/CD
              strategies
              <br />• Active contributor to open source and NGO initiatives,
              providing pro-bono design and development
            </Paragraph>
            <Headings.H2>Approach & Philosophy</Headings.H2>
            <Paragraph>
              <strong>Passion for Engineering:</strong> I believe in the power
              of software to transform businesses and lives. My approach centers
              on thoughtful system architecture, rigorous testing, and
              continuous learning.
            </Paragraph>
            <Paragraph>
              <strong>Developer Experience:</strong> I strive to create
              environments where developers can do their best work—through clear
              documentation, automated workflows, and supportive team culture.
            </Paragraph>
            <Paragraph>
              <strong>Professional Excellence:</strong> In a highly competitive
              market, I'm committed to delivering solutions that are not only
              functional but also elegant, secure, and future-proof.
            </Paragraph>
            <Paragraph>
              <strong>Continuous Learning:</strong> Whether it's mastering new
              technologies or exploring creative design, I'm always seeking to
              expand my horizons and share knowledge with the community.
            </Paragraph>
            <SectionContainer>
              <MagnetLines columns={10} rows={10} />
            </SectionContainer>
            <Headings.H2>Personal Passions & Inspiration</Headings.H2>
            <Paragraph>
              <strong>Geek Culture:</strong> Lifelong fan of Star Wars, Marvel,
              and DC comics
            </Paragraph>
            <Paragraph>
              <strong>Music:</strong> Funk and 80s music enthusiast; I curate
              official Spaceout music collections
            </Paragraph>
            <Paragraph>
              <strong>Art & Design:</strong> Draw inspiration from art museums,
              galleries, and creative collaborations
            </Paragraph>
            <Paragraph>
              <strong>Pro-Bono Work:</strong> Active contributor to NGO and
              activist groups as a designer and developer
            </Paragraph>
            <Paragraph>
              <strong>Community:</strong> I love working with creative people on
              projects that make a difference
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
            <Headings.H2>Let's Collaborate!</Headings.H2>
            <Paragraph>
              I'm open to open-source and NGO projects—if you have an
              interesting idea that helps others, let's connect! Reach me at{' '}
              <ExternalLink href="mailto:luke@spaceout.pl">
                luke@spaceout.pl
              </ExternalLink>
            </Paragraph>

            <div style={{ height: '50px', width: '100%' }}></div>

            <Paragraph>
              Want to dive deeper into my technical work? Check out my{' '}
              <ExternalLink href="/posts">blog posts</ExternalLink> for
              comprehensive guides on AI, system architecture, React, and more.
            </Paragraph>
            <div style={{ height: '200px', width: '100%' }}></div>
          </Section>
        </CSSFadeIn>
      </Scroller>
    </>
  );
};

export default About;
