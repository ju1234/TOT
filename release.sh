#!/usr/bin/env bash
echo '格式化dist文件夹'

rm -rf ./public/dist

echo '格式化完成'

echo 'webpack 开始打包'

export NODE_ENV=production&& webpack -p --config ./webpack.config/webpack.config.prod.js

echo '打包完成'

host=104.131.137.6
path=:/data/web/todo-list

echo '开始上传'

node cache.manifest.js

scp ./public/dist/index.html root@${host}${path}/public/dist/
scp -r ./mysql ./routes ./package.json ./server.js ./service root@${host}${path}
#scp -r ./service root@${host}${path}

export NODE_ENV=production & node qiniu.config.js

echo '文件上传成功'

#ssh ${host}   << remotessh
#cd /data/web/todo-list
#export NODE_ENV=production &
#forever restart ./server.js
#exit
#remotessh

echo 'server start at port 8080'







#   /usr/local/node-v6.10.0-linux-x64/lib/node_modules/forever/bin/forever

#ssh root@106.14.96.93 cd /web/data/bank-marking-release & forever stop server.js & forever start server.js
