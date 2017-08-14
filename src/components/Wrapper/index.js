/**
 * Created by jufei on 2017/7/24.
 */
import React, {Component} from 'react';
import {Card, Tabs} from 'antd';
import lazyLoad from 'root/utils/lazyLoad'
//========================================================================
const TodoList = lazyLoad(require('bundle-loader?lazy&name=TodoList!../TodoList'));
const TodoCreate = lazyLoad(require('bundle-loader?lazy&name=TodoCreate!../TodoCreate'));
const TodoDone = lazyLoad(require('bundle-loader?lazy&name=TodoDone!../TodoDone'));
//========================================================================
import './wrapper.less';



const TabPane = Tabs.TabPane;
const param = process.env.NODE_ENV === 'development' ? '' : '/todoList';


export default class App extends Component {

  state = {
    activeKey: '1',
    listRefresh: false,
    doneListRefresh: false
  };

  componentWillMount() {
    this.setActiveKey()
  }

  componentDidMount() {
  }

  // 设置active key
  setActiveKey = () => {
    const pathname = location.pathname;
    if (pathname == `${param}/` || pathname == '/list') {
      this.setState({
        activeKey: '1'
      });
    } else if (pathname == `${param}/new`) {
      this.setState({
        activeKey: '2'
      });
    } else if (pathname == `${param}/edit`) {
      this.setState({
        activeKey: '4'
      });
    } else if (pathname == `${param}/done`) {
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

    if (tabKey == 1) history.pushState({}, '', `${param}/`);
    else if (tabKey == 2) history.pushState({}, '', `${param}/new`);
    else if (tabKey == 3) history.pushState({}, '', `${param}/done`);
    else if (tabKey == 4) history.pushState({}, '', `${param}/edit`)
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
