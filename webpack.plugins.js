const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isMocked = process.env.NODE_ENV !== 'production' && process.env.MOCK_LCU === 'true';

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [{ from: path.resolve(__dirname, 'assets'), to: 'main/assets' }],
  }),
  new webpack.DefinePlugin({
    MOCK_LCU: JSON.stringify(isMocked),
  }),
];
