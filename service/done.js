/**
 * Created by jufei on 2017/7/31.
 * 标记完成
 */


const mysql = require('../mysql'),
  moment = require('moment');


module.exports = function (app) {
  app.put('/api/todo/done/:id',function (req,res,next) {
    const id = req.params.id;
    mysql(`update list set done=1,doneTime=now() where id=${id};`)
      .then( data => {
        res.json({
          code: 200,
          data: 'ok',
          message: 'ok'
        })
      }).catch( err => {
        console.log(err)
        res.json({
          code: 500,
          data: 'err',
          message: '未知错误，请稍后再试'
        })
    })
  })
};
