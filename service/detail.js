/**
 * Created by jufei on 2017/7/31.
 * 获取todo详情
 */

const mysql = require('../mysql'),
  tableName = require('../mysql/tableName');


module.exports = function (app) {
  app.get('/api/todo/:id',function (req,res,next) {
    const id = req.params.id;
    console.log(req.params.id)
    mysql(`SELECT * FROM ${tableName.TODO_LIST} WHERE id=${id};`)
      .then( data => {
        res.json({
          code: 200,
          data: data[0],
          message: 'ok'
        })
      }).catch( err => {
        console.log(err)
      res.json({
        code: 500,
        data: {},
        message: 'something err'
      })
    })
  })
};
