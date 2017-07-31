/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';
import axios from 'axios';
import {message, Pagination,Spin,Modal} from 'antd';
//========================================================
import TodoBar from '../TodoBar';
import TodoEdit from '../TodoEdit';
// ========================================================
import API from 'root/API';
import './todo-list.less';

export default class TodoList extends Component {
  state = {
    todoList: [],
    page: {
      total: 0,
      size: 15,
      index: 1
    },
    loading: true,
    modalId: '',
    modalVisible: false
  };


  componentWillMount() {
    this.getList()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.needRefresh){
      this.getList()
    }
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
    });
    this.props.setListRefresh(false)
  };


  refresh = () => {
    this.getList()
  };


  pageChange = (page) => {
    this.setState({
      page: {
        ...this.state.page,
        index: page
      }
    },this.getList)
  };
  // =============================todoList 操作=============================
  showTodoModal = (id) => {
    this.setState({
      modalVisible: true,
      modalId: id
    })
  };

  hideTodoModal = () => {
    this.setState({
      modalVisible: false,
      modalId: ''
    })
  };

  render() {
    const {page, todoList,loading,modalVisible,modalId} = this.state;


    return (
      <div className="todo-list">
        {
          loading ? <Spin/> : (
            <div>
              {
                todoList.map(todo => (
                  <TodoBar key={todo.id} info={todo} showModal={this.showTodoModal.bind(this,todo.id)}/>
                ))
              }
              <Pagination
                current={page.index}
                total={page.total}
                pageSize={page.size}
                onChange={this.pageChange}
              />
              <TodoEdit
                title="详情"
                visible={modalVisible}
                id={modalId}
                hideTodoModal={this.hideTodoModal}
                refresh={this.refresh}
              />
            </div>
          )
        }
      </div>
    )
  }
}
