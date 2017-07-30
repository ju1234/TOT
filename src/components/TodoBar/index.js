/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';

export default class TodoBar extends Component {
  render() {
    const {info} = this.props;
    return <div>{info.title}</div>
  }
}
