import { Theme } from 'theme-ui';

export type Tags = Theme['styles']['pre'];

const tags: Tags = {
  variant: `prism`,
  fontFamily: `"Operator Mono", monospace`,
  tabSize: 4,
  hyphens: `none`,
  color: `white`,
  bg: `prism.background`,
  overflow: `auto`,
  borderRadius: 10,
  p: 3,
};

export default tags;
