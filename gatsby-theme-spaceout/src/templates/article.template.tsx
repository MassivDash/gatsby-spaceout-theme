import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import throttle from 'lodash/throttle';
import { useColorMode } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';
import MDXRenderer from '@components/MDX';
import Section from '@components/Section';
import { connect } from 'react-redux';
import mediaqueries from '@styles/media';
import { debounce } from '@utils';
import Logo from '@components/Logo';
import ArticleHero from '../sections/article/Article.Hero';
import ArticleControls from '../sections/article/Article.Controls';
import ArticlesNext from '../sections/article/Article.Next';
import ArticleSEO from '../sections/article/Article.SEO';
import ArticleShare from '../sections/article/Article.Share';

import { setFontSizeIncrease } from '../state/createStore';

import CSSFadeIn from '@components/Transitions/Transitions.CSS.FadeIn';
const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            readingTime
            similarPosts
          }
        }
      }
    }
  }
`;

function Article({ pageContext, location, fontSizeIncrease, theme }) {
  const contentSectionRef = useRef<HTMLElement>(null);
  const [colorMode] = useColorMode();
  const fill = colorMode === 'dark' ? '#fff' : '#000';

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [_, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const { similarPosts } = results.allSite.edges[0].node.siteMetadata;

  const { article, authors, next } = pageContext;

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll('img');

        $imgs.forEach(($img) => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener('resize', calculateBodySize);

    return () => window.removeEventListener('resize', calculateBodySize);
  }, []);

  return (
    <CSSFadeIn>
      <BackgroundLayer theme={theme}>
        <ArticleSEO article={article} authors={authors} location={location} />
        <ArticleHero article={article} authors={authors} />
        <MobileControls>
          <ArticleControls />
        </MobileControls>
        <ArticleBody
          fontSizeIncrease={fontSizeIncrease}
          ref={contentSectionRef}
        >
          <MDXRenderer content={article.body}>
            <GoBackLogo>
              <Logo fill={fill} />
            </GoBackLogo>
            <ArticleShare />
          </MDXRenderer>
        </ArticleBody>
        {next.length > 0 && similarPosts && (
          <NextArticle data-pagefind-ignore>
            <FooterNext></FooterNext>
            <ArticlesNext articles={next} />
            <FooterSpacer />
          </NextArticle>
        )}
      </BackgroundLayer>
    </CSSFadeIn>
  );
}

const mapStateToProps = (state) => {
  return {
    fontSizeIncrease: state.fontSizeIncrease,
  };
};

const mapDispatchToProps = {
  setFontSizeIncrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);

const articleFontDynamicStyle = (props) =>
  css`
    font-size: ${18 * props.fontSizeIncrease}px;
    position: relative;
    transition: background 0.2s linear;
    margin-bottom: 100px;

    @media (max-width: 986px) {
      padding: 60px 20px;
    }
  `;

const MobileControls = styled.div`
  position: relative;
  padding-top: 60px;
  transition: background 0.2s linear;
  text-align: center;

  ${mediaqueries.tablet_up`
    display: none;
  `}
`;

const GoBackLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  min-width: 100px;
  width: 100%;
`;

const ArticleBody = styled.article`
  ${articleFontDynamicStyle}
`;

const NextArticle = styled(Section)`gatsby-
  display: block;
`;

const BackgroundLayer = styled.div`
  background-color: ${(p: any) => p.theme.colors.background};
  transition: 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  padding-top: 20px;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${(p: any) => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${(p: any) => p.theme.colors.grey};
    width: ${(910 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.tablet`
      width: ${(600 / 1140) * 100}%;
    `}

    ${mediaqueries.phablet`
      width: ${(400 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: 90px
    `}
  }
`;

const FooterSpacer = styled.div`
  margin-bottom: 65px;
`;
