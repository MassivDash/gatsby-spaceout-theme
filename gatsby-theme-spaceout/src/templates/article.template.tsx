import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from '@emotion/core'
import throttle from "lodash/throttle";
import { graphql, useStaticQuery } from "gatsby";
import MDXRenderer from "@components/MDX";
import Section from "@components/Section";
import { connect } from "react-redux";

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import ArticleHero from "../sections/article/Article.Hero";
import ArticleControls from "../sections/article/Article.Controls";
import ArticlesNext from "../sections/article/Article.Next";
import ArticleSEO from "../sections/article/Article.SEO";
import ArticleShare from "../sections/article/Article.Share";
import { useColorMode } from 'theme-ui';
import Scrollbar from 'react-scrollbars-custom';

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

function Article({ pageContext, location, fontSizeIncrease }) {
  const contentSectionRef = useRef<HTMLElement>(null);
  const [colorMode] = useColorMode();
  const scroller = useRef(null);
  const isDark = colorMode === "dark";

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const { similarPosts } = results.allSite.edges[0].node.siteMetadata;

  const { article, authors, mailchimp, next } = pageContext;

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
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach($img => {
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
    window.addEventListener("resize", calculateBodySize);

    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  return (
    <Scrollbar 
    ref={scroller}
   trackYProps={{
     renderer: props => {
       const { elementRef, ...restProps } = props;
       return <span {...restProps} ref={elementRef} style={{ position: "absolute",
         overflow: "hidden",
         borderRadius: "4px",
         background: isDark ? "rgb(17, 18, 22)" : "rgb(250, 250, 250)",
         userSelect: "none",
         width: "6px",
         height: "calc(100% - 20px)",
         top: "10px",
         right: "0px"}} />;
     }
   }}
   thumbYProps={{
     renderer: props => {
       const { elementRef, ...restProps } = props;
       return <span {...restProps} ref={elementRef} className="tHuMbY" 
       style={{
         position: "absolute",
         touchAction: "none",
         cursor: "pointer",
         borderRadius: "4px",
         background: isDark ? "rgb(250, 250, 250)" : "rgba(124, 124, 124, 0.5)",
         width: "100%"
       }}
       />;
       
     }
   }}
   ><Background>
      <ArticleSEO article={article} authors={authors} location={location} />
      <ArticleHero article={article} authors={authors} />
      <MobileControls>
        <ArticleControls />
      </MobileControls>
      <ArticleBody fontSizeIncrease={fontSizeIncrease} ref={contentSectionRef}>
        <MDXRenderer content={article.body}>
          <ArticleShare />
        </MDXRenderer>
      </ArticleBody>
      {next.length > 0 && similarPosts && (
        <NextArticle >
          <FooterNext>Sprawdź dalsze przygody felka</FooterNext>
          <ArticlesNext articles={next} />
          <FooterSpacer />
        </NextArticle>
      )}
      </Background>
    </Scrollbar>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    fontSizeIncrease: state.fontSizeIncrease
  };
};

export default connect(
  mapStateToProps,
)(Article);

const articleFontDynamicStyle = props =>
  css`
    font-size: ${18 * props.fontSizeIncrease}px;
    position: relative;
    padding: 160px 0 35px;
    padding-left: 68px;
    transition: background 0.2s linear;

  ${mediaqueries.desktop`
    padding-left: 53px;
  `}
  
  ${mediaqueries.tablet`
    padding: 70px 0 80px;
  `}

  ${mediaqueries.phablet`
    padding: 60px 0;
  `}
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

const ArticleBody = styled.article`${articleFontDynamicStyle}`
  

const NextArticle = styled(Section)`
  display: block;
`;

const Background = styled.div`
background-color: #fafafa;
padding-top: 20px;
`;

const FooterNext = styled.h3`
  position: relative;
  opacity: 0.25;
  margin-bottom: 100px;
  font-weight: 400;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.colors.grey};
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
