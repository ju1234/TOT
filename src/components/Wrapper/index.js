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
    activeKey: '1'
  };

  componentWillMount() {
    this.setActiveKey()
  }

  setActiveKey = () => {
    const pathname = location.pathname;
    if (pathname == '/' || pathname == '/list') {
      this.setState({
        activeKey: '1'
      });
    } else if (pathname == '/new') {
      this.setState({
        activeKey: '2'
      });
    } else if (pathname == '/edit') {
      this.setState({
        activeKey: '4'
      });
    } else if (pathname == '/done') {
      this.setState({
        activeKey: '3'
      });
    }
  };

  tabClick = (tabKey) => {
    this.setState({
      activeKey: tabKey.toString()
    });

    if (tabKey == 1) history.pushState({}, '', '/');
    else if (tabKey == 2) history.pushState({}, '', '/new');
    else if (tabKey == 3) history.pushState({}, '', '/done');
    else if (tabKey == 4) history.pushState({}, '', '/edit')
  };


  switchTab = (key) => {
    this.tabClick(key)
  };

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <Card
          className="tabs"
        >
          <Tabs
            defaultActiveKey={this.state.activeKey}
            onTabClick={this.tabClick}
            // key={this.state.activeKey.toString()}
          >
            <TabPane tab="list" key="1">
              <TodoList/>
            </TabPane>
            <TabPane tab="new" key="2">
              <TodoCreate
                switchTab={this.switchTab}
              />
            </TabPane>
            <TabPane tab=" done" key="3">
              <TodoDone/>
            </TabPane>
            <TabPane tab="edit" key="4">
              <TodoEdit/>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}
