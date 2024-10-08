interface Theme {
  colorModeTransition?: string;
  colors: {
    articleText?: string;
  };
  fonts: {
    serif?: string;
  };
}
import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Blockquote = styled.blockquote<{ theme: Theme }>`
  transition: ${(p) => p.theme.colorModeTransition};
  margin: 15px auto 50px;
  color: ${(p) => p.theme.colors.articleText};
  font-family: ${(p) => p.theme.fonts.serif};
  font-style: italic;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${(p) => p.theme.fonts.serif};
    max-width: 880px !important;
    padding-right: 100px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 20px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      padding: 0 100px;
    `};

    ${mediaqueries.phablet`
      padding: 0 20px 0 40px;
    `};
  }
`;

export default Blockquote;
