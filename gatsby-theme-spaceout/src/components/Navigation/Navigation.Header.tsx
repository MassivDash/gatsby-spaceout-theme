import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, navigate, graphql, useStaticQuery } from "gatsby";
import { useColorMode } from "theme-ui";


import Logo from "@components/Logo";
import SocialLinks from "@components/SocialLinks";
import Icons from "@icons";
import mediaqueries from "@styles/media";

import {
  getWindowDimensions,
  getBreakpointFromTheme,
} from "@utils";

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
              title,
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
  }
`;

function NavigationHeader() {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [previousPath, setPreviousPath] = useState<string>("/");
  const { sitePlugin, allSite } = useStaticQuery(siteQuery);
  const { title, name, social, menuLinks } = allSite.edges[0].node.siteMetadata;

  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#fff" : "#000";
  const { rootPath, basePath } = sitePlugin.pluginOptions;

  useEffect(() => {
    const { width } = getWindowDimensions();
    const phablet = getBreakpointFromTheme("phablet");

    const prev = localStorage.getItem("previousPath");
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
    const isNotPaginated = !location.pathname.includes("/page/");

    setShowBackArrow(
      previousPathWasHomepage && isNotPaginated && width <= phablet,
    );
    setPreviousPath(prev);
  }, []);

  return (
      <NavContainer>
        <NavInfoContainer>
        <LogoLink
          to={rootPath || basePath}
          data-a11y="false"
          title="Navigate back to the homepage"
          aria-label="Navigate back to the homepage"
          back={showBackArrow ? "true" : "false"}
        >
          {showBackArrow && (
            <BackArrowIconContainer>
              <Icons.ChevronLeft fill={fill} />
            </BackArrowIconContainer>
          )}
          <Logo fill={fill} />
          <Hidden>Navigate back to the homepage</Hidden>
        </LogoLink>
        <Title>{title}</Title>
        <Subtitle>{name}</Subtitle>
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
          ) : (
            null
          )}
          {menuLinks && menuLinks.map(item => <NavLink to={`/${item.slug}`}>{item.title}</NavLink>)}

        </NavControls>
        <NavSocialContainer>
          <SocialLinks links={social} />
        </NavSocialContainer>
      </NavContainer>
  );
}

export default NavigationHeader;
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
`;

const NavContainer = styled.div`
  position: relative;
  right: 0;
  width: 100%;
  margin: 20px 0;
  padding: 20px 40px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid ${p => p.theme.colors.horizontalRule};

  ${mediaqueries.desktop_medium`
    padding-top: 5px;
  `};

  @media screen and (max-height: 800px) {
    padding-top: 10px;
  }
`;

const NavInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  `;

const Title = styled.h1`
  font-weight: 300;
  font-size: 28px;
  margin: 20px auto;
  color: ${p => p.theme.colors.primary};
  transition: 0.3s ease-in-out;
  text-align: center;
  `;

const Subtitle = styled.h2`
  font-weight: 400;
  font-size: 18px;
  margin: 20px auto;
  color: ${p => p.theme.colors.primary};
  transition: 0.3s ease-in-out;
  text-align: center;
  `;


const NavSocialContainer = styled.div`
 position: relative;
 max-height: 300px;
 bottom: 0;
 left: 0;
 display: grid;
 grid-template-columns: 1fr 1fr 1fr;
 grid-template-rows: 1fr 1fr 1fr;
 justify-content: space-between;
 align-items: center;
 `;

const LogoLink = styled(Link)<{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  margin: auto;

  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: "";
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
`;

const NavControls = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`;

const NavLink = styled(props => <Link {...props} />)`
color: ${p => p.theme.colors.secondary};
margin: 10px auto;
font-size: 18px;
text-transform: Capitalize;
  &:hover {
    color: ${p => p.theme.colors.hover}
  }
`;

const ToolTip = styled.div<{ isDark: boolean; hasCopied: boolean }>`
  position: absolute;
  padding: 4px 13px;
  background: ${p => (p.isDark ? "#000" : "rgba(0,0,0,0.1)")};
  color: ${p => (p.isDark ? "#fff" : "#000")};
  border-radius: 5px;
  font-size: 14px;
  top: -35px;
  opacity: ${p => (p.hasCopied ? 1 : 0)};
  transform: ${p => (p.hasCopied ? "translateY(-3px)" : "none")};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid ${p => (p.isDark ? "#000" : "rgba(0,0,0,0.1)")};
  }
`;


const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`;
