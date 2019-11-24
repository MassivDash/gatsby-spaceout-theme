import React, { useEffect, useRef } from 'react';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useColorMode } from 'theme-ui';
import Scrollbar from 'react-scrollbars-custom';
import NavigationFooter from '@components/Navigation/Navigation.Footer';
import NavigationHeader from '@components/Navigation/Navigation.Header';
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context';

import { globalStyles } from '@styles';

interface LayoutProps {
  children: React.ReactChild;
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess wimport { Transition } from "react-transition-group";
import { TweenMax } from "gsap/all";e need to create our Desktop and Mobile experiences.
 */
function Layout({ children, location }: LayoutProps) {
  const [colorMode] = useColorMode();
  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);

  


  

  return (
    <ArticlesContextProvider>
      <Container>
      <NavigationHeader />
      
        <Global styles={globalStyles} />
        {children}
        <NavigationFooter />
      </Container>
    </ArticlesContextProvider>
  );
}

export default Layout;

const Container = styled.div`
  position: fixed;
  background: ${p => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-columns: 300px 1fr 60px;
`;

