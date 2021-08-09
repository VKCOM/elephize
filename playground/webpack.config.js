module.exports = {
  devtool: 'inline-source-map',
  entry: './playground.ts',
  mode: 'production',
  output: {
    filename: './www/playground.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'fs': 'memfs',
    },
    fallback: {
      'process': require.resolve('process/browser'),
      'path': require.resolve('path-browserify'),
      'stream': require.resolve('stream-browserify'),
    },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};
