/**
 * 文件说明： server
 *
 * Created by jufei on 2017/6/12.
 */
const path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  fs = require('fs');

const routes = require('./routes');

app = express();


// development or production
const isDeveloping = process.env.NODE_ENV === 'development';
// listen port
const port = isDeveloping ? 7777 : 9999;

app.use(express.static(path.resolve(__dirname, './public')));

/**
 * 开发模式： 使用webpack hot middleware
 * 生产模式： 直接发送打包好的文件
 */
if (isDeveloping) {
  let config = require('./webpack.config/webpack.config.dev');
  let compiler = webpack(config);
  let devMiddleWare = require('webpack-dev-middleware')(compiler, {
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
  let mfs = devMiddleWare.fileSystem;
  let file = path.join(config.output.path, 'index.html');

  app.get(routes, function (req, res) {
    devMiddleWare.waitUntilValid(function () {
      let html = mfs.readFileSync(file);
      res.end(html)
    });
  })
} else {
  app.get(routes, function (req, res, next) {
    fs.readFile(
      path.resolve(__dirname, './public/dist/index.html'),
      'utf-8',
      function (err, data) {
        if (!err) {
          res.end(data)
        } else {
          console.log(err)
        }
      })
  })
}

/**
 * 服务开启
 */
app.listen(port, function (err) {
  if (!err) {
    console.log(`server start at ${port}`)
  } else {
    console.log('err', err)
  }
});
