import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import SelectCategory from '@components/SelectCategory';
import styles from './index.module.less';

export default function Component() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = () => {};

  return (
    <div className={styles.container}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item label="分类名" name="name" rules={[{ required: true, message: '请输入分类名' }]}>
          <Input placeholder="请输入分类名" />
        </Form.Item>
        <Form.Item label="父类" name="pId">
          <SelectCategory />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
