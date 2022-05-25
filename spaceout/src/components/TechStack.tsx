import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TechIcons } from 'gatsby-theme-spaceout/src/sections/articles/Articles.List';

const stack = [
  'ReactIcon',
  'JS',
  'Css',
  'Express',
  'HandleBars',
  'Gatsby',
  'Svelte',
  'Nextjs',
  'TS',
  'Tailwind',
  'Ghostjs',
  'Apollo',
  'Wordpress',
  'MySQL',
  'Postgre',
  'Mongo',
  'Docker',
  'Aws',
  'Azure',
  'Netlify',
  'Heroku',
  'Nodejs',
  'Rust',
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
  grid-template-columns: repeat(4, 1fr);
  @media (min-width: 1024px) {
    grid-template-columns: repeat(10, 1fr);
  }
`;

export default TechStack;
