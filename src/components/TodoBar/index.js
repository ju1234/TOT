/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';
import moment from 'moment';
import './todo-bar.less';


export default class TodoBar extends Component {

  static propTypes = {
    showModal: React.PropTypes.func.isRequired,
    info: React.PropTypes.object.isRequired
  };

  render() {
    const {info} = this.props;
    const className = info.instancy == 1 ? "todo-bar instancy" : "todo-bar";
    return (
      <li className={className} onClick={this.props.showModal}>
        <p>{info.title}</p>
        <p className="create-time">
          {info.createTime && moment(info.createTime).format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </li>
    )
  }
}
