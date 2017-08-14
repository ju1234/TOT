/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';
import {Pagination, Spin, Timeline} from 'antd';
import axios from 'axios';
import moment from 'moment';
//================================================================
//================================================================
import API from 'root/API';
import './todo-done.less';


export default class TodoDone extends Component {
  constructor(props) {
    super(props);
    this.doneScroll = null;
  }


  state = {
    loading: true,
    doneList: [],
    page: {
      total: 0,
      size: 10,
      index: 1
    },
  };

  static propTypes = {
    setDoneListRefresh: React.PropTypes.func.isRequired,
    doneListRefresh: React.PropTypes.bool.isRequired
  };

  componentWillMount() {
    this.getList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.doneListRefresh) {
      this.getList()
    }
  }

  componentDidUpdate(){
    this.doneListDom = document.getElementById('done');
    if(this.doneListDom !== null && window.IScroll){
      this.doneScroll = new IScroll(this.doneListDom,{
        mouseWheel: false,
      });
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
        done: 1,
        size: page.size,
        index: page.index
      }
    }).then(res => {
      this.setState({
        doneList: res.data.data.list,
        page: res.data.data.page,
        loading: false
      })
    });

    this.props.setDoneListRefresh(false)


  };

  // =============================分页=============================
  pageChange = (page) => {
    this.setState({
      page: {
        ...this.state.page,
        index: page
      }
    }, this.getList)
  };

  // =============================圆圈颜色=============================
  getColor = (value = '#') => {
    for (let i = 0; i < 6; i++) {
      value += Math.floor(Math.random() * 16).toString(16);
    }
    return value;
  };


  render() {
    const {loading, doneList, page} = this.state;

    return (
      <div className="todo-done">
        {
          loading ? <Spin/> : (
            <div>
              <div id="done">
                <Timeline >
                  {
                    doneList.map(todo => {
                      let color = this.getColor();
                      return (
                        <Timeline.Item
                          key={todo.id.toString()} className="todo-done-bar"
                          color={color}
                        >
                          <p>{todo.title}</p>
                          <p>
                            <span>{todo.createTime && moment(todo.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                            <span>{todo.doneTime != null && moment(todo.doneTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                          </p>
                        </Timeline.Item>
                      )
                    })
                  }
                </Timeline>
              </div>

              <Pagination
                className="pagination"
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
