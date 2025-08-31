import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TechIcons } from 'gatsby-theme-spaceout/src/sections/articles/Articles.List';

const stack = [
  'ReactIcon',
  'Astro',
  'Svelte',
  'Nextjs',
  'Express',
  'TS',
  'JS',
  'Css',
  'HandleBars',
  'Tailwind',
  'Gatsby',
  'Apollo',
  'MySQL',
  'Postgre',
  'Mongo',
  'SQL',
  'Docker',
  'Aws',
  'Azure',
  'Nodejs',
  'Rust',
  'C',
  'Actix',
  'Markdown',
  'Npm',
  'Ghostjs',
  'Wordpress',
  'Github2',
  'Linux',
];

const TechStack: FC = () => (
  <StackGrid>
    <TechIcons tech={stack} />{' '}
  </StackGrid>
);

const StackGrid = styled.div`
  display: grid;
  max-width: 1150px;
  grid-gap: 15px;
  margin: 20px auto;
  font-size: 45px;
  grid-template-columns: repeat(4, 1fr);
  @media (min-width: 1024px) {
    grid-template-columns: repeat(10, 1fr);
  }
`;

export default TechStack;
