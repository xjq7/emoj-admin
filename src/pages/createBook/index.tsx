import { useState } from 'react';
import { Button, message, Form, Input } from 'antd';
import Upload from '@components/Upload';
import { createBook, Book } from '@services/book';
import SelectCategory from '@components/SelectCategory';
import styles from './index.module.less';

export default function Component() {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (formValues: Book) => {
    const { name, desc, category_id, files = [] } = formValues;
    if (!files.length) {
      message.error('请上传书籍');
      return;
    }

    const data = {
      files: files.map(({ id }) => id),
      name,
      desc,
      category_id,
      createdAt: new Date().toISOString(),
    };
    setLoading(true);
    try {
      await createBook(data);
      form.resetFields();
      message.success('创建成功');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item label="书名" name="name" rules={[{ required: true, message: '请输入书名' }]}>
          <Input placeholder="书名" />
        </Form.Item>
        <Form.Item label="描述" name="desc">
          <Input placeholder="描述" />
        </Form.Item>
        <Form.Item label="分类" name="category_id" rules={[{ required: true, message: '请选择分类' }]}>
          <SelectCategory />
        </Form.Item>
        <Form.Item label="文件" name="files">
          <Upload />
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
