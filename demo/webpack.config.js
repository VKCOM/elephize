const path = require('path');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  mode: IS_PRODUCTION ? 'production' : 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react', 'cjs',
        (IS_PRODUCTION ? 'react.production.min.js' : 'react.development.js')),
      'react-dom': path.join(__dirname, 'node_modules', 'react-dom', 'cjs',
        (IS_PRODUCTION ? 'react-dom.production.min.js' : 'react-dom.development.js')),
      '#utils': path.resolve(__dirname, 'src/utils/'),
      '#iso_palette': path.resolve(__dirname, 'src/components/iso_palette/'),
    }
  },

  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
};