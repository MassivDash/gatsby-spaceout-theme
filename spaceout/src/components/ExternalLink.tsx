import styled from '@emotion/styled';

const ExternalLink = styled.a`
  text-decoration: underline;
  font-weight: 600;
  color: ${(p: any) => p.theme.colors.accent};
  transition: background 0.25s var(--ease-in-out-quad),
    color 0.25s var(--ease-in-out-quad);

  &:hover {
    text-decoration: none;
  }
`;

export default ExternalLink;
