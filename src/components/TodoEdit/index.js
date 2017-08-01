/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Radio} from 'antd';
import axios from 'axios';
//================================================================
import API from 'root/API';
import './todo-edit.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class TodoEdit extends Component {
  state = {
    init: false,
    todoInfo: {},
    hasChange: false,
    submiting: false
  };

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.id;

    if (nextProps.id && !this.state.init) {
      this.getTodoInfo()
    }
  }


  // 获取todo详情
  getTodoInfo = () => {
    axios.get(API.GET_TODO_DETAIL(this.id))
      .then(res => {
        this.setState({
          init: true
        });
        if (res.data.code == 200) {
          this.setState({
            todoInfo: res.data.data
          })
        } else {
          message.error('未知错误，请刷新网页')
        }
      }).catch(err => {
      message.error('未知错误，请刷新网页')
    })
  };

  // 关闭modal
  close = () => {
    this.setState({
      init: false,
      todoInfo: {},
      hasChange: false,
      submiting: false
    });
    this.props.hideTodoModal()
  };

  // 表单有所改变
  onChange = () => {
    this.setState({
      hasChange: true
    })
  };

  // 将todo标记为已完成
  putTodoDone = () => {
    if (this.state.submiting) return false;
    this.setState({
      submiting: false
    });
    axios.put(API.PUT_TODO_DONE(this.id))
      .then(res => {
        if (res.data.code == 200) {
          message.success('操作成功');
          this.close();
          this.props.refresh();
          this.props.setDoneListRefresh(true)
        } else {
          message.error('未知错误，请稍后再试')
          this.setState({
            submiting: false
          })
        }
      }).catch(err => {
      message.error('未知错误，请稍后再试')
      this.setState({
        submiting: false
      })
    })
  };

  submitHandle = () => {
    if (this.state.submiting) return false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          submiting: true
        });
        axios.put(API.POST_TODO_EDIT(this.id), values)
          .then(res => {
            if (res.data.code == 200) {
              message.success('操作成功');
              this.close();
              this.props.refresh();
            } else {
              message.error('未知错误，请稍后再试')
              this.setState({
                submiting: false
              })
            }
          }).catch(err => {
          message.error('未知错误，请稍后再试')
          this.setState({
            submiting: false
          })
        })
      }
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {todoInfo} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 6},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 18},
        sm: {span: 14},
      },
    };

    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        id={this.props.id}
        onCancel={this.close}
        className="todo-detail-modal"
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="事件简介"
            hasFeedback
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true,
                message: '请输入事件描述!',
              }],
              initialValue: todoInfo.title,
              onChange: this.onChange
            })(
              <Input
                type="text"
                placeholder="请输入事件描述"
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否紧急"
            hasFeedback
          >
            {getFieldDecorator('instancy', {
              rules: [{
                required: true,
                message: '请选择是否紧急!',
              }],
              initialValue: todoInfo.instancy == 0 ? '0' : '1',
              onChange: this.onChange
            })(
              <RadioGroup>
                <Radio value="0">否</Radio>
                <Radio value="1">是</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div className="edit-group">
            <Button
              disabled={!this.state.hasChange}
              loading={this.state.submiting}
              onClick={this.submitHandle}
            >确认修改</Button>
            <Button
              type="primary"
              onClick={this.putTodoDone}
              loading={this.state.submiting}
            >标记完成</Button>
          </div>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(TodoEdit)
