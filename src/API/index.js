/**
 * Created by jufei on 2017/7/30.
 */

const isDeveloping = process.env.NODE_ENV === 'development';
const prefix = isDeveloping ? '' : '/todoList';

export default  {
  POST_CREATE_TODO: `/api/todo/create`,
  GET_TODO_LIST: `${prefix}/api/todo/list`,
  GET_TODO_DETAIL: id => `${prefix}/api/todo/${id}`,
  PUT_TODO_DONE: id => `${prefix}/api/todo/done/${id}`,
  POST_TODO_EDIT: id => `${prefix}/api/todo/edit/${id}`,
}
