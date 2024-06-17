import React, { ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import Bio from '@components/Bio';
// import SpaceHero from '@components/SpaceHero';
// import Icons from '@icons';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
    back: imageSharp(original: { src: { regex: "/heroBack/" } }) {
      id
      sizes(maxWidth: 1920, quality: 90, traceSVG: { color: "#121f28" }) {
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        tracedSVG
      }
      resize(width: 1920) {
        src
      }
    }
    earth: imageSharp(original: { src: { regex: "/earth/" } }) {
      id
      sizes(maxWidth: 3000, quality: 90, traceSVG: { color: "#FFF" }) {
        base64
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        tracedSVG
      }
      resize(width: 1920) {
        src
      }
    }
    spaceman: imageSharp(original: { src: { regex: "/spaceman/" } }) {
      id
      sizes(maxWidth: 3000, quality: 90, traceSVG: { color: "#FFF" }) {
        base64
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        tracedSVG
      }
      resize(width: 1920) {
        src
      }
    }
    shuttle: imageSharp(original: { src: { regex: "/shuttle/" } }) {
      id
      sizes(maxWidth: 3000, quality: 90, traceSVG: { color: "#FFF" }) {
        base64
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        tracedSVG
      }
      resize(width: 1920) {
        src
      }
    }
  }
`;

function ArticlesHero({
  authors,
  top,
  bottom,
}: {
  authors: IAuthor[];
  top?: boolean;
  bottom?: boolean | undefined;
}): ReactElement {
  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  // const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  const featuredAuthor = authors.find((author) => author.featured);

  // const { earth, spaceman, back, shuttle } = results;

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <Section id="Articles__Hero" data-pagefind-ignore>
      {top && (
        <>
          <HeadingContainer
            style={{ maxWidth: `${hero.maxWidth}px` }}
          ></HeadingContainer>
        </>
      )}
      {bottom && (
        <SubheadingContainer>
          <Bio author={featuredAuthor} />
        </SubheadingContainer>
      )}
    </Section>
  );
}

export default ArticlesHero;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px;

  ${mediaqueries.desktop`
    margin-bottom: 80px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `};

  ${mediaqueries.phablet`
    display: flex;
    flex-direction: column;
  `};
`;

// const GridControlsContainer = styled.div`
//   display: flex;
//   align-items: center;

//   ${mediaqueries.tablet`
//     display: flex;
//     flex-direction: 'column'
//   `};
// `;

const HeadingContainer = styled.div`
  margin: 100px 0;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

// const HeroHeading = styled.h1`
//   font-style: normal;
//   font-weight: 600;
//   font-size: 52px;
//   line-height: 1.15;
//   padding-bottom: 10px;
//   color: ${(p) => p.theme.colors.primary};

//   a {
//     color: ${(p) => p.theme.colors.accent};
//   }

//   ${mediaqueries.desktop`
//     font-size: 38px
//   `}

//   ${mediaqueries.phablet`
//     font-size: 32px;
//   `}
// `;

// const HeroSubHeading = styled.h2`
//   font-style: normal;
//   font-weight: 400;
//   font-size: 32px;
//   line-height: 1.15;
//   color: ${(p) => p.theme.colors.primary};

//   a {
//     color: ${(p) => p.theme.colors.accent};
//   }

//   ${mediaqueries.desktop`
//     font-size: 26px
//   `}

//   ${mediaqueries.phablet`
//     font-size: 22px;
//   `}
// `;
