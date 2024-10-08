<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Starter for creating a Gatsby Theme workspace
</h1>

```shell
gatsby new my-theme https://github.com/gatsbyjs/gatsby-spaceout-theme-workspace
cd my-theme
yarn workspace spaceout develop
```

## Layout

```shell
.
├── README.md
├── gatsby-theme-spaceout
│   ├── README.md
│   ├── gatsby-config.js
│   ├── index.js
│   └── package.json
├── spaceout
│   ├── README.md
│   ├── gatsby-config.js
│   ├── package.json
│   └── src
├── package.json
└── yarn.lock

3 directories, 10 files
```

### `gatsby-theme-spaceout`

This directory is the theme package itself. You should rename this at
some point to be `gatsby-theme-{my-theme-name}`. Also change the
`package.json` name field and the corresponding dependency in the
spaceout directory's `package.json`/`gatsby-config.js` to match the chosen name.

- `gatsby-theme-spaceout/`
  - `gatsby-config.js`: An empty gatsby-config that you can use as a starting point for building functionality into your theme.
  - `index.js`: Since themes also function as plugins, this is an empty file that
    gatsby needs to use this theme as a plugin.
  - `package.json`: The dependencies that your theme will pull in when people install it. `gatsby` should be a `peerDependency`.

### `spaceout`

This is an spaceout usage of your theme. It should look the same as the
site of someone who installed and used your theme from npm.

- `spaceout/`
  - `gatsby-config.js`: Specifies which theme to use and any other one-off config a site might need.
  - `src/`: Source code such as one-off pages or components that might live in
    a user's site.

You can run the spaceout with:

```shell
yarn workspace spaceout develop
```
