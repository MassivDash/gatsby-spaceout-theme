import React from 'react';
import styled from '@emotion/styled';
import Section from '@components/Section';
import SEO from '@components/SEO';
import Paginator from '@components/Navigation/Navigation.Paginator';
import SpaceHero from '@components/SpaceHero';
import ArticlesHero from '../sections/articles/Articles.Hero';
import ArticlesList from '../sections/articles/Articles.List';
import CSSFadeIn from '@components/Transitions/Transitions.CSS.FadeIn';
import type { Location, PageContext } from 'src/types';

function ArticlesPage({
  location,
  pageContext,
}: {
  location: Location;
  pageContext: PageContext;
}): React.ReactElement {
  const articles = pageContext.group;
  const authors = pageContext.additionalContext.authors;

  const checkIfSecondPageOrAbove =
    Number(location.pathname.split('/').pop()) >= 2;

  return (
    <CSSFadeIn>
      <SEO pathname={location.pathname} />
      <Section narrow data-pagefind-ignore>
        {!checkIfSecondPageOrAbove && <SpaceHero />}
        <ArticlesHero authors={authors as any} top />
        <ArticlesList articles={articles} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...(pageContext as any)} />
        </ArticlesPaginator>
      </Section>
      <Section narrow>
        <ArticlesHero authors={authors} bottom />
      </Section>
    </CSSFadeIn>
  );
}

export default ArticlesPage;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${(p) => p.show && `margin-top: 95px;`}
`;
