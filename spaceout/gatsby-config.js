require("dotenv").config();

const siteMetadata = {
  title: `Spaceout`,
  name: `Intersetellar web design`,
  siteUrl: `https://spaceout.pl`,
  description: `Intersetellar web design`,
  hero: {
    heading: `Intersetellar web design`,
    maxWidth: 652,
  },
  social: [
    {
      name: `facebook`,
      url: `https://www.facebook.com/spaeout/`,
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
      url: `https://blog.spaceout.pl/`
    },
    {
      name: `dribbble`,
      url: `https://dribbble.com/spaceout`
    },
    {
      name: `behance`,
      url: `https://behance.com/spaceout`
    },
    {
      name: `github`,
      url: `https://github.com/massivDash/`
    }
  ],
};

const plugins = [
  {
    resolve: "gatsby-theme-spaceout",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      rootPath: "/",
      basePath: "/",
      authorsPage: true,
      mailchimp: false,
      sources: {
        local: true,
        contentful: false,
      },
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Nieprawdopodobne przygody psa Felka`,
      short_name: `Felek`,
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
      trackingId: "UA-150852074-1",
    },
  },
];

/**
 * For development purposes if there's no Contentful Space ID and Access Token
 * set we don't want to add in gatsby-source-contentful because it will throw
 * an error.
 *
 */
if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
  plugins.push({
    resolve: "gatsby-source-contentful",
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
