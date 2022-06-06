import React, {FC} from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import CSSFadeIn from 'gatsby-theme-spaceout/src/components/Transitions/Transitions.CSS.FadeIn';
import Shuttle from '../components/Shuttle';
import TechStack from '../components/TechStack';

const HowItsDone: FC = () => {
  return (
    <>
      <SEO />
      <Scroller style={{minHeight: '100vh'}}>
        <CSSFadeIn>
          <Section>
            <div style={{height: '50px', width: '100%'}}></div>
            <Shuttle />

            <div style={{height: '50px', width: '100%'}}></div>
            <Headings.H1>
              Creating an unforgettable web-app experience. 💎
            </Headings.H1>
            <div style={{height: '50px', width: '100%'}}></div>
            <Paragraph>
              Over the years of my freelance work as a website designer, I have
              noticed how ready build solutions, one for all tools like
              wordpress, joomla, templates and themes poorly preform in the real
              environment. Solutions build for everyone, that satisfy needs of
              none.
            </Paragraph>

            <Paragraph>
              An unforgettable application must be easy to use and familiar, on
              the other hand it needs those special touches to really grab the
              user attention. Well thought out plan and design is the key to
              success in creation of any product.
            </Paragraph>

            <Headings.H2>UX (User Experience)</Headings.H2>
            <Paragraph>
              Very first step in creation of whatever kind of digital product,
              always should be UX (User Experience) analysis. User experience
              (UX) refers to any interaction a user has with a product or
              service. The goal of UX design is to create easy, efficient,
              relevant and all-round pleasant experiences for the user. In the
              age of the internet and smartphones, the usability of a website
              (and actual technical implementation), mobile app or piece of
              software will largely determine its success on the market.
            </Paragraph>
            <Paragraph>
              The UX design is all about ensuring that every aspect of a user’s
              experience with the product happens without conscious and explicit
              intent. The UX design strategy can be divided into six key phases:
              understanding, researching, analysis, design, launch, and
              evaluation.
            </Paragraph>
            <Headings.H2>UI (User Interface)</Headings.H2>
            <Paragraph>
              After the UX analysis is done, the next step is to create or pick
              a design system for the website or application. These days each
              business should strive a consistent look and design across systems
              and services. A design system is a collection of visual components
              that be easily used to create most of the pages composition.
            </Paragraph>
            <Headings.H2>Development</Headings.H2>
            <Paragraph>
              Development and execution is most of the time the easiest part,
              with good ux/ui execution, there should be nothing in way to
              create an application, except for picking the correct technology
              stack.
            </Paragraph>
            <Paragraph>
              As a full stack javascript I prefer to use node.js on the backend,
              however I am no stranger to NGNIX, APACHE, PHP ASP.NET servers, I
              am also a big fan of the JAM stack approach to building
              applications, which mostly relies on static files on downloading
              relevant data from whatever source of truth is needed, preferably
              a cloud function these days.Please feel free to look around for
              technology stack I have used before in the post section of the
              website, to get a feel
            </Paragraph>

            <div style={{maxWidth: '1150px', margin: '20px auto'}}>
              <TechStack />
            </div>

            <Headings.H2>Deployment</Headings.H2>
            <Paragraph>
              Different solutions and technology stacks require different
              delivery methods, choosing the right provider is always crucial to
              the business in long term in terms of costs and maintenance. AWS
              and Azure Services are usually my go to choice, but there are many
              other options available.
            </Paragraph>

            <div style={{height: '200px', width: '100%'}}></div>
          </Section>
        </CSSFadeIn>
      </Scroller>
    </>
  );
};

export default HowItsDone;
