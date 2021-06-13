import styled from '@emotion/styled';

import mediaqueries from '@styles/media';

const Section = styled.section<{ narrow?: boolean }>`
  margin: 20px 4rem 0 7rem;
  position: relative;

  ${mediaqueries.desktop`
    max-width: 850px;

  `};

  ${(p) =>
    p.narrow
      ? mediaqueries.tablet`
          padding: 0;
          margin: 10px auto;
        `
      : mediaqueries.tablet`
          margin: 0.4rem 0.5rem;
          padding: 0;
          max-width: 567px;
        `}

  ${mediaqueries.phablet`
    max-width: 100%;
    margin: 0 20px;
  `};
`;

export default Section;
