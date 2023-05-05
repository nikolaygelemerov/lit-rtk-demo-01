/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const { alias, devServer, extensions, tsRule } = require('./webpack-helpers');

const { generateEnvKeys } = require('./envKeys');

const devName = 'public/[name]';
const prodName = 'public/[name].[chunkhash]';

module.exports = (env, argv) => {
  console.log('argv.mode: ', argv.mode);
  const isDev = argv.mode === 'development';
  const envKeys = generateEnvKeys(isDev, env);

  return {
    devServer,
    devtool: isDev ? 'eval-source-map' : false, // 'source-map' (disable due to //# sourceMappingURL=app.b5ee5dc21dcc20774627.js.map })();)
    entry: {
      app: './src/index.ts'
    },
    experiments: {
      topLevelAwait: true
    },
    module: {
      rules: [tsRule]
    },
    output: {
      chunkFilename: `${isDev ? devName : prodName}.js`,
      filename: `${isDev ? devName : prodName}.js`,
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({ async: false }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: 'dist'
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html'
      }),
      new webpack.DefinePlugin({
        ENV_MODE: JSON.stringify(argv.mode),
        ...envKeys
      }),
      !isDev && new CompressionPlugin(),
      !isDev && new TerserPlugin()
    ].filter(Boolean),
    resolve: {
      alias,
      extensions
    }
  };
};
