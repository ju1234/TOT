/**
 * Created by jufei on 2017/7/30.
 * 获取todo列表
 */

const mysql = require('../mysql');


/**
 * @param app
 *
 * @param type 0=未完成列表 1=已完成列表
 * @param index 页数
 * @param size  每页多少条数据
 */
module.exports = function (app) {
  app.get('/api/todo/list', function (req, response, next) {

    const params = req.query;

    params.size = params.size ? parseInt(params.size) :  20;
    params.index = params.index ? parseInt(params.index) :  1;


    Promise.all([
      mysql(sqlFactory(params)),
      mysql(`select count(*) as count from list where done=${params.done};`)
    ]).then(res => {
      response.json({
        code: 200,
        data: {
          list: res[0],
          page: {
            total: res[1][0].count,
            size: parseInt(params.size),
            index: parseInt(params.index)
          }
        },
        message: 'ok'
      })
    }).catch(err => {
      console.log(err);
      res.json({
        code: 500,
        data: [],
        message: '未知错误，请稍后重试'
      })
    })
  })
};


function sqlFactory(params) {
  const start = (params.index - 1) * params.size;
  return `select * from list where done=${params.done} ${params.done == 1 ? 'order by doneTime desc' : 'order by done'} limit ${start},${params.size} ;`;
}
