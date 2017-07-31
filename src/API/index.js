/**
 * Created by jufei on 2017/7/30.
 */


export default  {
  POST_CREATE_TODO: '/todoList/api/todo/create',
  GET_TODO_LIST: '/todoList/api/todo/list',
  GET_TODO_DETAIL: id => `/todoList/api/todo/${id}`,
  PUT_TODO_DONE: id => `/todoList/api/todo/done/${id}`,
  POST_TODO_EDIT: id => `/todoList/api/todo/edit/${id}`,
}
