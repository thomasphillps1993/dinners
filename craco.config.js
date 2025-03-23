const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add resolve extensions for different file types
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
        fallback: {
          ...webpackConfig.resolve.fallback,
          path: require.resolve('path-browserify'),
          os: require.resolve('os-browserify/browser'),
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          process: require.resolve('process/browser.js'),  // Ensure 'process' is resolved to 'process/browser.js'
          vm: require.resolve('vm-browserify'),
          util: require.resolve('util/'),
          url: require.resolve('url/'),
          assert: require.resolve('assert/'),
        },
      };

      // Add ProvidePlugin to ensure 'process' is available globally
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser.js',  // Specify the path for 'process' polyfill
        })
      );

      return webpackConfig;
    },
  },
};
