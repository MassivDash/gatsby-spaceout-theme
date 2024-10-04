require('dotenv').config();

const siteMetadata = {
  title: `Spaceout`,
  name: `beyond excelsior`,
  siteUrl: `https://spaceout.pl`,
  description: `Software development, application and system architecture`,
  readingTime: true,
  similarPosts: true,
  hero: {
    heading: `beyond excelsior`,
    maxWidth: 652,
  },
  menuLinks: [
    {
      title: 'about me',
      slug: 'about',
    },
    {
      title: "How it's done",
      slug: 'howitsdone',
    },
    {
      title: 'Contact',
      slug: 'contact',
    },
  ],
  social: [
    {
      name: `facebook`,
      url: `https://www.facebook.com/spaceout/`,
    },
    {
      name: `twitter`,
      url: `https://twitter.com/spaceout`,
    },
    {
      name: `instagram`,
      url: `https://www.instagram.com/spaceout/`,
    },
    {
      name: `spaceout`,
      url: `https://blog.spaceout.pl/`,
    },
    {
      name: `dribbble`,
      url: `https://dribbble.com/spaceout`,
    },
    {
      name: `behance`,
      url: `https://behance.com/spaceout`,
    },
    {
      name: `github`,
      url: `https://github.com/massivDash/`,
    },
  ],
};

const plugins = [
  {
    resolve: 'gatsby-theme-spaceout',
    options: {
      contentPosts: 'content/posts',
      contentAuthors: 'content/authors',
      rootPath: '/',
      basePath: '/',
      authorsPage: true,
      mailchimp: false,
      sources: {
        local: true,
        contentful: false,
      },
    },
  },
  {
    resolve: `gatsby-plugin-svgr`,
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Spaceout.pl`,
      short_name: `spaceout`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#fff`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-108090584-1',
      head: false,
      // Setting this parameter is optional
      anonymize: true,
      // Setting this parameter is also optional
      respectDNT: true,
      cookieDomain: 'spaceout.pl',
    },
  },
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: [
          'Raleway:200,300,700,900',
          'Oswad:200,300,700,900',
          'Lato:200,300,700,900',
          'Cormorant:200,300,700,900',
          'Barlow Condensed:200,300,700,900',
          'Cutive:200,300,700,900',
        ],
      },
    },
  },
  {
    resolve: `gatsby-plugin-emotion`,
  },
  {
    resolve: `gatsby-plugin-react-helmet`,
  },
  'gatsby-plugin-offline',
  'gatsby-plugin-sitemap'
];

/**
 * For development purposes if there's no Contentful Space ID and Access Token
 * set we don't want to add in gatsby-source-contentful because it will throw
 * an error.
 *
 */
if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
  plugins.push({
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  });
}

module.exports = {
  siteMetadata,
  plugins,
};
