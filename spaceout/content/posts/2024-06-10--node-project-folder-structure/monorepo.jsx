export const monorepo = {
  name: 'monorepo',
  children: [
    {
      name: '.vscode',
      children: [{ name: 'settings.json' }],
    },
    {
      name: '.github',
      children: [
        {
          name: 'workflows',
          children: [
            { name: 'pre-merge.yml' },
            { name: 'production.yml' },
            { name: 'stage.yml' },
            { name: 'dev.yml' },
          ],
        },
        { name: 'dependobot.yml' },
      ],
    },
    {
      name: 'docs',
      children: [
        { name: 'Architecture.md' },
        { name: 'StyleGuide.md' },
        { name: 'Deploy.md' },
        { name: 'Debug.md' },
      ],
    },
    {
      name: 'e2e',
      children: [{ name: 'core.test.ts' }, { name: 'app.test.ts' }],
    },
    {
      name: 'src',
      children: [
        {
          name: 'client',
          children: [
            { name: 'app', children: [{ name: 'index.tsx' }] },
            { name: 'index.tsx' },
            { name: 'styles.css' },
          ],
        },
        {
          name: 'server',
          children: [
            { name: 'routes', children: [{ name: 'index.ts' }] },
            { name: 'index.ts' },
          ],
        },
        {
          name: 'shared',
          children: [{ name: 'index.js' }, { name: 'styles.css' }],
        },
      ],
    },
    {
      name: 'webpack',
      children: [{ name: 'webpack.client.js' }, { name: 'webpack.server.js' }],
    },
    {
      name: '.env',
    },
    {
      name: '.gitignore',
    },
    {
      name: '.npmrc',
    },
    {
      name: '.nvmrc',
    },
    {
      name: 'package.json',
    },
    {
      name: 'package-lock.json',
    },
    {
      name: 'playwright.config.json',
    },
    {
      name: 'jest.config.json',
    },
    {
      name: 'tsconfig.json',
    },
    {
      name: '.eslint',
    },
    {
      name: '.prettier',
    },
    {
      name: 'README.md',
    },
  ],
};

export const monorepoSrc = monorepo.children.find(
  (child) => child.name === 'src',
);
