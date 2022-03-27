import React from 'react';
import { Form, FormInstance, Input } from 'antd';
import { EmojGroup } from '@services/emoj';

interface ModalCreateEmojGroupProps {
  modalCreateEmojGroupRef: React.RefObject<FormInstance>;
  data?: EmojGroup;
}

const ModalCreateEmojGroup = function (props: ModalCreateEmojGroupProps) {
  const { modalCreateEmojGroupRef, data = {} } = props;

  return (
    <Form ref={modalCreateEmojGroupRef} initialValues={data} labelCol={{ span: 6 }}>
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
