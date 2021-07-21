import styled from '@emotion/styled';

const ExternalLink = styled.a`
  text-decoration: underline;
  font-weight: 600;
  transition: background 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);
  color: var(--theme-ui-colors-accent, #27262d);

  &:hover {
    text-decoration: none;
  }
`;

export default ExternalLink;
