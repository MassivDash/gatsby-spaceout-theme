import React from 'react';

import SEO from '@components/SEO';

import { IArticle, IAuthor, Location } from '@types';
import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    }
  }
`;

const ArticleSEO: React.FC<{
  article: IArticle;
  authors: IAuthor[];
  location: Location;
}> = ({ article, authors, location }) => {
  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;
  const siteUrl = results.allSite.edges[0].node.siteMetadata.siteUrl;

  const authorsData = authors.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }));

  /**
   * For some reason `location.href` is undefined here when using `yarn build`.
   * That is why I am using static query `allSite` to get needed fields: name & siteUrl.
   */
  const microdataObject = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': siteUrl + location.pathname,
    },
    headline: article.title,
    image: siteUrl + article.hero.seo.src,
    datePublished: article.dateForSEO,
    dateModified: article.dateForSEO,
    author: authorsData,
    description: article.excerpt,
    publisher: {
      '@type': 'Organization',
      name: name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icons/icon-512x512.png`,
      },
    },
  };

  const microdata = JSON.stringify(microdataObject);

  return (
    <SEO
      title={article.title}
      description={article.excerpt}
      image={article.hero.seo.src}
      timeToRead={`${article.timeToRead}`}
      published={article.date}
      pathname={location.pathname}
      slug={article.slug}
    >
      <script type="application/ld+json">{microdata}</script>
    </SEO>
  );
};

export default ArticleSEO;
