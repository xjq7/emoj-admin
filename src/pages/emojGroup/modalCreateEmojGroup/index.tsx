import React from 'react';
import { Form, FormInstance, Input } from 'antd';

interface ModalCreateEmojGroupProps {
  modalCreateEmojGroupRef: React.RefObject<FormInstance>;
}

const ModalCreateEmojGroup = function (props: ModalCreateEmojGroupProps) {
  const { modalCreateEmojGroupRef } = props;
  return (
    <Form ref={modalCreateEmojGroupRef} labelCol={{ span: 6 }}>
      <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
        <Input placeholder="请输入名称" />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input placeholder="请输入描述" />
      </Form.Item>
    </Form>
  );
};

export default ModalCreateEmojGroup;
