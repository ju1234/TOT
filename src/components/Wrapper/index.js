/**
 * Created by jufei on 2017/7/24.
 */
import React, {Component} from 'react';
import {Card, Tabs} from 'antd';
//========================================================================
import TodoList from '../TodoList';
import TodoCreate from '../TodoCreate';
import TodoDone from '../TodoDone';
import TodoEdit from '../TodoEdit';
//========================================================================
import './wrapper.less';


const TabPane = Tabs.TabPane;

export default class App extends Component {

  state = {
    activeKey: '1',
    listRefresh: false,
    doneListRefresh: false
  };

  componentWillMount() {
    this.setActiveKey()
  }

  // 设置active key
  setActiveKey = () => {
    const pathname = location.pathname;
    if (pathname == '/todoList' || pathname == '/list') {
      this.setState({
        activeKey: '1'
      });
    } else if (pathname == '/todoList/new') {
      this.setState({
        activeKey: '2'
      });
    } else if (pathname == '/todoList/edit') {
      this.setState({
        activeKey: '4'
      });
    } else if (pathname == '/todoList/done') {
      this.setState({
        activeKey: '3'
      });
    }
  };

  // 点击tab事件
  tabClick = (tabKey) => {
    this.setState({
      activeKey: tabKey.toString()
    });

    if (tabKey == 1) history.pushState({}, '', '/todoList/');
    else if (tabKey == 2) history.pushState({}, '', '/todoList/new');
    else if (tabKey == 3) history.pushState({}, '', '/todoList/done');
    else if (tabKey == 4) history.pushState({}, '', '/todoList/edit')
  };


  // 切换tab
  switchTab = (key) => {
    this.tabClick(key)
  };

  /**
   * @param value boolean
   */
  setListRefresh = (value) => {
    this.setState({
      listRefresh: value
    })
  };

  /**
   * @param value boolean
   */
  setDoneListRefresh = (value) => {
    this.setState({
      doneListRefresh: value
    })
  };

  render() {
    return (
      <div className="container">
        <Card
          className="tabs"
        >
          <Tabs
            defaultActiveKey={this.state.activeKey}
            onTabClick={this.tabClick}
            activeKey={this.state.activeKey}
          >
            <TabPane tab="list" key="1">
              <TodoList
                needRefresh={this.state.listRefresh}
                setListRefresh={this.setListRefresh}
                setDoneListRefresh={this.setDoneListRefresh}
              />
            </TabPane>
            <TabPane tab="new" key="2">
              <TodoCreate
                switchTab={this.switchTab}
                setListRefresh={this.setListRefresh}
              />
            </TabPane>
            <TabPane tab=" done" key="3">
              <TodoDone
                setDoneListRefresh={this.setDoneListRefresh}
                doneListRefresh={this.state.doneListRefresh}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}
