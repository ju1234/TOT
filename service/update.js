/**
 * Created by jufei on 2017/7/31.
 */

const mysql = require('../mysql');



module.exports = function (app) {
  app.put('/api/todo/edit/:id',function (req,res,next) {
    const id = req.params.id;
    const data = req.body;


    mysql(`update list set title='${data.title}',instancy=${data.instancy} where id=${id};`)
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
          message: '请稍后再试'
        })
    })
    console.log('data',data)
    console.log('id',id)
  })
};
