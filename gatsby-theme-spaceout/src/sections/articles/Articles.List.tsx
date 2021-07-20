import React, { useContext, useEffect, FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useColorMode } from 'theme-ui';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import mediaqueries from '@styles/media';
import { IArticle } from '@types';
import Icons from '@icons';
import bg from './snow.png';

import { GridLayoutContext } from './Articles.List.Context';
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

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
}

const ArticlesList: FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const {
    gridLayout = 'tiles',
    hasSetGridLayout,
    getGridLayout,
  } = useContext(GridLayoutContext);

  /**readingTime
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce(
    (result, value, index, array: IArticle[]) => {
      if (index % 2 === 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        result.push(array.slice(index, index + 2));
      }
      return result;
    },
    [],
  );

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      {articlePairs.map((ap, index) => {
        const isEven = index % 2 !== 0;
        const isOdd = index % 2 !== 1;

        return (
          <List
            key={index}
            gridLayout={gridLayout}
            hasOnlyOneArticle={hasOnlyOneArticle}
            reverse={isEven}
          >
            <ListItem article={ap[0]} narrow={isEven} />

            <ListItem article={ap[1]} narrow={isOdd} />
          </List>
        );
      })}
    </ArticlesListContainer>
  );
};

export default ArticlesList;

export const TechIcons: FC<{ tech: string[] }> = ({ tech }) => {
  const [colorMode, _] = useColorMode();
  const isDark = colorMode === `dark`;
  const techItems = tech.map((tech) => {
    const IconComponent = Icons[tech];

    return (
      <IconComponent
        key={tech}
        width="48"
        height="48"
        {...(isDark && { fill: '#FFF' })}
        style={{ margin: '5px' }}
      />
    );
  });
  return <>{techItems}</>;
};

const ListItem = ({ article, narrow }: ArticlesListItemProps) => {
  const results = useStaticQuery(siteQuery);
  const { readingTime } = results.allSite.edges[0].node.siteMetadata;

  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage =
    Object.keys(imageSource).length !== 0 && imageSource.constructor === Object;
  return (
    <ArticleLink fade top="entry" to={article.slug} data-a11y="false">
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow || false} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
          <ArticleHover>
            <TechIcons tech={article.tech} />
            <ArticleHoverTextBG>{article.appDescription}</ArticleHoverTextBG>
            <ReadMoreButton>&#8674;</ReadMoreButton>
          </ArticleHover>
        </ImageContainer>
        <ExcerptWrapper>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt
            narrow={narrow || false}
            hasOverflow={hasOverflow || false}
            gridLayout={gridLayout}
          >
            {article.excerpt}
          </Excerpt>
          {readingTime && (
            <MetaData>{article.timeToRead} min czytania</MetaData>
          )}
        </ExcerptWrapper>
      </Item>
    </ArticleLink>
  );
};

const wide = '1fr';
// const narrow = '457px';

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${(p) => p.alwaysShowAllDetails && showDetails};
  ${mediaqueries.tablet`
    padding: 0 0 0 10px;
  `}
`;

const listTile = (p) => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse ? `${wide} ${wide}` : `${wide} ${wide}`};
  grid-template-rows: 2;
  column-gap: 30px;
  min-width: 67vw;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr;

  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const listItemRow = (p) => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 488px;
  grid-column-gap: 96px;
  grid-template-rows: 1;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

const listItemTile = (p) => css`
  position: relative;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

// If only 1 article, dont create 2 rows.
const listRow = (p) => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr'};
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
  hasOnlyOneArticle: boolean;
}>`
  ${(p) => (p.gridLayout === 'tiles' ? listTile : listRow)};
  transition: opacity 0.8s ease-in-out;
`;

const Item = styled.div<{ gridLayout: string }>`
  ${(p) => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${(p) => (p.gridLayout === 'tiles' ? '100%' : '100%')};
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${(p) => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${(p) => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 400px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

const Title = styled(Headings.H2)`
  font-size: 21px;
  font-family: ${(p: any) => p.theme.fonts.sansSerif};
  margin-bottom: ${(p) =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px'};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    margin-bottom: 15px
  `}

  ${mediaqueries.tablet`
    font-size: 24px;
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
    padding: 30px 20px 0;
    margin-bottom: 10px;
    -webkit-line-clamp: 3;
  `}
`;

const ExcerptWrapper = styled.div`
  ${mediaqueries.tablet`
min-height: 150px;
`}
`;

const Excerpt = styled.p<{
  hasOverflow: boolean;
  narrow: boolean;
  gridLayout: string;
}>`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${(p: any) => p.theme.colors.grey};
  display: ${(p) =>
    p.hasOverflow && p.gridLayout === 'tiles' ? 'none' : 'box'};
  max-width: ${(p) => (p.narrow ? '415px' : '515px')};

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    margin-bottom; 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  `}
`;

const MetaData = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${(p: any) => p.theme.colors.grey};
  opacity: 0.33;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px 30px;Link
  `}
`;

const ArticleHover = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  top: 0;
  background-blend-mode: multiply;
  background-image: url(${bg});
  color: ${(p: any) => p.theme.colors.accent};
  background-color: ${(p: any) => p.theme.colors.background};
  transition: 0.44s var(--ease-out-quart);
  overflow: hidden;
  &:hover {
    opacity: 1;
  }
`;

const ArticleHoverTextBG = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  font-size: 5rem;
  color: ${(p: any) => p.theme.colors.articleHoverText};
  z-index: 0;
  margin: 25px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  word-break: break-word;
  font-family: helvetica;
  font-weight: 900;
`;

const ReadMoreButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 2rem;
  text-transform: lowercase;
  font-family: helvetica;
  color: ${(p: any) => p.theme.colors.articleHoverText};
  padding: 50px;
  font-weight: 900;
`;

const ArticleLink = styled(AniLink)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27),
      0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: ${(p: any) => p.theme.colors.accent};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${(p: any) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
