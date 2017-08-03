/**
 * Created by jufei on 2017/8/1.
 */

const fs = require('fs'),
  path = require('path');


const host = 'http://oty8et70w.bkt.clouddn.com/dist/';


fs.readdir(path.resolve(__dirname, './public/dist'), (err, files) => {
  if (!err) {
    let fileContent = 'CACHE MANIFEST\n' + `# ${new Date().valueOf()}`;
    files.map(file => {
      fileContent += `\n${host + file}`
    });

    fs.writeFile(
      path.resolve(__dirname, './public/dist/cache.manifest'),
      fileContent,
      'utf8',
      function (err, res) {
        if (!err) console.log('write cache.manifest success')
      }
    )
  } else {
    console.log(err)
  }
});
