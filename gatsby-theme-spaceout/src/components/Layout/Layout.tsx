import React, { useEffect, memo, useRef } from 'react';
import { Global } from '@emotion/core';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';
import mediaqueries from '@styles/media';
import { withPrefix, graphql, useStaticQuery } from 'gatsby';
import Scrollbar from '@components/Scroller';
import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import { globalStyles } from '@styles';

import {
  setNavigatorPosition,
  setNavigatorShape,
} from '../../state/createStore';

interface LayoutProps {
  children: React.ReactChild;
  location: any;
  setNavigatorPosition: (string: string) => void;
  setNavigatorShape: (string: string) => void;
  navigatorPosition: string;
}

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
`;

function Layout({
  children,
  location,
  setNavigatorPosition,
  setNavigatorShape,
  navigatorPosition,
}: LayoutProps) {
  const [colorMode] = useColorMode();
  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  const { allSite } = useStaticQuery(siteQuery);

  const scrollRef = useRef(null);
  const isHomepage = location.pathname === withPrefix('/');
  const isMenuItem = allSite.edges[0].node.siteMetadata.menuLinks.some(
    (item) => `/${item.slug}` === location.pathname,
  );

  useEffect(() => {
    async function timeOut(time) {
      setTimeout(() => {
        (scrollRef as any)?.current?.scrollToTop();
      }, time);
    }

    if (isMenuItem) {
      setNavigatorPosition('article');
      setNavigatorShape('hidden');
      timeOut(780);
    } else if (isHomepage) {
      setNavigatorPosition('main');
      setNavigatorShape('hidden');
      timeOut(780);
    } else {
      navigatorPosition === 'article' && timeOut(350);
      navigatorPosition === 'main' && timeOut(780);
      setNavigatorPosition('article');
      setNavigatorShape('visible');
    }
  }, [location]);

  return (
    <ArticlesContextProvider>
      <Container>
        <NavigationHeader />
        <Global styles={globalStyles} />
        <Infoscreen>
          <Scrollbar sideMenu={false} ref={scrollRef}>
            {children}
          </Scrollbar>
        </Infoscreen>
        <NavigationFooter
          ScrollToTop={() => (scrollRef as any).current.scrollToTop()}
        />
      </Container>
    </ArticlesContextProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    navigatorPosition: state.navigatorPosition,
  };
};

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Layout));

const Container = styled.div`
  position: fixed;
  background: ${(p: any) => p.theme.colors.background};
  transition: ${(p: any) => p.theme.colorModeTransition};
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;

  ${mediaqueries.desktop_up`
    grid-template-columns: 300px 1fr 60px;
  `}
`;

const Infoscreen = styled.div`
  background: ${(p: any) => p.theme.colors.background};
  transition: 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  scroll-behavior: smooth;
`;
