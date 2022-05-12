import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import SelectCategory from '@components/SelectCategory';
import { createCategory } from '@services/book';
import { AnyOptions } from '@utils/types';
import styles from './index.module.less';

export default function Component() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ p_id, name, desc }: { p_id: number; name: string; desc: string }) => {
    setLoading(true);
    try {
      const params: AnyOptions = {
        name,
      };
      if (p_id) {
        params.p_id = p_id;
      }
      if (desc) {
        params.desc = desc;
      }
      await createCategory({ p_id, name });
      message.success('创建分类成功!');
      form.resetFields();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item label="分类名" name="name" rules={[{ required: true, message: '请输入分类名' }]}>
          <Input placeholder="请输入分类名" />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input placeholder="请输入描述信息" />
        </Form.Item>
        <Form.Item label="父类" name="p_id">
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
