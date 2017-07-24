/**
 * 文件说明： webpack 基础配置
 * Created by jufei on 2017/03/20.
 */
let path = require('path');
let webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    colors = require('colors');

// 彩色命令行工具
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

let node_modules = path.resolve(__dirname, 'node_modules');
let pathToReact = path.resolve(node_modules, 'react/react');
let pathToReactDOM = path.resolve(node_modules, 'react-dom/index');
let HappyPack = require('happypack'),
    os = require('os'),
    happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});


module.exports = {
  // devtool: 'source-map',
  entry: [
    // "babel-polyfill",
    './src/index.js',
  ],
  output: {
    path: path.resolve('../public/dist'),
    filename: 'bundle.[hash:8].js',
    publicPath: '/dist/',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname,'../node_modules')]
  },
  module: {
    noParse: [pathToReact, pathToReactDOM],
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'HappyPack/loader',
          query: {
            id: 'jsHappy'
          }
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: new ExtractTextPlugin('/dist/[name].css').extract(['style-loader', 'css-loader', 'postcss-loader'])
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {

            loader: 'postcss-loader'
          }, {
            loader: 'less-loader',
          }]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: 'modules&localIdentName=[name]-[local]-[hash:base64:5]'
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png)|(jpg)|svg|jpeg|eot|woff|ttf|gif$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 50000
          }
        },
      },
    ]
  },
  plugins: [
      // html 插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src', './template/index.tpl'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true
      },
      inject: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[hash:8].js',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
      }
    }),
    new ExtractTextPlugin('/dist/[name].css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [precss, autoprefixer];
        }
      }
    }),
    new HappyPack({
      id: 'jsHappy',
      cache: true,
      threadPool: happyThreadPool,
      loaders: [{
        path: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0'],
          plugins: [
            ['import', {
              libraryName: 'antd',
              style: "css"
            }]
          ],
        },
      }]
    }),
  ]
};


console.log('webpack start'.info);
