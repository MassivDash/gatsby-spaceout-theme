import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import { TechIcons } from '../articles/Articles.List';
import ArticleAuthors from './Article.Authors';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
            readingTime
          }
        }
      }
    }
  }
`;

const ArticleHero = ({ article, authors }: ArticleHeroProps) => {
  const { allSite } = useStaticQuery(siteQuery);
  const { readingTime } = allSite.edges[0].node.siteMetadata;
  const hasCoAUthors = authors.length > 1;
  const hasHeroImage =
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        <ArticleUberTitle>{article.appDescription}</ArticleUberTitle>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <TechIcons tech={article.tech} />
          <ArticleAuthors authors={authors} />
          {readingTime && (
            <ArticleMeta hasCoAUthors={hasCoAUthors}>
              {article.timeToRead} min czytania
            </ArticleMeta>
          )}
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? (
          <Image src={article.hero.full} />
        ) : (
          <ImagePlaceholder />
        )}
      </HeroImage>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${(p) => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 0;
      transition: ${p.theme.colorModeTransition};
    }

    &::after {
      content: "";
      width: 100%;
      height: 10px;
      background: ${p.theme.colors.background};
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: ${p.theme.colorModeTransition};
    }
  `}
`;

const ArticleMeta = styled.div<{ hasCoAUthors: boolean }>`
  margin-left: ${(p) => (p.hasCoAUthors ? '10px' : '0')};

  ${mediaqueries.phablet`
    margin-left: 0;
  `}
`;

const ArticleUberTitle = styled.div`
  font-size: 3rem;
  color: ${(p) => p.theme.colors.articleHoverText};
  z-index: 0;
  word-break: break-word;
  font-family: helvetica;
  font-weight: 900;
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 20px 10vw 120px;

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 50px auto;
    padding: 0 20px;
  `}
`;

const HeroHeading = styled(Headings.H1)`
  font-size: 48px;
  font-family: ${(p) => p.theme.fonts.serif};
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;

  ${mediaqueries.tablet`
    margin-bottom: 20px;
    font-size: 36px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const HeroSubtitle = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  display: flex;
  font-size: 18px;
  color: ${(p) => p.theme.colors.grey};

  ${(p) => mediaqueries.phablet`
    font-size: 14px;
    flex-direction: row;
    flex-wrap: wrap;

    ${
      p.hasCoAUthors &&
      `
        &::before {
          content: '';
          position: absolute;
          left: -20px;
          right: -20px;
          top: -10px;
          bottom: -10px;
          border: 1px solid ${p.theme.colors.horizontalRule};
          opacity: 0.5;
          border-radius: 5px;
        }
    `
    }


    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1150px;
  overflow: hidden;
  margin: 30px auto;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2),
    0 18px 36px -18px rgba(0, 0, 0, 0.22);

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 100%;

    & > div {
      height: 100%;
    }
`}
`;
