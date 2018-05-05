const baseConfig = require('./webpack.config');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = (baseConfig.plugins || []).concat([
  new HtmlWebpackPlugin({
    template: 'templates/index.dev.html',
    alwaysWriteToDisk: true
  }),
  new HtmlWebpackHarddiskPlugin(),
]);

module.exports = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  plugins: plugins,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter'
  }
});