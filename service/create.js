/**
 * Created by jufei on 2017/7/30.
 */

const mysql = require('../mysql');

module.exports = function (app) {

  // 新建todo
  app.post('/api/todo/create', function (req, res, next) {
    mysql(createSqlFactory(req.body))
      .then((data,fields) => {
        res.json({
          code: 200,
          data: 'ok',
          message: 'success create'
        })
      }).catch(err => {
        console.log(err)
      res.json({
        code: 500,
        data: 'something err',
        message: err
      })
    })
  })
};


function createSqlFactory(data) {
  let keys = Object.keys(data),
    values = [];

  keys.map((item, index) => {
    if (typeof data[item] === 'string') {
      values.push(`'${data[item]}'`)
    } else {
      values.push(data[item])
    }
  });

  return `insert into list (${keys.join(',')}) values (${values.join(',')});`
}
