import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';
import Icons from '@icons';
import { useColorMode } from 'theme-ui';
import screenfull from 'screenfull';
import { connect } from 'react-redux';
import { setFontSizeIncrease } from '../../state/createStore';
import { GridLayoutContext } from '../../sections/articles/Articles.List.Context';
import PostSearchbar from '../PostSearchbar/PostSearchbar';
import { Theme } from 'src/gatsby-plugin-theme-ui';

interface Props {
  navigatorPosition: 'main' | 'article';
  navigatorShape: 'hidden' | 'visible';
  navigatorScroll: false | number;
  isWideScreen: boolean;
  categoryFilter: 'Post' | 'Project';
  fontSizeIncrease: number;
  mobileControlsOpen: boolean;
  setFontSizeIncrease: () => void;
  ScrollToTop: () => void;
}

const Footer: React.FC<Props> = ({ ...props }) => {
  const {
    gridLayout = 'tiles',
    hasSetGridLayout,
    setGridLayout,
  } = useContext(GridLayoutContext);

  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  return (
    <ActionsBar mobileControlsOpen={props.mobileControlsOpen}>
      <ActionBarDivider>
        <PostSearchbar />
        <DarkModeToggle />
        <GridButton
          onClick={() => setGridLayout('tiles')}
          active={tilesIsActive}
          data-a11y="false"
          title="Show articles in Tile grid"
          aria-label="Show articles in Tile grid"
          {...props}
        >
          <Icons.Tiles fill="currentColor" />
        </GridButton>
        <GridButton
          onClick={() => setGridLayout('rows')}
          active={!tilesIsActive}
          data-a11y="false"
          title="Show articles in Row grid"
          aria-label="Show articles in Row grid"
          {...props}
        >
          <Icons.Rows fill="currentColor" />
        </GridButton>
      </ActionBarDivider>
      <ActionBarDivider>
        <GoToTop {...props} />
        <ToggleFont {...props} />
        <FullScreenToggle />
      </ActionBarDivider>
    </ActionsBar>
  );
};

const mapStateToProps = (state) => {
  return {
    navigatorPosition: state.navigatorPosition,
    navigatorShape: state.navigatorShape,
    navigatorScroll: state.navigatorScroll,
    isWideScreen: state.isWideScreen,
    categoryFilter: state.categoryFilter,
    fontSizeIncrease: state.fontSizeIncrease,
    mobileControlsOpen: state.mobileControlsOpen,
  };
};

const mapDispatchToProps = {
  setFontSizeIncrease,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

function FullScreenToggle() {
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [colorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const fill = isDark ? '#fff' : '#000';

  useEffect(() => {
    screenfull.isEnabled &&
      screenfull.on('change', () => {
        setFullScreen(!fullscreen);
      });
  });

  function fullscreenToogle() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }

  return (
    <>
      {screenfull.isEnabled && (
        <IconWrapper
          isDark={isDark}
          onClick={fullscreenToogle}
          data-a11y="false"
          aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {fullscreen ? (
            <Icons.FullScreenExit fill={fill} width={32} height={32} />
          ) : (
            <Icons.FullScreenEnter fill={fill} width={32} height={32} />
          )}
        </IconWrapper>
      )}
    </>
  );
}

function DarkModeToggle() {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;

  function toggleColorMode(event) {
    event.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={toggleColorMode}
      data-a11y="false"
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
}

function ToggleFont({
  fontSizeIncrease,
  setFontSizeIncrease,
  navigatorPosition,
}) {
  const [colorMode] = useColorMode();
  const [text, setText] = useState<string>('100%');
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const isDark = colorMode === `dark`;
  const fill = isDark ? '#fff' : '#000';
  function switchThroughFontSizes() {
    if (fontSizeIncrease === 1) {
      setFontSizeIncrease(1.5);
      setText('150%');
    }
    if (fontSizeIncrease === 1.5) {
      setFontSizeIncrease(2);
      setText('200%');
    }
    if (fontSizeIncrease === 2) {
      setFontSizeIncrease(1);
      setText('100%');
    }
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 1000);
  }

  return (
    <FadeArticleAnimationFont navigatorPosition={navigatorPosition}>
      <IconWrapper
        isDark={isDark}
        onClick={() => switchThroughFontSizes()}
        data-a11y="false"
        aria-label="Increase font size"
        title="Increase font size"
      >
        <Icons.FontSetter fill={fill} />
        <ToolTip isDark={isDark} hasCopied={hasCopied}>
          {text}
        </ToolTip>
      </IconWrapper>
    </FadeArticleAnimationFont>
  );
}

function GoToTop({ ScrollToTop, navigatorPosition }) {
  const [colorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const fill = isDark ? '#fff' : '#000';
  function scrolltoTop() {
    ScrollToTop();
  }

  return (
    <FadeArticleAnimationArrow navigatorPosition={navigatorPosition}>
      <IconWrapper
        isDark={isDark}
        onClick={() => scrolltoTop()}
        data-a11y="false"
        aria-label="Scroll to the top"
        title="Scroll to the top"
      >
        <Icons.ArrowUp fill={fill} />
      </IconWrapper>
    </FadeArticleAnimationArrow>
  );
}

const FadeArticleAnimationFont = styled.div<{ navigatorPosition: string }>`
  opacity: ${(p) => (p.navigatorPosition === 'article' ? 1 : 0)};
  transform: ${(p) =>
    p.navigatorPosition === 'article'
      ? 'scale(1) translateX(1px)'
      : 'scale(0.2) translateX(40px)'};
  transition: 0.5s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
`;

const FadeArticleAnimationArrow = styled.div<{ navigatorPosition: string }>`
  transform: ${(p) =>
    p.navigatorPosition === 'article' ? 'translateY(1px)' : 'translateY(60px)'};
  transition: 0.5s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
`;

const ActionsBar = styled.div<{ mobileControlsOpen: boolean; theme: any }>`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  color: ${(p) => p.theme.colors.grey};

  @media (max-width: 986px) {
    position: fixed;
    right: 0;
    top: 0;
    width: 40px;
    bottom: 50px;
    flex-direction: column;
    padding-bottom: 10px;
    z-index: 1000;
    background: ${(p) => p.theme.colors.background};
    transform: ${(p) =>
      p.mobileControlsOpen ? 'translateX(1px)' : 'translateX(60px)'};
  }
  transition: 0.5s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
`;

const ActionBarDivider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
`;

const IconWrapper = styled.button<{ isDark: boolean; theme: Theme }>`
  opacity: 0.5;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin: 15px auto;

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
    border: 2px solid ${(p) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin: 15px 8px;


    &:hover {
      opacity: 0.5;
    }
  `}
`;

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean; theme: Theme }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: ${(p) => (p.isDark ? '4px' : '2px')} solid
    ${(p) => p.theme.colors.primary};
  background: ${(p) => p.theme.colors.primary};
  transform: scale(${(p) => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${(p) => (p.isDark ? 'visible' : 'hidden')};

  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid ${(p) => p.theme.colors.primary};
    border-radius: 50%;
    transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${(p) => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${(p) => p.theme.colors.primary},
      0 23px 0 ${(p) => p.theme.colors.primary},
      23px 0 0 ${(p) => p.theme.colors.primary},
      -23px 0 0 ${(p) => p.theme.colors.primary},
      15px 15px 0 ${(p) => p.theme.colors.primary},
      -15px 15px 0 ${(p) => p.theme.colors.primary},
      15px -15px 0 ${(p) => p.theme.colors.primary},
      -15px -15px 0 ${(p) => p.theme.colors.primary};
    transform: scale(${(p) => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${(p) => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;

const MoonMask = styled.div<{ isDark: boolean; theme: Theme }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: ${(p) => p.theme.colors.background};
  transform: translate(${(p) => (p.isDark ? '14px, -14px' : '0, 0')});
  opacity: ${(p) => (p.isDark ? 0 : 1)};
  transition: ${(p) => p.theme.colorModeTransition}, transform 0.45s ease;
`;

const ToolTip = styled.div<{ isDark: boolean; hasCopied: boolean }>`
  position: absolute;
  padding: 4px 13px;
  background: ${(p) => (p.isDark ? '#000' : '#fff')};
  color: ${(p) => (p.isDark ? '#fff' : '#000')};
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: ${(p) => (p.hasCopied ? 1 : 0)};
  transform: ${(p) => (p.hasCopied ? 'translateY(-3px)' : 'none')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 99;
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
    border-top: 6px solid ${(p) => (p.isDark ? '#000' : 'rgba(0,0,0,0.1)')};
  }
`;
const GridButton = styled.button<{
  active: boolean;
  theme: Theme;
  navigatorPosition: string;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  margin: auto;
  border-radius: 50%;
  background: transparent;
  transition: 0.45s ease;
  transform: ${(p) =>
    p.navigatorPosition === 'main' ? 'translateX(1px)' : 'translateX(60px)'};
  opacity: ${(p) => (p.navigatorPosition === 'main' ? 1 : 0)};

  &:hover {
    background: ${(p) => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${(p) => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${(p) => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${(p) => p.theme.colors.primary};
    }
  }
`;
