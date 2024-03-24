import React from 'react';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

interface HelmetProps {
  children?: React.ReactChildren;
  title?: string;
  description?: string;
  pathname: string;
  image?: string;
  slug?: string;
  canonical?: string;
  published?: string;
  timeToRead?: string;
}

const seoQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            description
            social {
              url
            }
            siteUrl
            title
          }
        }
      }
    }
  }
`;

const themeUIDarkModeWorkaroundScript = [
  {
    type: 'text/javascript',
    innerHTML: `
    (function() {
      try {
        var mode = localStorage.getItem('theme-ui-color-mode');
        if (!mode) {
          localStorage.setItem('theme-ui-color-mode', 'light');
        }
      } catch (e) {}
    })();
  `,
  },
];

function SEO({
  title,
  description,
  children,
  image,
  slug,
  published,
  pathname,
  timeToRead,
}: HelmetProps): React.ReactElement {
  const results = useStaticQuery(seoQuery);
  const site = results.allSite.edges[0].node.siteMetadata;
  const twitter = site.social.find((option) => option.name === 'twitter') || {};

  const url = `${site.siteUrl}${slug}/`;

  const fullURL = (path: string) =>
    path ? `${site.siteUrl}${path}` : site.siteUrl;

  // If no image is provided lets looks for a default spaceout static image
  image = image ? image : '/spaceout.jpg';

  const metaTags: Record<string, string>[] = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#fff',
    },
    {
      rel: 'canonical',
      href: `${fullURL(pathname)}/`,
    },
    { itemprop: 'name', content: title || site.title },
    { itemprop: 'description', content: description || site.description },
    { itemprop: 'image', content: fullURL(image) },
    { name: 'description', content: description || site.description },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: site.name || 'spaceout.pl' },
    { name: 'twitter:title', content: title || site.title },
    {
      name: 'twitter:description',
      content: description || 'UX/UI design, Web and Native App develeopement.',
    },
    { name: 'twitter:creator', content: twitter.url || 'https://spaceout.pl' },
    {
      name: 'twitter:image',
      content: fullURL(image),
    },

    { property: 'og:title', content: title || 'Spaceout' },
    { property: 'og:url', content: url || 'https://spaceout.pl' },
    { property: 'og:image', content: fullURL(image) },
    { property: 'og:type', content: 'website' },
    { property: 'fb:app_id', content: '1535178676578893' },
    {
      property: 'og:description',
      content: description || 'UX/UI design, Web and Native App develeopement.',
    },
    { property: 'og:site_name', content: site.name || 'Spaceout' },
  ];

  if (published) {
    metaTags.push({ name: 'article:published_time', content: published });
  }

  if (timeToRead) {
    metaTags.push({ name: 'twitter:label1', value: 'Reading time' });
    metaTags.push({
      name: 'twitter:data1',
      value: `${timeToRead} min read`,
    });
  }

  return (
    <Helmet
      title={title || site.title}
      htmlAttributes={{ lang: 'en' }}
      script={themeUIDarkModeWorkaroundScript}
      meta={metaTags}
    >
      {children}
    </Helmet>
  );
}

export default SEO;
