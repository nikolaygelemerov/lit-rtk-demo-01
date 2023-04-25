/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// Resolves:
const alias = {
  '@assets': path.resolve(__dirname, 'src', 'assets'),
  '@components': path.resolve(__dirname, 'src', 'components'),
  '@constants': path.resolve(__dirname, 'src', 'constants'),
  '@services': path.resolve(__dirname, 'src', 'services'),
  '@store': path.resolve(__dirname, 'src', 'store'),
  '@types': path.resolve(__dirname, 'src', 'types')
};

const extensions = ['.ts', '.js'];

const tsRule = {
  exclude: /node_modules/,
  test: /\.ts$/,
  use: {
    loader: 'babel-loader'
  }
};

const devServer = {
  client: {
    logging: 'error',
    overlay: true
  },
  compress: true,
  historyApiFallback: {
    index: 'http://localhost:8080'
  },
  hot: true,
  open: true
};

module.exports = {
  alias,
  devServer,
  extensions,
  tsRule
};
