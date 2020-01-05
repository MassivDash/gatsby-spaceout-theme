import styled from '@emotion/styled'
import mediaqueries from '@styles/media'

const Paragraph = styled.p`
  line-height: 1.756;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition}, 0.25s var(--ease-in-out-quad);
  margin: 0 auto 35px;
  width: 100%;
  max-width: 940px;

  b {
    font-weight: 800;
  }

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 0 auto 25px;
  `};

  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
`

export default Paragraph
