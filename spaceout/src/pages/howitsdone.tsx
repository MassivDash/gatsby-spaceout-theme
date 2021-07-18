import React from 'react';
import Scroller from 'gatsby-theme-spaceout/src/components/Scroller';
import Section from 'gatsby-theme-spaceout/src/components/Section';
import SEO from 'gatsby-theme-spaceout/src/components/SEO';
import Headings from 'gatsby-theme-spaceout/src/components/Headings';
import Paragraph from 'gatsby-theme-spaceout/src/components/Paragraph';
import CSSFadeIn from 'gatsby-theme-spaceout/src/components/Transitions/Transitions.CSS.FadeIn';
import TitleWithLottie from '../components/TitleWithLottie';
import process from '../assets/lottie/process.json';
import Shuttle, {
  NextToShuttleHolder,
  FlexHolder,
} from '../components/Shuttle';

import SocialLinks from 'gatsby-theme-spaceout/src/components/SocialLinks';
const HowItsDone = () => {
  return (
    <>
      <SEO />
      <Scroller style={{ minHeight: '100vh' }}>
        <CSSFadeIn>
          <Section>
            <Shuttle />
            <NextToShuttleHolder>
              <Headings.H1 style={{ margin: '25px 0 75px 0' }}>
                Creating an unforgettable web-app experience.
              </Headings.H1>

              <Paragraph>
                Over the years of my freelance work as a website designer, I
                have noticed how ready build solutions, one for all tools like
                wordpress, joomla, templates and themes poorly preform in the
                real environment. Solutions build for everyone, that satisfy
                needs of none.
              </Paragraph>

              <Paragraph>
                That how the spaceout brand was born, the idea to create awesome
                web and native applications in terms of excellent user
                experience, well crafted user interfaces and build upon the best
                available development technologies.
              </Paragraph>

              <Paragraph>
                <FlexHolder>
                  <SocialLinks links={[{ name: 'spaceout', url: '/about' }]} />{' '}
                  Luke Celitan
                </FlexHolder>
              </Paragraph>
            </NextToShuttleHolder>

            <Headings.H2 style={{ margin: '100px 0 25px 0 ' }}>
              UX (User Experience)
            </Headings.H2>

            <Paragraph>
              Very first step in creation of whatever kind of product should
              always be UX (User Experience) analysis. User experience (UX)
              refers to any interaction a user has with a product or service.
              The goal of UX design is to create easy, efficient, relevant and
              all-round pleasant experiences for the user. In the age of the
              internet and smartphones, the usability of a website (and actual
              technical implementation), mobile app or piece of software will
              largely determine its success on the market.
            </Paragraph>
            <Paragraph>
              The UX design is all about ensuring that every aspect of a user’s
              experience with the product happens without conscious and explicit
              intent. The UX design strategy can be divided into six key phases:
              understanding, researching, analysis, design, launch, and
              evaluation.
            </Paragraph>
            <Headings.H3 style={{ margin: '100px 0 25px 0 ' }}>
              Design Thinking
            </Headings.H3>
            <Paragraph>
              Design thinking is an iterative, non-linear way of working that
              seeks to understand users and solve problems. It consists of five
              phases-empathize, define, ideate, prototype and test. The process
              is perfect for situations where the overall challenge is not clear
              or you have problems that are as yet unknown. With rapid
              technological, environmental and social change becoming the new
              normal, it’s important for companies to be as agile as possible.
              Design thinking is a human-centric approach that can help to deal
              with this environment of constant change. It allows designers to
              focus on what’s best for the user.
            </Paragraph>

            <div style={{ margin: ' 150px 0' }}>
              <TitleWithLottie
                title="The Process"
                column={false}
                text={
                  'I follow the standard 6 step UX process strategy; 1. Understand, 2.Research, 3, Analyze. 4. Design, 5.Launch, 6. Analyze again ePersonally I am a big fan of data driven design, however not each business has the data to start with. '
                }
                lottie={process}
              />
            </div>
          </Section>
        </CSSFadeIn>
      </Scroller>
    </>
  );
};

export default HowItsDone;
