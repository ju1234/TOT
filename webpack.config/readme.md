# webpack config

## need package
```
{
    "babel-core": "^6.21.0",
    "babel-loader": "^6.2.10",
    "babel-plugin-import": "^1.1.1",
    "babel-polyfill": "^6.23.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "babel-preset-stage-0": "^6.16.0",
    "css-loader": "^0.26.1",
    "file-loader": "^0.10.1",
    "json-loader": "^0.5.4",
    "jsx-loader": "^0.13.2",
    "node-sass": "^4.5.2",
    "sass": "^0.5.0",
    "sass-loader": "^4.1.1",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.8",
    "webpack": "^2.3.2",
    "webpack-dev-middleware": "^1.10.1",
    "webpack-hot-middleware": "^2.17.1",
    "autoprefixer": "^6.7.7",
    "case-sensitive-paths-webpack-plugin": "^1.1.4",
    "extract-text-webpack-plugin": "^2.1.0",
    "happypack": "^3.0.3",
    "html-webpack-plugin": "^2.28.0",
    "less": "^2.7.2",
    "less-loader": "^4.0.2",
    "postcss": "^5.2.16",
    "postcss-loader": "^1.3.3",
    "precss": "^1.4.0",
    "prepack-webpack-plugin": "^1.1.0",
    "react-dev-utils": "^0.5.2"
}
```

## how to use
* development
  * express
```
  var config = require('webpack.config.dev'),
      webpack = require('webpack');
  var compiler = webpack(config);
  devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: '/dist',
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  });
  app.use(devMiddleWare);
  app.use(require('webpack-hot-middleware')(compiler));
  var mfs = devMiddleWare.fileSystem;
  var file = path.join(config.output.path, 'index.html');
  devMiddleWare.waitUntilValid(function () {
    var html = mfs.readFileSync(file);
    res.end(html)
  });

```
* production

find file in /public/dist


## package.json
```
"scripts": {
    "start": "export NODE_ENV=development&& node server.js",
    "build": "export NODE_ENV=production&& webpack --config ./webpack.config/webpack.config.prod.js",
}
```