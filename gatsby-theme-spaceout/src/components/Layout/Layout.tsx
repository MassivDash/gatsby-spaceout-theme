import React, { useEffect, memo, useRef } from 'react'
import { Global } from '@emotion/core'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'
import mediaqueries from '@styles/media'
import { withPrefix, graphql, useStaticQuery } from 'gatsby'
import Scrollbar from '@components/Scroller'
import NavigationFooter from '@components/Navigation/Navigation.Footer'
import NavigationHeader from '@components/Navigation/Navigation.Header'
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context'

import { globalStyles } from '@styles'

import { setnavigatorposition, setNavigatorShape } from '../../state/createStore'

interface LayoutProps {
  children: React.ReactChild
  location: any
  setnavigatorposition: Function
  setNavigatorShape: Function
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess wimport { Transition } from "react-transition-group";
import { TweenMax } from "gsap/all";e need to create our Desktop and Mobile experiences.
 */

const siteQuery = graphql`
  {
    allSite: allSite {
      edges {
        node {
          siteMetadata {
            menuLinks {
              title
              slug
            }
          }
        }
      }
    }
  }
`

function Layout({ children, location, setnavigatorposition, setNavigatorShape }: LayoutProps) {
  const [colorMode] = useColorMode()
  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  const { allSite } = useStaticQuery(siteQuery)

  const scrollRef = useRef(null)
  const isHomepage = location.pathname === withPrefix('/')
  const isMenuItem = allSite.edges[0].node.siteMetadata.menuLinks.some(
    item => `/${item.slug}` === location.pathname
  )

  useEffect(() => {
    scrollRef.current.scrollToTop()
    if (isMenuItem) {
      setnavigatorposition('menu')
    } else if (isHomepage) {
      setnavigatorposition('main')
      setNavigatorShape('hidden')
    } else {
      setnavigatorposition('article')
      setNavigatorShape('visible')
    }
  }, [location])

  

  

  return (
    <ArticlesContextProvider>
      <Container >
        <NavigationHeader />
        <Global styles={globalStyles} />
        <Infoscreen>
          <Scrollbar sideMenu={false} ref={scrollRef}>{children}</Scrollbar>
        </Infoscreen>

        <NavigationFooter ScrollToTop={() => scrollRef.current.scrollToTop()} />
      </Container>
    </ArticlesContextProvider>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorposition: state.navigatorposition,
  }
}

const mapDispatchToProps = {
  setnavigatorposition,
  setNavigatorShape
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Layout))

const Container = styled.div`
  position: fixed;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  
    ${mediaqueries.desktop_up`
    grid-template-columns: 300px 1fr 60px;
  `}
`

const Infoscreen = styled.div`
  background: ${p => p.theme.colors.background};
  transition: 0.25s var(--ease-in-out-quad),color 0.25s var(--ease-in-out-quad);
  padding-top: 10px;
`
