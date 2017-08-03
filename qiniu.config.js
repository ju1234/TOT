/**
 * 文件说明： 七牛云 配置
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.31
 */

var qiniu = require('qiniu');

var fs = require('fs');
var path = require('path');



qiniu.conf.ACCESS_KEY = '9USckCAfM4nRrkfRW3WHwCImMD98G4L_HcXd9Rc6';
qiniu.conf.SECRET_KEY = '4weslNZiGfDmAmyYCEjxMzAyql75QcEqsmPCx_WY';


// 七牛云上传方法
function qiniuUpload(key, filePath, bucket = 'todo') {
// 需要上传空间 bucket
// 上传文件名 key
// 需要上传的文件路径 filePath

  // 生成上传token
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
  }

  const token = uptoken(bucket, key);

  return new Promise((res, rej) => {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, filePath, extra, function (err, ret) {
      if (!err) {
        console.log(ret.hash, ret.key, ret.persistentId);
        res();
      } else {
        rej(err);
      }
    });
  })
}

const extnameContainer = ['.jpg', '.js', '.css', '.html', '.htm', '.gif', '.png', '.jpeg','.manifest'];


// 遍历文件夹 上传所有文件
function mapFilesToQiniu(dirPath = path.join(__dirname, 'public')) {
  fs.readdir(dirPath, (err, files) => {
    if (!err) {
      files.map(fileName => {
        if (fs.statSync(path.join(dirPath, fileName)).isDirectory()) {
          mapFilesToQiniu(path.join(dirPath, fileName))
        } else if (extnameContainer.includes(path.extname(fileName))) {
          const filePath = path.join(dirPath + '/' + fileName);
          const key = filePath.split('todo-list/public/')[1];

          // console.log(filePath)
          qiniuUpload(key,filePath)
            .then((res) => {
              console.log(res)
            })
            .catch( err => {
              console.log(err);
          });
        }
      })
    } else {
      console.log(err)
    }
  });
}

mapFilesToQiniu(path.join(__dirname, 'public'));

