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

interface Props {
  theme: any;
  navigatorPosition: any;
  setNavigatorShape: Function;
  navigatorShape: string;
}

interface NavLinksProps {
  theme: any;
  fade: boolean;
  to: string;
  navigatorPosition: any;
}

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

const NavigationHeader: React.FC<Props> = ({ navigatorPosition, setNavigatorShape, navigatorShape, theme }) => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false)
  const [previousPath, setPreviousPath] = useState<string>('/')
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  

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


  const ArticleNavigator = navigatorPosition === 'article' ? true : false

  return (
    <>
    <MobileNavContainer theme={theme}>
    <LogoLink
          fade
          navigatorPosition={ArticleNavigator}
          to={rootPath || basePath}
          data-a11y="false"
          title="Navigate back to the homepage"
          aria-label="Navigate back to the homepage"
          back={showBackArrow ? 'true' : 'false'}
        >
          <Logo fill={fill} />
          <Hidden>Navigate back to the homepage</Hidden>
        </LogoLink>

        <StyledBurger theme={theme} mobileMenuOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
      <div />
      <div />
      <div />
    </StyledBurger>
    </MobileNavContainer>
    <NavContainer theme={theme} isDark={isDark} mobileMenuOpen={mobileMenuOpen}>
      <NavInfoContainer >
        <LogoLink
          fade
          navigatorPosition={ArticleNavigator}
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
        <Title theme={theme} navigatorPosition={ArticleNavigator}>
          {title}
        </Title>
        <Subtitle theme={theme} navigatorPosition={ArticleNavigator}>{name}</Subtitle>
        <Description theme={theme}>
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
              theme={theme}
                key={item.title}
                fade
                to={`/${item.slug}`}
                navigatorPosition={ArticleNavigator}
              >
                {item.title}
              </NavLink>
            ), [item])
          )}
      </NavControls>
      <FadeArticleAnimation isDark={isDark} navigatorPosition={navigatorPosition}>
        <NavSocialContainer>
          <SocialLinks links={social} />
        </NavSocialContainer>
      </FadeArticleAnimation>
      <ArticleViewer theme={theme} navigatorPosition={navigatorPosition} navigatorShape={navigatorShape} isDark={isDark}>
        <ArticlesControls>
              <ArrowControl theme={theme} setNavigatorShape={setNavigatorShape} navigatorShape={navigatorShape}/>
        </ArticlesControls>
        <Scrollbar ref={scrollRef} sideMenu={true} >
          <ArticlesHolder>
            {allArticles.edges
              .map(item =>
                useMemo(() => (
                  <ArticleLink
                    key={item.node.id}
                    to={item.node.slug}
                    navigatorPosition={ArticleNavigator}
                  >
                    <Image fluid={item.node.hero.childImageSharp.fluid} />
                    <ArticleHover theme={theme}>{item.node.title.slice(0,1).toLowerCase()}</ArticleHover>
                  </ArticleLink>
                ),[item])
              )
              .reverse()}
          </ArticlesHolder>
        </Scrollbar>
      </ArticleViewer>
    </NavContainer>
    </>
  )
}


function ArrowControl({ setNavigatorShape, navigatorShape, theme }) {
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const fill = isDark ? '#fff' : '#000'
  let navPosition = "hidden"
  let navText = "Main Menu"
   if(navigatorShape === "hidden"){
    navText = "List of posts"
    navPosition = "visible" 
   } 

  return (
    <FadeArticleAnimationArrow>
      <Description theme={theme}>
        {navText}
      </Description>
      <IconWrapper
      theme={theme}
        navigatorShape={navigatorShape}
        isDark={isDark}
        onClick={() => setNavigatorShape(navPosition)}
        data-a11y="false"
        aria-label="Scroll to the top"
        title="Scroll to the top"
      >
        <Icons.ArrowUp fill={fill} />
      </IconWrapper>
    </FadeArticleAnimationArrow>
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

const MobileNavContainer = styled.div<{theme: any}>`
  display: none;
  ${mediaqueries.tablet`
    display: flex;
    min-height: 50px;
    z-index: 787;
    background: white;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
  `}

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    right: 0px;
    background: rgb(255,255,255);
    background: linear-gradient(3deg, ${p => p.theme.colors.secondary} 0%, ${p => p.theme.colors.primary} 100%);
  }
`

const NavContainer = styled.div<{ isDark: boolean; mobileMenuOpen: boolean; theme: any; }>`
  position: relative;
  right: 0;
  width: 100%;
  margin: 40px 0;
  padding: 0 40px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.9s var(--ease-in-out-quad), background-color 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  
  ${mediaqueries.tablet`
    display: flex;
    min-height: 101vh;
    position: absolute;
    z-index: 787;
    background: white;
    top: 0;
    left: 0;
    padding: 20px;
  `}

  @media (max-width: 1070px) {
        transform: ${p => p.mobileMenuOpen ? 'translate(0px, 0px)' : 'translate(-100vw,0)'}
      }
  

`

const NavInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h1<{ navigatorPosition: any; theme: any; }>`
  height: 80%;
  font-weight: 300;
  font-size: ${p => (p.navigatorPosition ? '22px' : '28px')};
  margin: 5px auto;
  color: ${p => p.theme.colors.primary};
  transition: 0.3s ease-in-out;  
  text-align: center;
  transform: ${p =>
    p.navigatorPosition ? `translateY(-55px) translateX(20px)` : `translateY(1)`};
`

const Subtitle = styled.h2<{ navigatorPosition: any; theme: any; }>`
  font-weight: 400;
  font-size: 16px;
  margin: auto;
  width: ${p => (p.navigatorPosition ? '160px' : '80px')};
  min-height: 50px;
  color: ${p => p.theme.colors.primary};
  transition: 0.3s ease-in-out;
  text-align: center;
  transform: ${p =>
    p.navigatorPosition
      ? `translateY(-55px) translateX(20px)`
      : `translateY(1px) translateX(1px)`};
`

const Description = styled.h3<{theme: any}>`
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

const LogoLink = styled(({ navigatorPosition, ...rest }) => <AniLink {...rest} />)`
  position: relative;
  display: flex;
  align-items: center;
  margin: auto;
  transition: 0.5s ease-in-out;
  transform: ${p =>
    p.navigatorPosition ? 'translateX(-90px)' : 'translateX(1px)'};
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

const NavLink = styled(({navigatorPosition, ...rest}) => <AniLink {...rest} />)`
  color: ${p => p.theme.colors.accent};
  margin: 10px auto;
  font-size: 18px;
  text-transform: Capitalize;
  opacity: ${p => (p.navigatorPosition === 'article' ? 0 : 1)};
  transition: 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad);
  &:hover {
    color: ${p => p.theme.colors.hover};
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

const ArticleViewer = styled.aside<{ isDark: boolean; navigatorPosition: any; navigatorShape: string; theme: any }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 100px;
 
  width: 300px;
  margin: 0 10px 0px -5px;
  padding: 10px 0;
  transition: 0.9s var(--ease-in-out-quad), background-color 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  background: ${p => p.theme.colors.background};
  transform: ${p =>
    p.navigatorPosition !== "main"  ? (p.navigatorShape === 'hidden' ? `translateY(calc(100% - 250px))` : `translateY(1px)`) : `translateY(100vh)`};
  &::before {
    content: '';
    position: absolute;
    width: 83%;
    border-top: 1px ${p => (p.isDark ? 'rgb(250, 250, 250)' : '#eeeeee')} solid;
    height: 1px;
    top: 10px;
    left: 0;
    background: ${p => p.theme.colors.background};
    margin: -15px 20px;
  }
`

const ArticleLink =  styled(({navigatorPosition, ...rest}) => <AniLink {...rest} />)`
  position: relative;
    transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 35px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`

const ArticleHover = styled.div<{theme: any}>`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  top: 0;
  font-size: 100px; 
  color: ${p => p.theme.colors.accent};
  background-color: ${p => p.theme.colors.background};
  transition: 0.44s var(--ease-out-quart);
  &:hover {
    opacity: 1;
  };
`

const ArticlesControls = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: hidden;
  transition: 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad); 
  margin-bottom: 20px;
  `

const FadeArticleAnimation = styled.div<{ isDark: boolean; navigatorPosition: any }>`
  transform: ${p => p.navigatorPosition !== 'main' ? 'translateY(-60px)' : 'translateY(1px)' };
  transition: 0.74s ease-in-out;
`
const FadeArticleAnimationArrow = styled.div`
  transition: 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad);
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`


const IconWrapper = styled.button<{ isDark: boolean; navigatorShape: string; theme: any }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  margin: 15px auto;
  transform: ${p => p.navigatorShape === 'visible' ? 'rotate(180deg)' : 'rotate(0deg)'};

  &:hover {
    opacity: 1;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;


    &:hover {
      opacity: 0.5;
    }
  `}
`

const StyledBurger = styled.button<{ mobileMenuOpen: boolean; theme: any; }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ mobileMenuOpen, theme }) => mobileMenuOpen ? theme.colors.accent : theme.colors.accent};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-of-type {
      transform: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-of-type(2) {
      opacity: ${({ mobileMenuOpen }) => mobileMenuOpen ? '0' : '1'};
      transform: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-of-type(3) {
      transform: ${({ mobileMenuOpen }) => mobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`