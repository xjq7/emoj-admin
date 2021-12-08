import { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router';
import * as service from '@services/auth';
import styles from './index.module.less';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const { phone, password } = values;
    try {
      setLoading(true);
      const res = await service.login({ phone, password });
      const {
        data: { token },
      } = res;
      localStorage.setItem('token', token);
      message.success('登录成功');
      navigate('/user');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Row>
        <Col offset={9}>
          <div className={styles.title}>后台管理系统</div>
        </Col>
        <Form className={styles.form} labelCol={{ span: 4 }} onFinish={onFinish}>
          <Col span={20} offset={4}>
            <Form.Item label="phone" name="phone" rules={[{ required: true, message: 'please input phone' }]}>
              <Input placeholder="please input phone" />
            </Form.Item>
          </Col>
          <Col span={20} offset={4}>
            <Form.Item label="password" name="password" rules={[{ required: true, message: 'please input password' }]}>
              <Input placeholder="please input password" />
            </Form.Item>
          </Col>
          <Col offset={12}>
            <Form.Item>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </div>
  );
}
export default Login;
