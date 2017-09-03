/**
 * Created by jufei on 2017/7/24.
 */

import React, {Component} from 'react';
import {Button, Form, Input, Radio,message} from 'antd';
import axios from 'src/utils/request';
//================================================================
import API from 'root/API';
import './todo-create.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class TodoCreate extends Component {
  state = {
    submiting: false
  };

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    switchTab: React.PropTypes.func.isRequired,
    setListRefresh: React.PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.submiting) return false;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          submiting: true
        });
        values.instancy = parseInt(values.instancy);
        axios.post(API.POST_CREATE_TODO,values)
          .then( res => {
            if(res.data.code == 200){
              this.props.switchTab('1');
              this.props.setListRefresh(true);
              message.success('新建成功')
            }else {
              message.error(res.data.message)
            }
            this.setState({
              submiting: false
            });
            this.props.form.resetFields()
          }).catch( err => {
            message.error('未知错误，请稍后再试');
            this.setState({
              submiting: false
            })
        })

      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

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
      <div className="todo-create">
        <Form onSubmit={this.handleSubmit}>
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
            })(
              <Input type="text" placeholder="请输入事件描述"/>
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
                message: '请输入事件描述!',
              }],
              initialValue: '0'
            })(
              <RadioGroup>
                <Radio value="0">否</Radio>
                <Radio value="1">是</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <div className="submit-group">
            <Button
              htmlType="submit"
              loading={this.state.submiting}
            >提交</Button>
          </div>
        </Form>
      </div>
    )
  }
}


export default Form.create()(TodoCreate)
