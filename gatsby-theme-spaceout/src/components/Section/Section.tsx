import styled from '@emotion/styled';

const Section = styled.section<{ narrow?: boolean }>`
  margin: auto;
  position: relative;
  margin: 0 15px;
  @media (min-width: 765px) {
    margin: 0 50px;
  }
`;

export default Section;
