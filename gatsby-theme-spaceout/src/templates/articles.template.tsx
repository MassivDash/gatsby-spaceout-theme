import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import Section from "@components/Section";
import SEO from "@components/SEO";
import Paginator from "@components/Navigation/Navigation.Paginator";
import { useColorMode } from 'theme-ui';
import Scrollbar from 'react-scrollbars-custom';
import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesList from "../sections/articles/Articles.List";
import {
  setNavigatorPosition,
} from "../state/createStore";

function ArticlesPage({ location, pageContext, setNavigatorPosition }) {
  const articles = pageContext.group;
  const authors = pageContext.additionalContext.authors;
  const [colorMode] = useColorMode();
  const scroller = useRef(null);
  const isDark = colorMode === "dark";

  useEffect(() => {
    setNavigatorPosition('main')
  })
  
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
      >
      <SEO pathname={location.pathname} />
      <ArticlesHero authors={authors} top/>
      <Section narrow>

        <ArticlesList articles={articles} />

        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
      <Section narrow>
      <ArticlesHero authors={authors} bottom />
      </Section>
    </Scrollbar>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesPage);

const ArticlesGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 95px;`}
`;
