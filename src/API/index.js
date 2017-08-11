/**
 * Created by jufei on 2017/7/30.
 */

<<<<<<< HEAD
const isDeveloping = process.env.NODE_ENV === 'development';
const prefix = isDeveloping ? '' : '/todoList';

export default  {
  POST_CREATE_TODO: `${prefix}/api/todo/create`,
  GET_TODO_LIST: `${prefix}/api/todo/list`,
  GET_TODO_DETAIL: id => `${prefix}/api/todo/${id}`,
  PUT_TODO_DONE: id => `${prefix}/api/todo/done/${id}`,
  POST_TODO_EDIT: id => `${prefix}/api/todo/edit/${id}`,
=======
console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
const param = process.env.NODE_ENV === 'development' ? '' : '/todoList';

export default  {
  POST_CREATE_TODO: `${param}/api/todo/create`,
  GET_TODO_LIST: `${param}/api/todo/list`,
  GET_TODO_DETAIL: id => `${param}/api/todo/${id}`,
  PUT_TODO_DONE: id => `${param}/api/todo/done/${id}`,
  POST_TODO_EDIT: id => `${param}/api/todo/edit/${id}`,
>>>>>>> develop
}
