import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesList from "../sections/articles/Articles.List";

function ArticlesPage({ location, pageContext }) {
  const articles = pageContext.group;
  const authors = pageContext.additionalContext.authors;

  return (
    <Layout>
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
    </Layout>
  );
}

export default ArticlesPage;

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
