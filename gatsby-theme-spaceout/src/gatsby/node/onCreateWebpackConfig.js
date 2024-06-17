const path = require('path');

module.exports = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../../components/'),
        '@icons': path.resolve(__dirname, '../../icons/'),
        '@styles': path.resolve(__dirname, '../../styles/'),
        '@utils': path.resolve(__dirname, '../../utils/'),
        '@types': path.resolve(__dirname, '../../types/'),
        '/pagefind/pagefind.js': path.resolve(__dirname, './pagefindStub.js'),
      },
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  });
};
