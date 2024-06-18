import merge from 'lodash/merge';

import colors, { ThemeColors } from './colors';
import tags, { Tags } from './tags';

import { Theme } from 'theme-ui';

type Breakpoint = [
  (
    | 'phone_small'
    | 'phone'
    | 'phablet'
    | 'tablet'
    | 'desktop'
    | 'desktop_medium'
    | 'desktop_large'
  ),
  number,
];

const breakpoints: Breakpoint[] = [
  ['phone_small', 320],
  ['phone', 376],
  ['phablet', 540],
  ['tablet', 735],
  ['desktop', 1070],
  ['desktop_medium', 1280],
  ['desktop_large', 1440],
];

interface Fonts {
  serif: string;
  sansSerif: string;
  monospace: string;
}

const fonts: Fonts = {
  serif: 'Helvetica',
  sansSerif: `'Open Sans', sans serif`,
  monospace: `"Operator Mono", Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
};

const colorModeTransition =
  'background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad)';

export interface Theme {
  initialColorMode: 'light' | 'dark';
  useCustomProperties: boolean;
  colorModeTransition: string;
  colors: ThemeColors;
  fonts: Fonts;
  breakpoints: Breakpoint[];
  tags: Tags;
}

const theme: Theme = merge({
  initialColorMode: 'light',
  useCustomProperties: true,
  colorModeTransition,
  colors,
  fonts,
  breakpoints,
  tags,
});

export default theme;
