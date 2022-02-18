import React, { Component } from 'react';
// import createDom from 'react-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import {onFinish} from './interface'

import './index.css'
export default class App extends Component implements onFinish {
  onFinish:onFinish
  onFinishFailed: (errorInfo: any) => void;
  constructor(prop: any) {
    super(prop);
    this.state = () => {};
    this.onFinish = (values) => {
      console.log('Success:', values);
    };

    this.onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
  }
  clickHandler(){
      this.onFinish({password: string,
        remember: boolean,
        username: string})
  }
  render() {
    return (
      <div className="homeBox">
        <div className="loginBox">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
