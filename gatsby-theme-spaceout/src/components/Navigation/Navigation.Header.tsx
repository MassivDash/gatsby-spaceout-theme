import React, { useState, useEffect, useMemo, useRef } from 'react'
import styled from '@emotion/styled'
import { navigate, graphql, useStaticQuery } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import Image from 'gatsby-image'
import Scrollbar from '@components/Scroller'
import { useColorMode } from 'theme-ui'
import { connect } from 'react-redux'
import Logo from '@components/Logo'
import SocialLinks from '@components/SocialLinks'
import Icons from '@icons'
import mediaqueries from '@styles/media'

import { getWindowDimensions, getBreakpointFromTheme } from '@utils'

import {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
} from '../../state/createStore'

const siteQuery = graphql`
  {
    sitePlugin: sitePlugin(name: { eq: "gatsby-theme-spaceout" }) {
      pluginOptions {
        rootPath
        basePath
      }
    }
    allSite: allSite {
      edges {
        node {
          siteMetadata {
            name
            title
            description
            menuLinks {
              title
              slug
            }
            social {
              url
              name
            }
          }
        }
      }
    }
    allArticles: allArticle {
      totalCount
      edges {
        node {
          id
          title
          slug
          hero {
            childImageSharp {
              id
              fluid(
                maxWidth: 653
                quality: 100
                traceSVG: {
                  color: "#fafafa"
                  turnPolicy: TURNPOLICY_MAJORITY
                  blackOnWhite: true
                }
              ) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
                tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

const NavigationHeader = ({ navigatorPosition }) => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false)
  const [previousPath, setPreviousPath] = useState<string>('/')

  const { sitePlugin, allSite, allArticles } = useStaticQuery(siteQuery)
  const {
    title,
    name,
    description,
    social,
    menuLinks,
  } = allSite.edges[0].node.siteMetadata

  const [colorMode] = useColorMode()
  const fill = colorMode === 'dark' ? '#fff' : '#000'
  const isDark = colorMode === 'dark'
  const { rootPath, basePath } = sitePlugin.pluginOptions
  useEffect(() => {
    const { width } = getWindowDimensions()
    const phablet = getBreakpointFromTheme('phablet')

    const prev = localStorage.getItem('previousPath')
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes('/page/'))
    const isNotPaginated = !location.pathname.includes('/page/')

    setShowBackArrow(
      previousPathWasHomepage && isNotPaginated && width <= phablet
    )
    setPreviousPath(prev)
  }, [])

  const scrollRef = useRef(null)

  const click = () => {
    console.log(scrollRef)
    scrollRef.current.scrollToTop()
  }

  const ArticleNavigator = navigatorPosition === 'article' ? true : false

  return (
    <NavContainer>
      <NavInfoContainer>
        <LogoLink
          fade
          articleposition={ArticleNavigator}
          to={rootPath || basePath}
          data-a11y="false"
          title="Navigate back to the homepage"
          aria-label="Navigate back to the homepage"
          back={showBackArrow ? 'true' : 'false'}
        >
          {showBackArrow && (
            <BackArrowIconContainer>
              <Icons.ChevronLeft fill={fill} />
            </BackArrowIconContainer>
          )}
          <Logo fill={fill} />
          <Hidden>Navigate back to the homepage</Hidden>
        </LogoLink>
        <Title articleposition={ArticleNavigator} onClick={() => click()}>
          {title}
        </Title>
        <Subtitle articleposition={ArticleNavigator}>{name}</Subtitle>
        <Description articleposition={ArticleNavigator}>
          {description}
        </Description>
      </NavInfoContainer>
      <NavControls>
        {showBackArrow ? (
          <button
            onClick={() => navigate(previousPath)}
            title="Navigate back to the homepage"
            aria-label="Navigate back to the homepage"
          >
            <Icons.Ex fill={fill} />
          </button>
        ) : null}
        {menuLinks &&
          menuLinks.map(item =>
            useMemo(() => (
              <NavLink
                key={item.title}
                fade
                to={`/${item.slug}`}
                articleposition={ArticleNavigator}
              >
                {item.title}
              </NavLink>
            ))
          )}
      </NavControls>
      <FadeArticleAnimation articleposition={ArticleNavigator}>
        <NavSocialContainer>
          <SocialLinks links={social} />
        </NavSocialContainer>
      </FadeArticleAnimation>
      <ArticleViewer articleposition={ArticleNavigator} isDark={isDark}>
        <Scrollbar ref={scrollRef}>
          <ArticlesHolder>
            {allArticles.edges
              .map(item =>
                useMemo(() => (
                  <AniLink
                    key={item.node.id}
                    to={item.node.slug}
                    articleposition={ArticleNavigator}
                  >
                    <Image fluid={item.node.hero.childImageSharp.fluid} />
                  </AniLink>
                ))
              )
              .reverse()}
          </ArticlesHolder>
        </Scrollbar>
      </ArticleViewer>
    </NavContainer>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    navigatorScroll: state.navigatorScroll,
    isWideScreen: state.isWideScreen,
    categoryFilter: state.categoryFilter,
  }
}

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setScrollToTop,
  setFontSizeIncrease,
  setCategoryFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeader)

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`

const NavContainer = styled.div`
  position: relative;
  right: 0;
  width: 100%;
  margin: 20px 0;
  padding: 0 40px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    right: 0px;
    background: ${p => p.theme.colors.secondary};
  }
`

const NavInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h1`
  height: 80%;
  font-weight: 300;
  font-size: ${p => (p.articleposition ? '22px' : '28px')};
  margin: 5px auto;
  color: ${p => p.theme.colors.primary};
  transition: 0.3s ease-in-out;
  text-align: center;
  transform: ${p =>
    p.articleposition ? `translateY(-55px) translateX(20px)` : `translateY(1)`};
`

const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 16px;
  margin: auto;
  width: ${p => (p.articleposition ? '160px' : '80px')};
  min-height: 50px;
  color: ${p => p.theme.colors.primary};
  transition: 0.3s ease-in-out;
  text-align: center;
  transform: ${p =>
    p.articleposition
      ? `translateY(-55px) translateX(20px)`
      : `translateY(1px) translateX(1px)`};
`

const Description = styled.h3`
  font-weight: 400;
  font-size: 15px;
  margin: 20px auto;
  color: ${p => p.theme.colors.accent};
  transition: 0.3s ease-in-out;
  text-align: center;
`

const NavSocialContainer = styled.div`
  position: relative;
  max-height: 300px;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
`

const LogoLink = styled(AniLink)<{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  margin: auto;
  transition: 0.5s ease-in-out;
  transform: ${p =>
    p.articleposition ? 'translateX(-90px)' : 'translateX(1px)'};
  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    ${BackArrowIconContainer} {
      transform: translateX(-3px);
    }
  }
`

const NavControls = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`

const NavLink = styled(props => <AniLink {...props} />)`
  color: ${p => p.theme.colors.accent};
  margin: 10px auto;
  font-size: 18px;
  text-transform: Capitalize;
  opacity: ${p => (p.articleposition === 'article' ? 0 : 1)};
  transition: 0.4s ease-in-out;
  &:hover {
    color: ${p => p.theme.colors.hover};
  }
`

const ToolTip = styled.div<{ isDark: boolean; hasCopied: boolean }>`
  position: absolute;
  padding: 4px 13px;
  background: ${p => (p.isDark ? '#000' : 'rgba(0,0,0,0.1)')};
  color: ${p => (p.isDark ? '#fff' : '#000')};
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: ${p => (p.hasCopied ? 1 : 0)};
  transform: ${p => (p.hasCopied ? 'translateY(-3px)' : 'none')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${p => (p.isDark ? '#000' : 'rgba(0,0,0,0.1)')};
  }
`

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`

const ArticlesHolder = styled.div`
  display: grid;
  width: 250px;
  grid-template-rows: 260px;
  grid-row-gap: 10px;
  margin: auto 5px auto 20px;
  padding: 10px 0px 150px 0px;
`

const ArticleViewer = styled.aside`
  position: absolute;
  display: flex;
  align-items: center;
  top: 100px;
  width: 300px;
  margin: 0 10px 0px -5px;
  padding: 10px 0;
  transition: 0.9s ease-in-out;
  background: ${p => (p.isDark ? '#000' : '#fafafa')};
  transform: ${p =>
    p.articleposition ? `translateY(1px)` : `translateY(100vh)`};
  &::before {
    content: '';
    position: absolute;
    width: 83%;
    border-top: 1px ${p => (p.isDark ? 'rgb(250, 250, 250)' : '#eeeeee')} solid;
    height: 40px;
    top: 0;
    background: ${p => (p.isDark ? '#000' : '#fafafa')};
    margin: -15px 20px;
  }
`

const FadeArticleAnimation = styled.div`
  opacity: ${p => (p.articleposition === 'article' ? 0 : 1)};
  transition: 0.4s ease-in-out;
`
