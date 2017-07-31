/**
 * Created by jufei on 2017/7/30.
 */


export default  {
  POST_CREATE_TODO: '/api/todo/create',
  GET_TODO_LIST: '/api/todo/list',
  GET_TODO_DETAIL: id => `/api/todo/${id}`,
  PUT_TODO_DONE: id => `/api/todo/done/${id}`
}
