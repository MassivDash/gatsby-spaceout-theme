/* eslint-disable */

// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyFluid_withWebp_tracedSVG = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
  tracedSVG
`

module.exports.local = {
  articles: `{
    articles: allArticle(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          secret
          title
          author
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          subscription
          body
          hero {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 100, traceSVG: {
                color: "#fafafa"
                turnPolicy: TURNPOLICY_MAJORITY
                blackOnWhite: true
              }) {
                ${GatsbyFluid_withWebp_tracedSVG}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100, traceSVG: {
                color: "#fafafa"
                turnPolicy: TURNPOLICY_MAJORITY
                blackOnWhite: true
              }) {
                ${GatsbyFluid_withWebp_tracedSVG}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100traceSVG: {
                color: "#fafafa"
                turnPolicy: TURNPOLICY_MAJORITY
              }) {
                ${GatsbyFluid_withWebp_tracedSVG}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 100) {
                src
              }
            }
          }
        }
      }
    }
  }`,
  authors: `{
    authors: allAuthor {
      edges {
        node {
          authorsPage
          bio
          id
          name
          featured
          social {
            url
          }
          slug
          avatar {
            small: childImageSharp {
              fluid(maxWidth: 50, quality: 100, traceSVG: {
                color: "#fafafa"
                turnPolicy: TURNPOLICY_MAJORITY
                blackOnWhite: true
              }) {
                ${GatsbyFluid_withWebp_tracedSVG}
              }
            }
            medium: childImageSharp {
              fluid(maxWidth: 100, quality: 100, traceSVG: {
                color: "#fafafa"
                turnPolicy: TURNPOLICY_MAJORITY
                blackOnWhite: true
              }) {
                ${GatsbyFluid_withWebp_tracedSVG}
              }
            }
            large: childImageSharp {
              fluid(maxWidth: 328, quality: 100, traceSVG: {
                color: "#fafafa"
                turnPolicy: TURNPOLICY_MAJORITY
                blackOnWhite: true
              }) {
                ${GatsbyFluid_withWebp_tracedSVG}
              }
            }
          }
        }
      }
    }
  }`,
}

module.exports.contentful = {
  articles: `{
    articles: allContentfulPost(sort: {fields: [date, title], order: DESC}, limit: 1000) {
      edges {
        node {
          body {
            childMdx {
              body
              timeToRead
            }
          }
          excerpt
          title
          slug
          secret
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          hero {
            full: fluid(maxWidth: 944, quality: 100) {
              ${GatsbyFluid_withWebp_tracedSVG}
            }
            regular: fluid(maxWidth: 653, quality: 100) {
              ${GatsbyFluid_withWebp_tracedSVG}
            }
            narrow: fluid(maxWidth: 457, quality: 100) {
              ${GatsbyFluid_withWebp_tracedSVG}
            }
            seo: fixed(width: 1200, quality: 100) {
              src
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
  `,
  authors: `{
    authors: allContentfulAuthor {
      edges {
        node {
          avatar {
            small: fluid(maxWidth: 50, quality: 100) {
              ${GatsbyFluid_withWebp_tracedSVG}
            }
            medium: fluid(maxWidth: 100, quality: 100) {
              ${GatsbyFluid_withWebp_tracedSVG}
            }
            large: fluid(maxWidth: 328, quality: 100) {
              ${GatsbyFluid_withWebp_tracedSVG}
            }
          }
          fields {
            authorsPage
            slug
          }
          bio
          id
          name
          social
          featured
        }
      }
    }
  }`,
}
