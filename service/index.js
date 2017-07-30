/**
 * Created by jufei on 2017/7/30.
 */

const createTodo = require('./create'),
  getTodoList = require('./getTodoList');

module.exports = function (app) {
  createTodo(app)

  getTodoList(app)
};
