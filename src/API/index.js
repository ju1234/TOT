/**
 * Created by jufei on 2017/7/30.
 */


const param = process.env.NODE_ENV === 'development' ? '' : '/todoList';

export default  {
  POST_CREATE_TODO: `${param}/api/todo/create`,
  GET_TODO_LIST: `${param}/api/todo/list`,
  GET_TODO_DETAIL: id => `${param}/api/todo/${id}`,
  PUT_TODO_DONE: id => `${param}/api/todo/done/${id}`,
  POST_TODO_EDIT: id => `${param}/api/todo/edit/${id}`,
}
