import styled from '@emotion/styled'

import mediaqueries from '@styles/media'

const Section = styled.section<{ narrow?: boolean }>`
  margin: 35px 4rem 0 7rem;
  padding: 0 1.8rem;

  ${mediaqueries.desktop`
    max-width: 850px;
  `};

  ${p =>
    p.narrow
      ? mediaqueries.tablet`
          padding: 0 2rem;
          max-width: 527px;
        `
      : mediaqueries.tablet`
          padding: 0 4rem;
          max-width: 567px;
        `}

  ${mediaqueries.phablet`
    max-width: 100%;
  `};
`

export default Section
