const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  devtool: false,
  entry: './playground.ts',
  mode: 'development',
  output: {
    filename: 'playground.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '##platform-dependent-parts': __dirname + '/../src/ts2php/browser.specific.ts',
      '##playground': __dirname + '/../src/playground.ts',
    },
    fallback: {
      'fs': require.resolve('memfs'),
      'process': require.resolve('process/browser'),
      'path': require.resolve('path-browserify'),
      'crypto': require.resolve('crypto-browserify'),
      'buffer': require.resolve('buffer/'),
      'assert': require.resolve('assert/'),
      'url': require.resolve('url'),
      'util': require.resolve('util/'),
      'perf_hooks': require.resolve('perf_hooks'),
      'stream': require.resolve('stream-browserify'),
    },
  },
  plugins: [
    new ProgressBarPlugin(),
    new DefinePlugin({
      'process.env.NODE_DEBUG': false,
      'process.version': '"1"',
      'process.platform': '"linux"',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [
          __dirname + '/../demo/**/*',
          __dirname + '/../dist/**/*',
          __dirname + '/../src/__tests__/watchSpecimens.~/**/*',
          __dirname + '/../src/__tests__/watchSpecimens___/**/*',
          __dirname + '/../src/__tests__/watchSpecimens/**/*',
          __dirname + '/../src/__tests__/specimens/**/*',
          __dirname + '/../node_modules/**/*',
          __dirname + '/node_modules/**/*',
        ],
      },
    ],
  },
};
