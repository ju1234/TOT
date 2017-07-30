/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';
import axios from 'axios';
import {message, Pagination,Spin} from 'antd';
//========================================================
import TodoBar from '../TodoBar';
// ========================================================
import API from 'root/API';
import './todo-list.less';

export default class TodoList extends Component {
  state = {
    todoList: [1, 2, 3, 4],
    page: {
      total: 0,
      size: 10,
      index: 1
    },
    loading: true
  };


  componentWillMount() {
    this.getList()
  }

  // =============================获取列表数据=============================
  getList = () => {
    this.setState({
      loading: true
    });
    const {page} = this.state;
    axios.get(API.GET_TODO_LIST, {
      params: {
        done: 0,
        size: page.size,
        index: page.index
      }
    }).then(res => {
      this.setState({
        todoList: res.data.data.list,
        page: res.data.data.page,
        loading: false
      })
    }).catch(err => {
      message.error('获取数据失败，请刷新网页')
    })
  };


  pageChange = (page) => {
    this.setState({
      page: {
        ...this.state.page,
        index: page
      }
    },this.getList)
  };

  render() {
    const {page, todoList,loading} = this.state;


    return (
      <div className="todo-list">
        {
          loading ? <Spin/> : (
            <div>
              {
                todoList.map(todo => (
                  <TodoBar key={todo.id} info={todo}/>
                ))
              }
              <Pagination
                current={page.index}
                total={page.total}
                pageSize={page.size}
                onChange={this.pageChange}
              />
            </div>
          )
        }
      </div>
    )
  }
}
