/**
 * 文件说明： 添加开发模式配置
 *
 * Created by jufei on 2017/03/20.
 */

var baseConfig = require('./webpack.config'),
    path = require('path'),
    webpack = require('webpack'),
    CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin'),
    WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin'),
    hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';


var developingConfig = baseConfig;


developingConfig.entry.unshift(hotMiddlewareScript)

developingConfig.devtool = 'source-map';
developingConfig.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve('node_modules'))
    // ,
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('../static/dist/common-manifest.json')
    // })
);

module.exports = developingConfig;
