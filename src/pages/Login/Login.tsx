import React from 'react'
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import LoginBg from './../../assets/images/banner-bg.jpg'
import './Login.less'
import {login} from '~/services/login.service';

const LoginForm = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    console.log('window.location', window.location)
    const userInfo = {
      userName: values.username,
      password: values.password
    }

    login(userInfo).then(loginRes=>{
      if (loginRes) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        window.location.replace(`${window.location.origin}/dashboard`)
      } else {
        message.error('账号或密码错误，请检查后重新登录～')
      }
    }).catch((err)=>{
      message.error('登录失败')
    })

  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{remember: true}}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{required: true, message: '用户名不能为空哦～!'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: '密码不能为空哦～'}]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>

      <Form.Item className='submit-btn-wrapper'>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登 录
        </Button>
      </Form.Item>
    </Form>
  );
};

const Login = () => {
  return (
    <div className="login-container">
      <img src={LoginBg} />
      <img src={LoginBg} />
      <img src={LoginBg} />

      <div className="login-content-box">
        <div className="big-title">
          登 录
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
