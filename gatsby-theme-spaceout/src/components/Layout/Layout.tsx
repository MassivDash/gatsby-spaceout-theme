import React, { useEffect } from 'react';
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
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
function Layout({ children }: LayoutProps) {
  const [colorMode] = useColorMode();

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*');
  }, [colorMode]);


  const isDark = colorMode === "dark";

  return (
    <ArticlesContextProvider>
      <Container>
      <NavigationHeader />
      <Scrollbar 
      
      trackYProps={{
        renderer: props => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} style={{ position: "absolute",
            overflow: "hidden",
            borderRadius: "4px",
            background: isDark ? "rgba(226, 226, 226, 0.2)" : "rgb(226, 226, 226)",
            userSelect: "none",
            width: "4px",
            height: "calc(100% - 20px)",
            top: "10px",
            right: "0px"}} />;
        }
      }}

      >
        <Global styles={globalStyles} />
        {children}
      </Scrollbar>
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
  grid-template-columns: 2fr 9fr 1fr;
`;

const InnerContainer = styled.div`
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  `;
