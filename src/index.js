/**
 * Created by jufei on 2017/6/12.
 *
 * 入口文件
 */
import React,{Component} from 'react';
import {render} from 'react-dom';


class Demo extends Component{
  render(){
    return (
      <h1>hello world</h1>
    )
  }
}



render(<Demo/>,document.getElementById('root'));
