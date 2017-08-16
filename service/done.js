/**
 * Created by jufei on 2017/7/31.
 * 标记完成
 */


const mysql = require('../mysql'),
  moment = require('moment'),
  tableName = require('../mysql/tableName');


module.exports = function (app) {
  app.put('/api/todo/done/:id',function (req,res,next) {
    const id = req.params.id;
    mysql(`UPDATE ${tableName.TODO_LIST} SET done=1,doneTime=now() WHERE id=${id};`)
      .then( data => {
        res.json({
          code: 200,
          data: 'ok',
          message: 'ok'
        })
      }).catch( err => {
        console.log(err);
        res.json({
          code: 500,
          data: 'err',
          message: '未知错误，请稍后再试'
        })
    })
  })
};
