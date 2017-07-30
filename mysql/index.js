/**
 * Created by jufei on 2017/7/24.
 */

const mysql = require('mysql');


const pool = mysql.createPool({
  host: 'localhost',//主机地址
  user: 'root',//用户名
  password: '',//密码
  database: 'todo',//数据库名
  connectionLimit: 10,//连接池最大连接数（默认：10）
  queueLimit: 10,// 连接池没有连接可用时，队列的最大长度（默认： 0）
});

function getConnect(sql) {
  return new Promise((res, rej) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('pool err', err);
        rej(err);
      } else {
        connection.query(sql, (err, data,fields) => {
          if (!err) {
            res(data,fields);
          } else {
            rej(err);
            console.log('query err', err)
          }
        });
        connection.release();
      }
    });
  })
}

module.exports = getConnect;


